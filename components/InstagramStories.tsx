"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Story = { id: string; image: string; mediaType?: string };

/**
 * Instagram Stories – horizontal scroll, mobile-friendly.
 * Fetches current stories from Instagram Graph API (last 24 hours).
 * Note: Instagram Graph API only returns current stories, not highlights.
 * For highlights, you would need to manually curate them or use a different approach.
 */
const PLACEHOLDER_STORIES = [
  { id: "1", label: "Recruitment", color: "from-delta-red to-delta-gold" },
  { id: "2", label: "Philanthropy", color: "from-delta-navy to-delta-red" },
  { id: "3", label: "Brotherhood", color: "from-delta-gold to-delta-navy" },
  { id: "4", label: "Events", color: "from-delta-red to-delta-navy" },
  { id: "5", label: "Campus", color: "from-delta-navy to-delta-gold" },
];

export function InstagramStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [useRealStories, setUseRealStories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  useEffect(() => {
    checkScroll();
    // Re-check on window resize
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    const LOG = "[Instagram Stories]";
    setError(null);
    console.log(LOG, "Fetching /api/instagram/stories...");
    fetch("/api/instagram/stories", { headers: { Accept: "application/json" } })
      .then((res) => {
        console.log(LOG, "Response:", res.status, res.statusText, "ok:", res.ok);
        if (!res.ok) return res.text().then((t) => {
          console.error(LOG, "Server error body:", t?.slice(0, 200));
          return ({ stories: [] as Story[], error: `Server ${res.status}: ${t.slice(0, 80)}` });
        });
        return res.json();
      })
      .then((data) => {
        console.log(LOG, "Parsed data:", data ? { hasStories: Array.isArray(data.stories), storyCount: data.stories?.length ?? 0, error: data.error ?? null, message: data.message ?? null } : "null/undefined");
        if (!data || typeof data !== "object") {
          setError("Invalid response from server.");
          return;
        }
        if (data.error) {
          setError(data.error);
          return;
        }
        if (data.stories && data.stories.length > 0) {
          const withImages = data.stories.filter((s: Story) => s.image);
          console.log(LOG, "Stories with images:", withImages.length, "of", data.stories.length);
          if (withImages.length > 0) {
            setStories(withImages);
            setUseRealStories(true);
          } else {
            // No stories with images - don't show anything
            setStories([]);
            setUseRealStories(false);
          }
        } else if (data.message) {
          // Not configured or no stories - don't show anything
          setStories([]);
          setUseRealStories(false);
        } else if (!data.stories?.length && !data.error) {
          // No stories is okay - Instagram only returns current stories (last 24 hours)
          console.log(LOG, "No current stories available (this is normal if no active stories in last 24 hours)");
          setStories([]);
          setUseRealStories(false);
        }
      })
      .catch((err) => {
        console.error(LOG, "Fetch failed:", err);
        setError(err?.message || "Could not reach the Instagram API. Is the dev server running?");
      })
      .finally(() => setLoading(false));
  }, []);

  // Don't render the section if there are no stories
  if (!loading && !useRealStories && stories.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-y border-delta-navy/80 bg-delta-navy py-6 dark:border-gray-800" aria-label="Instagram stories">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
          Stories
        </h2>
        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white text-delta-navy"
              aria-label="Scroll stories left"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white text-delta-navy"
              aria-label="Scroll stories right"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth py-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
              // Loading skeletons
              [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex shrink-0 flex-col items-center gap-2">
                  <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-gray-700 sm:h-24 sm:w-24" />
                </div>
              ))
            ) : useRealStories && stories.length > 0 ? (
              // Real stories from Instagram
              stories.map((story) => (
                <a
                  key={story.id}
                  href="https://www.instagram.com/uofadchi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex shrink-0 flex-col items-center gap-2"
                >
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-delta-red to-delta-gold p-0.5 sm:h-24 sm:w-24">
                    {story.image ? (
                      <>
                        <Image
                          src={story.image}
                          alt="Instagram story"
                          fill
                          className="rounded-full object-cover"
                          sizes="96px"
                        />
                        {story.mediaType === "VIDEO" && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                            <svg
                              className="h-6 w-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="h-full w-full rounded-full bg-gray-700" />
                    )}
                  </div>
                </a>
              ))
            ) : null}
          </div>
          {error && (
            <p className="mt-2 text-xs text-gray-400">
              {error.includes("not configured") || error.includes("No current stories") 
                ? "Using placeholder stories" 
                : `Note: ${error}`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

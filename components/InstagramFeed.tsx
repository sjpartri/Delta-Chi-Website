"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Post = { id: string; image: string; caption: string; link: string; mediaType?: string };

const PLACEHOLDER_POSTS: Post[] = [
  { id: "1", image: "", caption: "Brotherhood event", link: "https://www.instagram.com/uofadchi/" },
  { id: "2", image: "", caption: "Philanthropy", link: "https://www.instagram.com/uofadchi/" },
  { id: "3", image: "", caption: "Chapter life", link: "https://www.instagram.com/uofadchi/" },
  { id: "4", image: "", caption: "Delta Chi Alberta", link: "https://www.instagram.com/uofadchi/" },
  { id: "5", image: "", caption: "Campus", link: "https://www.instagram.com/uofadchi/" },
  { id: "6", image: "", caption: "Brothers", link: "https://www.instagram.com/uofadchi/" },
];

export function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>(PLACEHOLDER_POSTS);
  const [loading, setLoading] = useState(true);
  const [useRealFeed, setUseRealFeed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const LOG = "[Instagram Feed]";
    setError(null);
    console.log(LOG, "Fetching /api/instagram...");
    fetch("/api/instagram", { headers: { Accept: "application/json" } })
      .then((res) => {
        console.log(LOG, "Response:", res.status, res.statusText, "ok:", res.ok);
        if (!res.ok) return res.text().then((t) => {
          console.error(LOG, "Server error body:", t?.slice(0, 200));
          return ({ posts: [] as Post[], error: `Server ${res.status}: ${t.slice(0, 80)}` });
        });
        return res.json();
      })
      .then((data) => {
        console.log(LOG, "Parsed data:", data ? { hasPosts: Array.isArray(data.posts), postCount: data.posts?.length ?? 0, error: data.error ?? null, message: data.message ?? null } : "null/undefined");
        if (!data || typeof data !== "object") {
          setError("Invalid response from server.");
          return;
        }
        if (data.error) {
          const msg = data.tokenLength != null
            ? `${data.error} (Token length from server: ${data.tokenLength}. Compare with token length in Graph API Explorer; if shorter, .env.local may have truncated the token or a line break.)`
            : data.error;
          setError(msg);
          return;
        }
        if (data.posts && data.posts.length > 0) {
          const withMedia = data.posts.filter((p: Post) => p.image);
          console.log(LOG, "Posts with media (images/videos):", withMedia.length, "of", data.posts.length);
          if (withMedia.length > 0) {
            setPosts(withMedia);
            setUseRealFeed(true);
          } else {
            setError("No posts with media returned. Check token permissions (instagram_basic).");
          }
        } else if (data.message) {
          setError(data.message);
        } else if (!data.posts?.length && !data.error) {
          setError("API returned no posts. Ensure the token is a Page Access Token (from the Page linked to Instagram) with instagram_basic permission.");
        }
      })
      .catch((err) => {
        console.error(LOG, "Fetch failed:", err);
        setError(err?.message || "Could not reach the Instagram API. Is the dev server running?");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Instagram feed">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-delta-navy dark:text-white sm:text-3xl">
          Follow Us on Instagram
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          @uofadchi
        </p>
        <a
          href="https://www.instagram.com/uofadchi/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-delta-red hover:underline"
        >
          View on Instagram
        </a>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
          <strong>Instagram feed:</strong> {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              {useRealFeed && post.image ? (
                <>
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {post.mediaType === "VIDEO" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/60 p-3">
                        <svg
                          className="h-8 w-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="h-full w-full bg-gradient-to-br from-delta-navy to-delta-red"
                  aria-hidden
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-delta-navy/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="line-clamp-2 px-2 text-center text-sm text-white">
                  {post.caption || "View on Instagram"}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

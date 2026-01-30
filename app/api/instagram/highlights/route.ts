import { NextResponse } from "next/server";
import https from "node:https";

function ok(payload: { highlights: unknown[]; error?: string; message?: string }) {
  return NextResponse.json(payload, { status: 200 });
}

/**
 * Fetch URL with optional relaxed SSL and headers (for dev retry after SSL cert error).
 */
function fetchJson(url: string, opts?: { headers?: Record<string, string> }): Promise<{ status: number; data: unknown }> {
  return new Promise((resolve, reject) => {
    const isDev = process.env.NODE_ENV === "development";
    const agent = isDev ? new https.Agent({ rejectUnauthorized: false }) : undefined;
    const req = https.get(url, { agent, headers: opts?.headers }, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        try {
          const data = JSON.parse(body) as unknown;
          resolve({ status: res.statusCode ?? 0, data });
        } catch {
          reject(new Error("Invalid JSON"));
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

/**
 * GET /api/instagram/highlights
 * Returns Instagram highlights (manually configured).
 * Note: Instagram Graph API does not support fetching highlights directly.
 * Highlights must be manually configured via INSTAGRAM_HIGHLIGHTS env var (JSON array).
 * 
 * Format: INSTAGRAM_HIGHLIGHTS=[{"id":"1","image":"https://...","label":"Recruitment","link":"https://..."},...]
 * Or use a simpler format with just image URLs and labels.
 */
const LOG = "[API /api/instagram/highlights]";

export async function GET() {
  try {
    // Check for manually configured highlights
    const highlightsConfig = process.env.INSTAGRAM_HIGHLIGHTS;
    
    if (highlightsConfig) {
      try {
        // Parse JSON array of highlights
        const highlights = JSON.parse(highlightsConfig) as Array<{ id: string; image: string; label?: string; link?: string }>;
        console.log(LOG, "Found", highlights.length, "manually configured highlights");
        
        // Validate and format highlights
        const formattedHighlights = highlights
          .filter((h) => h.id && h.image)
          .map((h) => ({
            id: String(h.id),
            image: String(h.image),
            label: h.label || "",
            link: h.link || "https://www.instagram.com/uofadchi/",
          }));
        
        return ok({ highlights: formattedHighlights });
      } catch (parseErr) {
        console.error(LOG, "Failed to parse INSTAGRAM_HIGHLIGHTS:", parseErr);
        return ok({
          highlights: [],
          error: "INSTAGRAM_HIGHLIGHTS is not valid JSON. Expected format: [{\"id\":\"1\",\"image\":\"https://...\",\"label\":\"Recruitment\",\"link\":\"https://...\"},...]",
        });
      }
    }

    // No highlights configured - return empty array
    console.log(LOG, "No highlights configured. Add INSTAGRAM_HIGHLIGHTS to .env.local");
    return ok({
      highlights: [],
      message: "No highlights configured. Add INSTAGRAM_HIGHLIGHTS to .env.local as a JSON array. See INSTAGRAM_SETUP.md for format.",
    });
  } catch (e) {
    const err = e as Error & { cause?: unknown };
    const message = err instanceof Error ? err.message : "Request failed";
    console.error(LOG, "Unhandled error:", err, "cause:", err?.cause ?? "none");
    return ok({ highlights: [], error: message });
  }
}


import { NextResponse } from "next/server";
import https from "node:https";

function ok(payload: { stories: unknown[]; error?: string; message?: string }) {
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
 * GET /api/instagram/stories
 * Fetches current Instagram stories using the Graph API when env vars are set.
 * Returns { stories: [...] } or { stories: [], error?: string }.
 * Note: Instagram Graph API only returns current stories (last 24 hours), not highlights.
 */
const LOG = "[API /api/instagram/stories]";

export async function GET() {
  try {
    // Clean token: remove all whitespace (including newlines) and surrounding quotes
    const rawToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const token = rawToken?.replace(/\s+/g, "").replace(/^["']|["']$/g, "") || undefined;
    const userId = process.env.INSTAGRAM_USER_ID?.trim();

    console.log(LOG, "Env: token present =", !!token, "| token length =", token?.length ?? 0, "| userId =", userId ?? "(missing)");

    if (!token || !userId) {
      console.log(LOG, "Returning: not configured (missing token or userId)");
      return ok({
        stories: [],
        message: "Instagram not configured. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to .env.local. See INSTAGRAM_SETUP.md.",
      });
    }

    if (!/^\d+$/.test(String(userId).trim())) {
      console.log(LOG, "Returning: userId is not numeric");
      return ok({
        stories: [],
        error:
          "INSTAGRAM_USER_ID must be the numeric ID. In Graph API Explorer call GET /me/accounts and use the instagram_business_account.id (a number), not the username.",
      });
    }

    // Instagram Stories API endpoint
    const fields = "id,media_type,media_url,thumbnail_url,timestamp";
    const url = `https://graph.instagram.com/v18.0/${userId}/stories?fields=${fields}`;
    console.log(LOG, "Calling Instagram Stories API:", url);

    let status: number;
    let data: { data?: unknown[]; error?: { message?: string; code?: number } };

    const headers = { Accept: "application/json", Authorization: `Bearer ${token}` };

    try {
      const res = await fetch(url, { headers });
      status = res.status;
      data = (await res.json()) as { data?: unknown[]; error?: { message?: string; code?: number } };
    } catch (fetchErr) {
      const err = fetchErr as Error & { cause?: { code?: string } };
      const isSslCert = err?.cause?.code === "UNABLE_TO_GET_ISSUER_CERT_LOCALLY";
      if (process.env.NODE_ENV === "development" && isSslCert) {
        console.log(LOG, "SSL cert error in dev – retrying with relaxed SSL");
        try {
          const result = await fetchJson(url, { headers });
          status = result.status;
          data = result.data as { data?: unknown[]; error?: { message?: string; code?: number } };
        } catch (retryErr) {
          console.error(LOG, "Retry failed:", retryErr);
          return ok({
            stories: [],
            error: `Server could not reach Instagram. ${(retryErr as Error)?.message ?? "Request failed."}`,
          });
        }
      } else {
        console.error(LOG, "Fetch to Instagram failed:", err.message, "cause:", err.cause ?? "none");
        const hint =
          "The server cannot reach graph.instagram.com. Check: 1) Corporate firewall/proxy blocking outbound HTTPS, 2) VPN or network restrictions, 3) Try from another network or deploy to Vercel.";
        return ok({
          stories: [],
          error: `Server could not reach Instagram (${err.message}). ${hint}`,
        });
      }
    }

    console.log(LOG, "Instagram Stories API response: status =", status);

    if (data.error) {
      console.log(LOG, "Instagram Stories API error:", data.error);
    }
    if (Array.isArray(data.data)) {
      console.log(LOG, "Instagram returned", data.data.length, "stories");
    }

    if (status < 200 || status >= 300) {
      const errMsg = data.error?.message || "Instagram Stories API error";
      const errCode = data.error?.code;
      // If no stories (404 or empty), that's okay - just return empty array
      if (status === 404 || errCode === 100) {
        console.log(LOG, "No stories available (this is normal if no active stories)");
        return ok({ stories: [] });
      }
      return ok({
        stories: [],
        error: errCode ? `[${errCode}] ${errMsg}` : errMsg,
      });
    }

    const rawStories = Array.isArray(data.data) ? data.data : [];
    const stories = rawStories.map((s: unknown) => {
      const story = s as { id: string; media_url?: string; thumbnail_url?: string; media_type?: string };
      // Use thumbnail_url for videos, media_url for images
      const imageUrl = story.media_type === "VIDEO" 
        ? (story.thumbnail_url || story.media_url || "")
        : (story.media_url || story.thumbnail_url || "");
      
      return {
        id: String(story.id),
        image: imageUrl,
        mediaType: story.media_type || "IMAGE",
      };
    });

    console.log(LOG, "Returning", stories.length, "stories to client");
    return ok({ stories });
  } catch (e) {
    const err = e as Error & { cause?: unknown };
    const message = err instanceof Error ? err.message : "Request failed";
    console.error(LOG, "Unhandled error:", err, "cause:", err?.cause ?? "none");
    return ok({ stories: [], error: message });
  }
}


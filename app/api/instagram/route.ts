import { NextResponse } from "next/server";
import https from "node:https";

function ok(payload: { posts: unknown[]; error?: string; message?: string; tokenLength?: number }) {
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
 * GET /api/instagram
 * Fetches recent Instagram media using the Graph API when env vars are set.
 * Returns { posts: [...] } or { posts: [], error?: string }.
 */
const LOG = "[API /api/instagram]";

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
        posts: [],
        message: "Instagram not configured. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to .env.local. See INSTAGRAM_SETUP.md.",
      });
    }

    if (!/^\d+$/.test(String(userId).trim())) {
      console.log(LOG, "Returning: userId is not numeric");
      return ok({
        posts: [],
        error:
          "INSTAGRAM_USER_ID must be the numeric ID. In Graph API Explorer call GET /me/accounts and use the instagram_business_account.id (a number), not the username.",
      });
    }

    const fields = "id,caption,media_url,permalink,thumbnail_url,media_type,timestamp";
    const limit = 12;
    const url = `https://graph.instagram.com/v18.0/${userId}/media?fields=${fields}&limit=${limit}`;
    console.log(LOG, "Calling Instagram API (token in Authorization header):", url);

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
            posts: [],
            error: `Server could not reach Instagram. ${(retryErr as Error)?.message ?? "Request failed."}`,
          });
        }
      } else {
        console.error(LOG, "Fetch to Instagram failed:", err.message, "cause:", err.cause ?? "none");
        const hint =
          "The server cannot reach graph.instagram.com. Check: 1) Corporate firewall/proxy blocking outbound HTTPS, 2) VPN or network restrictions, 3) Try from another network or deploy to Vercel.";
        return ok({
          posts: [],
          error: `Server could not reach Instagram (${err.message}). ${hint}`,
        });
      }
    }

    console.log(LOG, "Instagram API response: status =", status);

    if (data.error) {
      console.log(LOG, "Instagram API error:", data.error);
    }
    if (Array.isArray(data.data)) {
      console.log(LOG, "Instagram returned", data.data.length, "media items");
    }

    if (status < 200 || status >= 300) {
      const errMsg = data.error?.message || "Instagram API error";
      const errCode = data.error?.code;
      const payload: { posts: unknown[]; error: string; tokenLength?: number } = {
        posts: [],
        error: errCode ? `[${errCode}] ${errMsg}` : errMsg,
      };
      if (process.env.NODE_ENV === "development" && errCode === 190) {
        payload.tokenLength = token?.length;
      }
      return ok(payload);
    }

    const rawPosts = Array.isArray(data.data) ? data.data : [];
    const posts = rawPosts.map((p: unknown) => {
      const post = p as { id: string; media_url?: string; permalink?: string; caption?: string; thumbnail_url?: string; media_type?: string };
      // For videos, use thumbnail_url; for images, use media_url; fallback to thumbnail_url
      const imageUrl = post.media_type === "VIDEO" 
        ? (post.thumbnail_url || post.media_url || "")
        : (post.media_url || post.thumbnail_url || "");
      
      return {
        id: String(post.id),
        image: imageUrl,
        caption: post.caption ? String(post.caption).slice(0, 150) : "",
        link: post.permalink || `https://www.instagram.com/p/${post.id}`,
        mediaType: post.media_type || "IMAGE",
      };
    });

    console.log(LOG, "Returning", posts.length, "posts to client");
    return ok({ posts });
  } catch (e) {
    const err = e as Error & { cause?: unknown };
    const message = err instanceof Error ? err.message : "Request failed";
    console.error(LOG, "Unhandled error:", err, "cause:", err?.cause ?? "none");
    return ok({ posts: [], error: message });
  }
}

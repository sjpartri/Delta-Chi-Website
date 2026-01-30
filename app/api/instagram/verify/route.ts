import { NextResponse } from "next/server";

/**
 * GET /api/instagram/verify
 * Checks if INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID are valid.
 * Returns { valid: true } or { valid: false, error: "..." }. No tokens or IDs in the response.
 */
export async function GET() {
  // Clean token: remove all whitespace (including newlines) and surrounding quotes
  const rawToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const token = rawToken?.replace(/\s+/g, "").replace(/^["']|["']$/g, "") || undefined;
  const userId = process.env.INSTAGRAM_USER_ID?.trim();

  if (!token || !userId) {
    return NextResponse.json({
      valid: false,
      error: "Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID in .env.local",
    });
  }

  if (!/^\d+$/.test(String(userId).trim())) {
    return NextResponse.json({
      valid: false,
      error: "INSTAGRAM_USER_ID must be a numeric ID (from instagram_business_account.id), not a username.",
    });
  }

  const url = `https://graph.instagram.com/v18.0/${userId}?fields=id,username`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    const data = (await res.json()) as { id?: string; username?: string; error?: { message: string; code?: number } };

    if (!res.ok) {
      const msg = data.error?.message ?? "Unknown error";
      const code = data.error?.code;
      const body: { valid: false; error: string; tokenLength?: number } = {
        valid: false,
        error: code ? `[${code}] ${msg}` : msg,
      };
      if (process.env.NODE_ENV === "development" && code === 190) {
        body.tokenLength = token?.length;
      }
      return NextResponse.json(body);
    }

    if (data.id && data.username) {
      return NextResponse.json({
        valid: true,
        message: "Token and User ID are correct.",
        username: data.username,
      });
    }

    return NextResponse.json({
      valid: false,
      error: "Unexpected response from Instagram API.",
    });
  } catch (e) {
    const err = e as Error & { code?: string; cause?: Error & { code?: string } };
    const msg = err?.message ?? "Request failed";
    const isSslOrNetwork = msg === "fetch failed" || err?.code === "UNABLE_TO_GET_ISSUER_CERT_LOCALLY" || err?.cause?.code === "UNABLE_TO_GET_ISSUER_CERT_LOCALLY";
    const hint = isSslOrNetwork
      ? " The server cannot reach Instagram (SSL or firewall). Your token/ID may still be correct. Verify in your browser: Graph API Explorer → set path to {user-id}?fields=id,username (use your INSTAGRAM_USER_ID), choose your Page, Submit."
      : msg === "fetch failed"
        ? " Server could not reach Instagram. Verify token/ID in Graph API Explorer in your browser."
        : "";
    return NextResponse.json({
      valid: false,
      error: msg + (hint ? " " + hint : ""),
      verifyInBrowser: "https://developers.facebook.com/tools/explorer",
    });
  }
}

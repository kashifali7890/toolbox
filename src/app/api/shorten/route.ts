// src/app/api/shorten/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // ✅ PRIMARY: is.gd — creates clean, direct short links (no interstitial page, no ads)
    try {
      const response = await fetch(
        `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`,
        { cache: "no-store" }
      );

      if (response.ok) {
        const shortLink = await response.text();
        // is.gd returns the short URL as plain text, or an error string
        if (shortLink.startsWith("http")) {
          return NextResponse.json({ shortUrl: shortLink.trim() });
        }
        // If is.gd returned an error message (e.g., URL too long, already shortened)
        return NextResponse.json(
          { error: shortLink || "Failed to shorten URL." },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("is.gd error:", error);
    }

    // 🔄 FALLBACK: v.gd (same service as is.gd, different domain)
    try {
      const response = await fetch(
        `https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`,
        { cache: "no-store" }
      );

      if (response.ok) {
        const shortLink = await response.text();
        if (shortLink.startsWith("http")) {
          return NextResponse.json({ shortUrl: shortLink.trim() });
        }
      }
    } catch (error) {
      console.error("v.gd error:", error);
    }

    return NextResponse.json(
      { error: "Shortening service is temporarily unavailable. Please try again." },
      { status: 503 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
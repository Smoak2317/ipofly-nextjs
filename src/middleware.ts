import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Do NOT redirect these files — Google requires 200 OK
  if (
    url.pathname === "/favicon.ico" ||
    url.pathname === "/sitemap.xml" ||
    url.pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // Redirect www → non-www
  if (url.hostname === "www.ipofly.com") {
    url.hostname = "ipofly.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

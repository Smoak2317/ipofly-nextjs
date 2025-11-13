import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // ❌ Don't redirect favicon or sitemap
  if (url.pathname === "/favicon.ico" || url.pathname.startsWith("/sitemap")) {
    return NextResponse.next();
  }

  // Redirect ipofly.com → www.ipofly.com
  if (url.hostname === "ipofly.com") {
    url.hostname = "www.ipofly.com";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

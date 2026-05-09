import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "nf_preview";
const COOKIE_VALUE = "granted";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow: password page, auth API, Next.js internals, static assets
  if (
    pathname.startsWith("/password") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.(?:png|jpg|jpeg|webp|svg|ico|gif|woff|woff2|ttf)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check for valid preview cookie
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  // Redirect to password gate
  const url = request.nextUrl.clone();
  url.pathname = "/password";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};

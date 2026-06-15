import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

/**
 * Gate every /admin route behind a valid session cookie.
 * The login page itself (/admin/login) is always public.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    if (pathname !== "/admin") url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

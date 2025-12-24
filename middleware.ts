import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const redirect = url.searchParams.get("redirect");
    if (redirect) {
      const isInternal = typeof redirect === "string" && redirect.startsWith("/") && !redirect.startsWith("//");
      if (!isInternal) {
        url.searchParams.delete("redirect");
        return NextResponse.redirect(url);
      }
    }
  } catch {}
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

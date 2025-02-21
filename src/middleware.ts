import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ERole } from "@prisma/client";
import { siteConfig } from "./config/site";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.pathname;


  if ((!session) && url.startsWith(siteConfig.pages.USER.pioneers)) {
    return NextResponse.redirect(new URL(siteConfig.pages.login, req.url));
  }

  if ((!session || session?.role !== ERole.PIONEER) && url.startsWith(siteConfig.pages.PIONEER.home)) {
    return NextResponse.redirect(new URL(siteConfig.pages.login, req.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*","/pioneers/:path*"],
};

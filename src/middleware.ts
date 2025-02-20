import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ERole } from "@prisma/client";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session || session?.role !== ERole.PIONEER) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

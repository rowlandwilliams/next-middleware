import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const noAccessIfAuth = ["/login", "/register"];
const requireAuth = ["/dashboard", "/suh"];

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  const {
    nextUrl: { pathname },
  } = req;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (session && noAccessIfAuth.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!session && requireAuth.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

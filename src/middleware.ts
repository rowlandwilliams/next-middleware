import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const noAccessIfAuth = ["/login", "/register"];
const requireAuth = ["/auth"];
const superAdmin = ["users"];

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  const {
    nextUrl: { pathname },
  } = req;
  const authHome = new URL("/auth/dashboard", req.url);
  console.log("middleware", session);

  if (pathname === "/") {
    return NextResponse.redirect(authHome);
  }

  if (session) {
    if (noAccessIfAuth.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(authHome);
    }

    if (pathname.includes("admin")) {
      if (session.role < 2) {
        return NextResponse.redirect(authHome);
      }

      if (
        superAdmin.some((path) => pathname.includes(path)) &&
        session.role < 3
      ) {
        return NextResponse.redirect(authHome);
      }

      return NextResponse.next();
    }
  } else if (requireAuth.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const noAccessIfAuth = ["/login", "/register"];
const superAdmin = ["users"];

export const middleware = async (req: NextRequest) => {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  const {
    nextUrl: { pathname },
  } = req;
  const authHome = new URL("/auth/dashboard", req.url);
  const authRoute = pathname.startsWith("/auth");

  if (pathname === "/" || pathname === "/auth/") {
    return NextResponse.redirect(authHome);
  }

  if (session) {
    if (noAccessIfAuth.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(authHome, {
        headers: { Location: authHome.pathname },
      });
    }

    if (pathname.includes("admin")) {
      const loggedInUserIsAdmin = session.role > 1;
      const loggedInUserIsSuperAdmin = session.role > 2;

      if (!loggedInUserIsAdmin) {
        return NextResponse.redirect(authHome, {
          headers: { Location: authHome.pathname },
        });
      }

      const superAdminRoute = superAdmin.some((path) =>
        pathname.includes(path)
      );
      if (superAdminRoute && !loggedInUserIsSuperAdmin) {
        return NextResponse.redirect(authHome, {
          headers: { Location: authHome.pathname },
        });
      }

      return NextResponse.next();
    }
  } else if (authRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

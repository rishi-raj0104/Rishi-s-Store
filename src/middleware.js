import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoutes";

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;
    const hasToken = request.cookies.has("access_token");

    if (!hasToken) {
      // if the user is not logged in and trying to access a protected route, redirect to login page.
      if (!pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
      }
      return NextResponse.next(); // Allow access to auth routes if not logged in.
    }

    // verify token
    const access_token = request.cookies.get("access_token").value;
    //console.log("access_token ", access_token);
    const { payload } = await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    const role = payload.role;
    //console.log('role',role);
    // prevent logged-in users from accessing auth routes
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(
          role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD,
          request.nextUrl
        )
      );
    }

    // protect admin route
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    } // protect user route

    if (pathname.startsWith("/my-account") && role !== "user") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    //console.log("error", error);
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};

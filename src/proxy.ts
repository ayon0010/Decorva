import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only check for routes that need auth
    const protectedRoutes = ["/my-account", "/checkout"];
    const adminRoutes = ["/dashboard"];

    // Get JWT from cookie (works on Vercel)
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
    });

    const isLoggedIn = !!token;
    const roles = token?.roles ?? [];
    const isAdmin = roles.includes("ADMIN");

    // 1️⃣ Redirect non-logged-in users from protected routes
    if (protectedRoutes.some((path) => pathname.startsWith(path)) && !isLoggedIn) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 2️⃣ Redirect non-admin users from admin routes
    if (adminRoutes.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
        if (!isLoggedIn || !isAdmin) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 3️⃣ Redirect logged-in users away from login page
    if (isLoggedIn && pathname === "/login") {
        return NextResponse.redirect(new URL("/my-account", req.url));
    }

    // 4️⃣ Otherwise, allow access
    return NextResponse.next();
}

// Match all pages except Next.js internals and API auth routes
export const config = {
    matcher: [
        "/((?!_next|api/auth|favicon.ico|robots.txt).*)",
    ],
};

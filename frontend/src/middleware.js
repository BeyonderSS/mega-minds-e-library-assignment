import { NextResponse } from "next/server";

export async function middleware(req) {
    const url = req.nextUrl.clone();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    try {
        const res = await fetch(`${siteUrl}/api/session`, {
            method: "GET",
            headers: {
                Cookie: req.headers.get("cookie") || "",
            },
            credentials: "include",
        });

        const data = await res.json();
        const isAuthenticated = res.status === 200 && data.authenticated;

        if (isAuthenticated) {
            // 🚀 If user is authenticated, prevent access to `/auth` page
            if (url.pathname.startsWith("/auth")) {
                url.pathname = "/dashboard/browse";
                return NextResponse.redirect(url);
            }
        } else {
            // 🚫 If user is NOT authenticated and trying to access protected routes, redirect to `/auth`
            if (
                url.pathname.startsWith("/dashboard") ||
                url.pathname === "/"
            ) {
                url.pathname = "/auth";
                return NextResponse.redirect(url);
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware Error:", error);
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }
}

// ✅ **Fixed Middleware Matcher**
export const config = {
    matcher: ["/", "/dashboard/:path*"], // Only protect dashboard and root
};

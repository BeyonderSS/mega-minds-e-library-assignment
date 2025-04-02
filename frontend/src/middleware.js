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
            // 🚀 If user is authenticated, prevent access to `/auth` by redirecting to `/dashboard/browse`
            if (url.pathname.startsWith("/auth")) {
                url.pathname = "/dashboard/browse";
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        } else {
            // 🚫 If user is not authenticated, restrict access to dashboard and redirect to `/auth`
            if (url.pathname.startsWith("/dashboard")) {
                url.pathname = "/auth";
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        }
    } catch (error) {
        console.error("Middleware Error:", error);
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }
}

// Define middleware matcher
export const config = {
    matcher: ["/", "/auth", "/dashboard", "/dashboard/:path*"],
};

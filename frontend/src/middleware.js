import { NextResponse } from "next/server";
import { decodeToken } from "./utils/auth";
export async function middleware(request) {
    const url = request.nextUrl;
    const token = request.cookies.get("token")?.value; // Get token from cookies
    const decodedTokenValue = await decodeToken(token); // ✅ Await the token decoding

    if (!decodedTokenValue) {
        // 🚫 If user is NOT authenticated, allow access ONLY to /auth
        if (!url.pathname.startsWith("/auth")) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    } else {
        // ✅ If user IS authenticated, prevent access to /auth
        if (url.pathname.startsWith("/auth")) {
            return NextResponse.redirect(new URL("/dashboard/browse", request.url));
        }
    }

    return NextResponse.next();
}


// ✅ **Middleware Matcher**
export const config = {
    matcher: ["/", "/dashboard/:path*", "/auth"], // Protect root, dashboard, and auth
};

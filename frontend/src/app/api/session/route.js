import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
        return NextResponse.json({ authenticated: true, user: decoded });
    } catch (error) {
        console.error("JWT Verification Failed:", error);
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
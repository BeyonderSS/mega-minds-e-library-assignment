"use server"
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";

export async function login(data) {
    const cookieStore = await cookies();
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        // Store token in cookies
        cookieStore.set("token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return result;
    } catch (error) {
        console.error("Login Error:", error);
        return { error: error.message };
    }
}

export async function register(data) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        // Automatically log in the user after registration
        return await login({ email: data.email, password: data.password });
    } catch (error) {
        console.error("Registration Error:", error);
        return { error: error.message };
    }
}

export async function session() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return { user: null };
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log(decoded)
    if (!decoded.user) {
        await logout()
    }
    return { user: decoded };

}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true, message: "Logged out successfully" };
}

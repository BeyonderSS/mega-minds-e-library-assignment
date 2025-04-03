import { jwtVerify } from "jose";
const JWT_SECRET = process.env.JWT_SECRET;

export async function decodeToken(token) {

    if (!token) {
        return null; // No token = Not authenticated
    }
    try {
        // Verify and decode the JWT token
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return payload; // Return the decoded payload (user data)
    } catch (error) {
        console.error("Error decoding token:", error);
        return null; // ✅ Return null instead of throwing an error
    }
}

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.route.js";
import bookRoutes from "./routes/book.route.js";
import { beyonderLogger } from "./config/beyonder.js";

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express app
const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO

app.use(cors({ 
    origin: "https://mega-minds-e-library-assignment.vercel.app", // ✅ Allow only this domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true // ✅ Allow cookies & authentication headers
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/book", bookRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    beyonderLogger();
});

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

// ✅ CORS: Allow All Origins
app.use(cors({ 
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true 
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

import express from "express";
import { 
    registerUser, 
    loginUser, 
    getCurrentUser 
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);  // Register user
router.post("/login", loginUser);  // Login & get token
router.get("/me", authMiddleware, getCurrentUser);  // Get current user info (Protected)

export default router;

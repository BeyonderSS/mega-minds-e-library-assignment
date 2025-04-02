import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import { adminMiddleware, authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware,adminMiddleware, getAllUsers);  // Get all users (Admin only)
router.get("/:id", authMiddleware, getUserById);  // Get user by ID
router.put("/:id", authMiddleware, updateUser);  // Update user details

export default router;

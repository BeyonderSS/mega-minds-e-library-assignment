import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

// Route to create a new category
router.post("/", createCategory);

// Route to get all categories
router.get("/", getAllCategories);

// Route to get a category by its slug
router.get("/:slug", getCategoryBySlug);

// Route to update a category by slug
router.put("/:slug", updateCategory);

// Route to delete a category by slug
router.delete("/:slug", deleteCategory);

export default router;

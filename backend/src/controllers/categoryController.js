import slugify from "slugify";
import Category from "../models/Category.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, description, parent } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }
        const slug = slugify(name, { lower: true, strict: true })
        const newCategory = new Category({ name, description, parent, slug });
        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating category",
            error: error.message || error
        });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("parent", "name");

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found"
            });
        }

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching categories",
            error: error.message || error
        });
    }
};

// Get a category by slug
export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).populate("parent", "name");

        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category with slug '${req.params.slug}' not found`
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching category",
            error: error.message || error
        });
    }
};

// Update a category by slug
export const updateCategory = async (req, res) => {
    try {
        const { name, description, parent } = req.body;

        // Validate that at least one field is provided
        if (!name && !description && !parent) {
            return res.status(400).json({
                success: false,
                message: "At least one field (name, description, or parent) must be provided to update"
            });
        }
const newSlug = slugify(name, { lower: true, strict: true })
        const updatedCategory = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, description, parent,slug: newSlug },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: `Category with slug '${req.params.slug}' not found`
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while updating category",
            error: error.message || error
        });
    }
};

// Delete a category by slug
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ slug: req.params.slug });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category with slug '${req.params.slug}' not found`
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting category",
            error: error.message || error
        });
    }
};

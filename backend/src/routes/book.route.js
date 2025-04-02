import express from "express";
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/search", searchBooks);
// Route to create a new book
router.post("/", createBook);

// Route to get all books
router.get("/", getAllBooks);

// Route to get a book by ID
router.get("/:id", getBookById);

// Route to update a book by ID
router.put("/:id", updateBook);

// Route to delete a book by ID
router.delete("/:id", deleteBook);

// Search books with various query params (title, author, genre, categorySlug)


export default router;

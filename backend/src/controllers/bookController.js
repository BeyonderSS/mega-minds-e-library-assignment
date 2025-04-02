import Book from "../models/Book.js";
import Category from "../models/Category.js"
// Create a new book
export const createBook = async (req, res) => {
    try {
        const { title, description, author, owner, coverImage, category, genre, content } = req.body;

        // Validate required fields
        if (!title || !author || !owner || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, author, owner, and category are required"
            });
        }

        const newBook = new Book({ title, description, author, owner, coverImage, category, genre, content });
        await newBook.save();

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating the book",
            error: error.message || error
        });
    }
};

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate("owner", "name email")  // populate owner with name and email
            .populate("category", "name")     // populate category with name
            .exec();

        if (!books || books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No books found"
            });
        }

        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching books",
            error: error.message || error
        });
    }
};

// Get a book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate("owner", "name email")
            .populate("category", "name");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching book",
            error: error.message || error
        });
    }
};

// Update a book by ID
export const updateBook = async (req, res) => {
    try {
        const { title, description, author, coverImage, category, genre, content } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, description, author, coverImage, category, genre, content },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while updating book",
            error: error.message || error
        });
    }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting book",
            error: error.message || error
        });
    }
};



export const searchBooks = async (req, res) => {
    try {
        const { title, author, genre, categorySlug, userId } = req.query;

        // Build the query object dynamically based on provided query parameters
        let query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }

        if (author) {
            query.author = { $regex: author, $options: 'i' }; // Case-insensitive search
        }

        if (genre) {
            query.genre = { $in: genre.split(',') }; // Allow searching for multiple genres
        }

        if (categorySlug) {
            const category = await Category.findOne({ slug: categorySlug });
            if (category) {
                query.category = category._id; // Find books under the given category by slug
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }
        }

        if (userId) {
            query.owner = userId; // Fetch books of a specific user if userId is provided
        }

        // Find books based on the built query
        const books = await Book.find(query)
            .populate("owner", "name email") // Populate owner details
            .populate("category", "name") // Populate category details
            .exec();

        if (!books || books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No books found matching the criteria"
            });
        }

        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while searching books",
            error: error.message || error
        });
    }
};

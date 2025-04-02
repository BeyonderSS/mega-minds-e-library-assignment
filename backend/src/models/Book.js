import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        // Title of the book (required)
        title: { type: String, required: true, trim: true, index: true },

        // Description of the book (optional)
        description: { type: String, default: "" },
        // Author of the book (required)
        author: { type: String, required: true, trim: true },

        // Reference to the user who owns/added the book
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        // Book Url
        content: { type: String, default: "" },
        // Cover image URL for the book (optional)
        coverImage: { type: String, default: "" },

        // Category the book belongs to (required)
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

        // Genres can be multiple (e.g., ["Sci-Fi", "Adventure"])
        genre: [{ type: String, trim: true }],


    },
    { timestamps: true }
);

// Indexing for efficient queries
BookSchema.index({ title: 1 });
BookSchema.index({ author: 1 });
BookSchema.index({ category: 1 });

export default mongoose.model("Book", BookSchema);

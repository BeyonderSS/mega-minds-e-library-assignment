import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema(
    {
        // Name of the category (e.g., Fiction, Non-Fiction, Sci-Fi)
        name: { type: String, required: true, unique: true, trim: true },

        // SEO-friendly slug (auto-generated if not provided)
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },

        // Short description of the category
        description: { type: String, maxlength: 500 },

        // Parent category for hierarchical categorization (optional)
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    },
    { timestamps: true }
);

// Indexing name and slug for faster searches
CategorySchema.index({ name: 1 });
CategorySchema.index({ slug: 1 });

// Generate Slug before saving
CategorySchema.pre("save", function (next) {
    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model("Category", CategorySchema);

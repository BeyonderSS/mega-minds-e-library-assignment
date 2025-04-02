import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    // Email should be unique and indexed for faster lookups
    email: { type: String, required: true, unique: true, trim: true, index: true },

    // Storing the password as plain text (for now), hashing should be handled externally
    password: { type: String, required: true },

    // Role-based access control
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Optional profile picture URL
    avatar: { type: String, default: null },
  },  
  { timestamps: true }
);

// Create a compound index for efficient user lookups
UserSchema.index({ email: 1 });

export default mongoose.model("User", UserSchema);

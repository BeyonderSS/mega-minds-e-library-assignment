import User from "../models/User.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        const users = await User.find().select("-password"); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Update user details (Only self or Admin)
export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (req.user.id !== req.params.id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied." });
        }

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update details
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

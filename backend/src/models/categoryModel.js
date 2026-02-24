const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    // name of category
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        maxlength: [50, "Category name cannot be more than 50 characters"]
    },
    // slug of category
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    // image url of category that's comes from cloudinary
    image: {
        type: String,
        default: null
    },
    // category active status (admin can hide temporarily)
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);
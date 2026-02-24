const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: true,
        trim: true,
        maxlength: [50, "Product name cannot be more than 50 characters"]
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price cannot be less than 0"]
    },
    discountPrice: {
        type: Number,
        default: null,
        min: [0, "Discount price cannot be less than 0"]
    },
    stockQuantity: {
        type: Number,
        required: [true, "Product stock quantity is required"],
        min: [0, "Product stock quantity cannot be less than 0"],
        default: 0
    },
    // Unit — "kg", "litre", "packet", "piece" etc.
    unit: {
        type: String,
        required: [true, "Unit is required"],
        enum: ["kg", "g", "litre", "ml", "piece", "packet", "dozen", "box"],
        default: "piece"
    },
    // Ek pack mein kitna hai — "500g", "1L", "6 pieces"
    unitValue: {
        type: String,
        trim: true,
        default: null
    },
    image: [{
        type: String,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // isFeatured is used to highlight the product on the home page
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);

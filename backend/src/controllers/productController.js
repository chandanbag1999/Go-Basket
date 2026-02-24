const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// Helper: create slug
function createSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

// create product Access: admin
async function createProduct(req, res) {
    try {
        const { name, description, price, discountPrice, stockQuantity, unit, unitValue, image, category } = req.body;

        // Basic validation
        if (!name || !price || !category || !unit) {
            return res.status(400).json({
                message: "Name, price, category and unit are required",
                success: false
            });
        }

        // check duplicate product
        const existingProduct = await Product.findOne({ name: name.trim() });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product already exists",
                success: false
            });
        };

        // check category
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                message: "Category not found. Please provide valid category ID.",
                success: false
            });
        };

        // create slug
        const slug = createSlug(name);

        // create & save
        const product = new Product({
            name: name.trim(),
            slug,
            description,
            price,
            discountPrice: discountPrice || null,
            stockQuantity: stockQuantity || 0,
            unit,
            unitValue: unitValue || null,
            image: image || [],
            category
        });

        await product.save();

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// get all products(with filters) Access: public
// GET /api/v1/product?category=xxx&search=mango&page=1&limit=10
async function getAllProducts(req, res) {
    try {
        const { category, search, page = 1, limit = 20, featured } = req.query;

        // create filter object - dynamically
        const filter = { isActive: true };

        // Category filter
        if (category) filter.category = category;

        // Search filter name using regex
        if (search) filter.name = { $regex: search, $options: "i" };

        // Featured filter
        if (featured === "true") filter.isFeatured = true;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch products with pagination and category data
        const products = await Product.find(filter)
            .populate("category", "name slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Total count (pagination ke liye)
        const total = await Product.countDocuments(filter);

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            count: products.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};


// Get singel product by slug and Access: public
async function getSingleProductBySlug(req, res) {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({ slug, isActive: true })
            .populate("category", "name slug");

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        };

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// Get products by category slug and Access: public
async function getProductsByCategory(req, res) {
    try {
        const { slug } = req.params;

        // Find category by slug
        const category = await Category.findOne({ slug, isActive: true });
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        };

        // Find products by category
        const products = await Product.find({ category: category._id, isActive: true })
            .populate("category", "name slug")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            count: products.length,
            category: {
                name: category.name,
                slug: category.slug
            },
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// update product by id and Access: admin
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        // if chenge name then update the slug
        if (updates.name) {
            updates.slug = createSlug(updates.name);
            updates.name = updates.name.trim();
        };

        // return updated document 
        const product = await Product.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true     // check again schema validation
        }).populate("category", "name slug");

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        };

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// delete product by id and Access: admin
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        };

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProductBySlug,
    getProductsByCategory,
    updateProduct,
    deleteProduct
};


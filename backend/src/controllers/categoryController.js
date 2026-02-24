const Category = require("../models/categoryModel");

// helper function to create slug
function createSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

};

// create category
async function createCategory(req, res) {
    try {
        const { name, image } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required",
                success: false
            });
        };

        // check duplicate category
        const existingCategory = await Category.findOne({ name: name.trim() });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists",
                success: false
            });
        };

        // Slug generate
        const slug = createSlug(name);

        // create & save
        const category = new Category({
            name: name.trim(),
            slug,
            image: image || null
        });

        await category.save();

        return res.status(201).json({
            message: "Category created successfully",
            success: true,
            category
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false
        });
    }
};

// get all categories
async function getAllCategories(req, res) {
    try {
        // show active categori es only and sort by name
        const categories = await Category.find({ isActive: true }).sort({ name: 1 });

        return res.status(200).json({
            message: "Categories fetched successfully",
            success: true,
            categories,
            count: categories.length
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false
        });
    }
};

// Get single category by slug and Access: public
async function getSingleCategoryBySlug(req, res) {
    try {
        const { slug } = req.params;

        const category = await Category.findOne({ slug, isActive: true });

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        };

        return res.status(200).json({
            message: "Category fetched successfully",
            success: true,
            category
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// update category by id and Access: admin
async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name, image, isActive } = req.body;

        // Find category
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        // update fields only which are provided
        if (name) {
            category.name = name.trim();
            category.slug = createSlug(name);
        };
        if (image !== undefined) category.image = image;
        if (isActive !== undefined) category.isActive = isActive;

        await category.save();

        return res.status(200).json({
            message: "Category updated successfully",
            success: true,
            category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// delete category by id and Access: admin
async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        };

        return res.status(200).json({
            message: "Category deleted successfully",
            success: true,
            category
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getSingleCategoryBySlug,
    updateCategory,
    deleteCategory
};

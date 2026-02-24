const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authMiddleware, authorizeRole } = require("../middlewares/auth");


const router = express.Router();

// Public Routes
router.get("/", categoryController.getAllCategories);
router.get("/:slug", categoryController.getSingleCategoryBySlug);


// Admin Only Routes
router.post("/", authMiddleware, authorizeRole("admin"), categoryController.createCategory);
router.put("/:id", authMiddleware, authorizeRole("admin"), categoryController.updateCategory);
router.delete("/:id", authMiddleware, authorizeRole("admin"), categoryController.deleteCategory);

module.exports = router;
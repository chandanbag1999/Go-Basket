const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware, authorizeRole } = require("../middlewares/auth");

const router = express.Router();

// Public Routes
router.get("/", productController.getAllProducts);
router.get("/category/:slug", productController.getProductsByCategory);
router.get("/:slug", productController.getSingleProductBySlug);

// Admin Only Routes
router.post("/", authMiddleware, authorizeRole("admin"), productController.createProduct);
router.put("/:id", authMiddleware, authorizeRole("admin"), productController.updateProduct);
router.delete("/:id", authMiddleware, authorizeRole("admin"), productController.deleteProduct);

module.exports = router;
const express = require("express");
const { sendOTP, verifyOTP, setUpProfile, refreshToken, logoutUser, getMe } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

// Public routes (no auth needed)
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/setup-profile", setUpProfile);
router.post("/refresh-token", refreshToken);

// Protected routes (auth needed, any role)
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getMe);

module.exports = router;

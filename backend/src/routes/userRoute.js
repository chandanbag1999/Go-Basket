const express = require("express");
const { sendOTP, verifyOTP, setUpProfile } = require("../controllers/userControl");


const router = express.Router();


router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/set-up-profile", setUpProfile);

module.exports = router;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const otpService = require("../services/otpServices");
const smsService = require("../services/smsServices");

// Helper function to generate JWT token
function generateToken(userId, role) {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN}
    )
};

// send OTP
async function sendOTP(req, res) {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({
                message: "Mobile number is required",
                success: false
            });
        };

        // Indian mobile number format validation
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({
                message: "Invalid mobile number",
                success: false
            });
        };

        // otp genarate
        const otp = otpService.generateOtp();

        // save otp in redis
        await otpService.saveOTP(mobile, otp);

        // send otp to user
        await smsService.sendOTPSms(mobile, otp);

        return res.status(200).json({
            message: "OTP sent successfully",
            success: true,
            otp // remove this line in production
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// verify OTP 
async function verifyOTP(req, res) {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({
                message: "Mobile number and OTP are required",
                success: false
            });
        };

        // verify otp from redis
        const result = await otpService.verifyOTP(mobile, otp);

        if (!result.valid) {
            return res.status(400).json({
                message: result.reason || "Invalid OTP",
                success: false
            });
        };

        // check user exist or not
        const existingUser = await User.findOne({ mobile});

        // existing user then login and return token
        if (existingUser) {
            const token = generateToken(existingUser._id, existingUser.role);

            return res.status(200).json({
                message: "Login successfully",
                success: true,
                isNewUser: false,
                token,
                user: {
                    id: existingUser._id,
                    firstName: existingUser.firstName,
                    mobile: existingUser.mobile,
                    role: existingUser.role
                }
            });
        };

        // new user then do not provide token.First collect userName
        return res.status(200).json({
            message: "OTP verified. Complete your profile.",
            success: true,
            isNewUser: true,
            token: null
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};


// update user profile
async function setUpProfile(req, res) {
    try {
        const { mobile, firstName } = req.body;

        if (!mobile || !firstName) {
            return res.status(400).json({
                message: "Mobile number and first name are required",
                success: false
            });
        };

        // check user exist or not
        const existingUser = await User.findOne({ mobile });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exist. Please login.",
                success: false
            });
        };

        // create new user
        const newUser = new User({
            mobile,
            firstName: firstName.trim(),
            role: "customer"
        });

        await newUser.save();

        // generate token
        const token = generateToken(newUser._id, newUser.role);

        return res.status(201).json({
            message: "Welcome to Go-Basket! 🛒",
            success: true,
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                mobile: newUser.mobile,
                role: newUser.role
            }
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
    sendOTP,
    verifyOTP,
    setUpProfile
};
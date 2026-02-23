const User = require("../models/userModel");
const otpService = require("../services/otpServices");
const smsService = require("../services/smsServices");
const tokenService = require("../services/tokenService");


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
        const existingUser = await User.findOne({ mobile });

        // existing user then login and return tokens
        if (existingUser) {
            const accessToken = tokenService.generateAccessToken(existingUser._id, existingUser.role);
            const refreshToken = tokenService.generateRefreshToken(existingUser._id);

            // save refresh token in redis
            await tokenService.saveRefreshToken(existingUser._id, refreshToken);

            // set refresh token as httpOnly cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
            });

            return res.status(200).json({
                message: "Login successfully",
                success: true,
                isNewUser: false,
                accessToken: accessToken,
                refreshToken: refreshToken,  // mobile apps will use this
                user: {
                    id: existingUser._id,
                    firstName: existingUser.firstName,
                    mobile: existingUser.mobile,
                    role: existingUser.role
                }
            });
        };

        // new user then do not provide token. First collect userName
        return res.status(200).json({
            message: "OTP verified. Complete your profile.",
            success: true,
            isNewUser: true,
            accessToken: null,
            refreshToken: null
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};


// setup user profile (new users only)
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
            role: "customer",
            isProfileComplete: true
        });

        await newUser.save();

        // generate both tokens
        const accessToken = tokenService.generateAccessToken(newUser._id, newUser.role);
        const refreshToken = tokenService.generateRefreshToken(newUser._id);

        // save refresh token in redis
        await tokenService.saveRefreshToken(newUser._id, refreshToken);

        // set refresh token as httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "Welcome to Go-Basket! 🛒",
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,  // mobile apps will use this
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


// refresh access token using refresh token cookie
async function refreshToken(req, res) {
    try {
        // Accept refresh token from: cookie (web) OR body/header (mobile apps)
        const token = req.cookies?.refreshToken
            || req.body?.refreshToken
            || req.headers["x-refresh-token"];

        if (!token) {
            return res.status(401).json({
                message: "No refresh token found",
                success: false
            });
        };

        // verify refresh token (checks Redis too)
        const decoded = await tokenService.verifyRefreshToken(token);

        // find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        };

        // generate new access token
        const newAccessToken = tokenService.generateAccessToken(user._id, user.role);

        return res.status(200).json({
            message: "Token refreshed",
            success: true,
            token: newAccessToken
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired refresh token",
            success: false
        });
    };
};


// logout — invalidate refresh token
async function logoutUser(req, res) {
    try {
        const userId = req.user.userId;

        // delete refresh token from Redis
        await tokenService.logout(userId);

        // clear cookie
        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};


// get current user info
async function getMe(req, res) {
    try {
        const user = await User.findById(req.user.userId).select("-__v");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        };

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                mobile: user.mobile,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                isProfileComplete: user.isProfileComplete,
                isVerified: user.isVerified
            }
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
    sendOTP,
    verifyOTP,
    setUpProfile,
    refreshToken,
    logoutUser,
    getMe
};

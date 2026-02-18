const User = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");


async function registerUser(req, res){
    try {
        // 1. collect data from user
        const { name, email, password, role } = req.body;

        // 2. Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };

        // 3. Check if user already exists
        const userExists = await User.findOne({ email: email});

        if(userExists){
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        };

        // 4. Hash password
        const hashedPassword = await argon2.hash(password);

        // 5. Create user
        const newUser = await User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // 6. Save user
        await newUser.save();

        // 7. Return response
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
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

async function loginUser(req, res) {
    try {
        // 1. collect data from user
        const { email, password } = req.body;

        // 2. Basic validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        // 3. Check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        };

        // 4. verify password using Argon2
        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        };

        // 5. Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // 6. Return response
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
}
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const mountRoutes = require("./src/routes");

// initialize app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());    // for refresh token cookies
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true       // allow cookies to be sent cross-origin
}));

// Database connect
connectDB();

// basic routes for health test
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Go-Basket API! Engine is running.",
        success: true,
    });
});

// Mount all routes
mountRoutes(app);

// server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
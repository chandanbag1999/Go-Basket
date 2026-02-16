require("dotenv").config();
const express = require("express");
const cors = require("cors");

// initialize app
const app = express();

// middleware
app.use(express.json()); // for persing json data
app.use(cors()); // Frontend and Backend communication

// basic routes for health test
app.get("/", (req, res) => {
    res.status(200).json({
        meassage: "Wealcome to Go-Basket API! Engine is running.",
        success: true,
    });
});

// server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
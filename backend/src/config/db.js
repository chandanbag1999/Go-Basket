const mongoose = require("mongoose");

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Go-Basket Database Connected!");

    } catch (error) {
        console.log("Database Connection Failed", error);
        process.exit(1);
        
    }
};

module.exports = connectDB;
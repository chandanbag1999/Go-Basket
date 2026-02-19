const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // primary identifier - mobile number
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/,
        trim: true
    },
    // Only collected for NEW users after OTP verify
    firstName: {
        type: String,
        trim: true,
        default: null
    },
    role: {
        type: String,
        enum: ['customer', 'delivery', 'admin'],
        default: 'customer'
    },
    // Is profile fully set up?
    isProfileComplete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
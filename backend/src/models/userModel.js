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
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        sparse: true,
        trim: true,
        default: null,
    },
    avatar: {
        type: String,
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
    },

    // - Delivery Partner specific -
    deliveryInfo: {
        vehicalType: {
            type: String,
            enum: ['bicycle', 'bike', 'scooter']
        },
        licensePlate: String,
        isAvailable: {
            type: Boolean,
            default: false
        },
        currentLocation: {
            lat: Number,
            lng: Number
        }
    },

    // ── Account management ──
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false    // Admin manually verifies delivery partners
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
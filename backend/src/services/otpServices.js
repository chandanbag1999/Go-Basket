const redis = require("../config/redis");

const OTP_EXPIRY_SECOND = 300; // 5 minute = 300 second

// Genarate otp - 6 digit random number
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// save the otp in redis
async function saveOTP(mobile, otp) {
    await redis.set(`otp:${mobile}`, String(otp), { ex: OTP_EXPIRY_SECOND });
};

// verify the otp
async function verifyOTP(mobile, enteredOTP) {
    // find redis stored otp
    const storeOtp = await redis.get(`otp:${mobile}`);

    // check otp exist or not
    if (!storeOtp) {
        return { valid: false, reason: "OTP expired or not found" };
    };

    // check match the otp provided user
    if (String(storeOtp) !== String(enteredOTP)) {
        return { valid: false, reason: "Invalid OTP" };
    };

    // if otp is match then delete it. one otp use one time only!
    await redis.del(`otp:${mobile}`)

    return { valid: true }
};

module.exports = {
    generateOtp,
    saveOTP,
    verifyOTP
};
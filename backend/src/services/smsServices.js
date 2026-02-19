async function sendOTPSms(mobile, otp) {
    // DEV MODE: Console mein print karo
    if (process.env.NODE_ENV === "development") {
        console.log("================================");
        console.log(`📱 OTP for +91-${mobile}: ${otp}`);
        console.log(`⏰ Valid for 5 minutes`);
        console.log("================================");
        return { success: true };
    };
};

module.exports = { sendOTPSms };
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

function generateAccessToken(userId, role) {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN}
    )
};

function generateRefreshToken(userId) {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
    )
};

// Store refresh token in Redis (so we can invalidate on logout)
async function saveRefreshToken(userId, refreshToken) {
    await redis.set(`refresh:${userId}`, refreshToken, { ex: 7 * 24 * 60 * 60 }); // 7 days
};

// Verify + check if refresh token is still in Redis (not logged out)
async function verifyRefreshToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const storedToken = await redis.get(`refresh:${decoded.userId}`);

    if (!storedToken || storedToken !== refreshToken) {
        throw new Error("Invalid refresh token");
    }

    return decoded;
};


// Logout = delete refresh token from redis
async function logout(userId) {
    await redis.del(`refresh:${userId}`);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    saveRefreshToken,
    verifyRefreshToken,
    logout
};

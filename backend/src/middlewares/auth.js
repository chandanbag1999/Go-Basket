const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){
    try {
        // find headers
        const authHeader = req.headers["authorization"];

        // 2. check if token exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
                success: false
            });
        };

        // 3. extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access denied. Invalid token format.",
                success: false
            });
        };

        // 4. verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({
                message: "Access denied. Invalid token.",
                success: false
            });
        };

        // 5. attach user to request
        req.user = decodedToken;

        // 6. call next middleware
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
            success: false
        })
    }
};

module.exports = authMiddleware;
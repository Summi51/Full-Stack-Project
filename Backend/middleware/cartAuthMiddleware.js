const jwt = require("jsonwebtoken");

const cartAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET || "defaultSecret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.body.userID = decoded.userId; // Use decoded userID from token
        next();
    });
};

module.exports = { cartAuth };
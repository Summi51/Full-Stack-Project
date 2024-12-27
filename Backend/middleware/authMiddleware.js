const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization; 
  console.log("Received Token:", token);

  if (token) {
    try {
      // Verify token using the secret from environment variables
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "defaultSecret");

      if (decoded) {
        req.body.authorID = decoded.userId; // Use the appropriate payload from token
        req.body.author = decoded.email; // Example: storing user email for tracking
        next(); // Proceed to the next middleware or route handler
      } else {
        res.status(401).send({ msg: "Please login to access this resource!" });
      }
    } catch (err) {
      res.status(401).send({ msg: "Invalid or expired token!", error: err.message });
    }
  } else {
    res.status(401).send({ msg: "Token missing! Please login to access this resource." });
  }
};

module.exports = {
  auth,
};

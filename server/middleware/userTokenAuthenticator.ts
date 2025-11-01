const jwt = require("jsonwebtoken");

// use this to validate server operations that require authentication
const userTokenAuthenticator = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized operation" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || !user.id || !user.username) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

export default userTokenAuthenticator;
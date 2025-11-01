const jwt = require("jsonwebtoken");

// use this to validate server operations that require authentication
const adminTokenAuthenticator = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized operation" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err || !admin.adminId || !admin.username || !admin.id) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.admin = admin;
    next();
  });
};

export default adminTokenAuthenticator;
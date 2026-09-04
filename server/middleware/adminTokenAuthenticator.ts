import { Admin } from "../models/Admin";
import { verifyAndRotateRefreshToken, setAuthCookies, verifyAccessToken, signAccessToken } from "../utils";

const adminTokenAuthenticator = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (token) {
      const payload = verifyAccessToken(token);
      if (payload) {
        if (!payload.adminId) {
          return res.status(403).json({ error: "Forbidden" });
        }
        req.id = payload.id;
        req.adminId = payload.adminId;
        return next();
      }
    }

    const rotated = await verifyAndRotateRefreshToken(req);
    if (!rotated) {
      return res.status(401).json({ error: "Session expired" });
    }

    const { storedToken, newRefreshToken, newExpiresAt } = rotated;

    const admin = await Admin.findOne({ where: { userId: storedToken.userId } });
    if (!admin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const newAccessToken = signAccessToken({ id: storedToken.userId, adminId: admin.id });
    setAuthCookies(res, newAccessToken, newRefreshToken, newExpiresAt);

    req.id = storedToken.userId;
    req.adminId = admin.id;
  next();
  } catch (err) {
    console.error("Admin auth failed:", err);
    res.status(500).json({ error: "Authentication error" });
  }

};

export default adminTokenAuthenticator;
import { verifyAccessToken, verifyAndRotateRefreshToken, signAccessToken, setAuthCookies } from "../utils";

const userTokenAuthenticator = async (req, res, next) => {
    try {
    const token = req.cookies?.token;
 
    if (token) {
      const payload = verifyAccessToken(token);
      if (payload) {
        req.id = payload.id;
        return next();
      }
    }
 
    const rotated = await verifyAndRotateRefreshToken(req);
    if (!rotated) {
      return res.status(401).json({ error: "Session expired" });
    }
 
    const { storedToken, newRefreshToken, newExpiresAt } = rotated;
 
    const newAccessToken = signAccessToken({ id: storedToken.userId });
    setAuthCookies(res, newAccessToken, newRefreshToken, newExpiresAt);
 
    req.id = storedToken.userId;
    next();
  } catch (err) {
    console.error("User auth failed:", err);
    res.status(500).json({ error: "Authentication error" });
  }
};

export default userTokenAuthenticator;
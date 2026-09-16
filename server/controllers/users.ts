import express from 'express';
import { User } from '../models/User';
import userTokenAuthenticator from '../middleware/userTokenAuthenticator';
import { generateRefreshToken, handlePagedQuery } from '../utils';
import { addUserSchema, userLoginSchema } from '../schemas';
const router = express.Router();
const bcrypt = require('bcrypt');

router.get("/api/users", async (req, res) => {
  return handlePagedQuery(User, req, res);
});

router.post("/api/users", async (req, res) => {
  try {
    const parsed = addUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const {
      name,
      dob,
      username,
      email,
      password,
      notify,
    } = parsed.data;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const query = User.create({
      name, username, email, birthdate: dob, notify, passwordHash
    });
    return res.status(201).json(query)
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const parsed = userLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { username, password, remember } = parsed.data;

    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { token, expiresAt } = await generateRefreshToken(user.id, Boolean(remember));

    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
    });

    return res.status(200).json({ id: user.id, username: user.username });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});

router.post("/api/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.send("Logged out");
})

router.get("/user/auth", userTokenAuthenticator, (_req, res) => {
  res.status(200).send("User token still valid");
});

module.exports = router;
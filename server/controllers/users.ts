import express from 'express';
import { User } from '../models/User';
import userTokenAuthenticator from '../middleware/userTokenAuthenticator';
import { generateRefreshToken } from '../utils';
const router = express.Router();
const bcrypt = require('bcrypt');

router.get("/api/users", async (_req, res) => {
  res.json(await User.findAll());
});

router.post("/api/users", async (req, res) => {
  const {
    name,
    dob,
    username,
    email,
    password,
    notify,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const query = User.create({
      name, username, email, birthdate: dob, notify, passwordHash
    });
    res.json(query)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { username, password, remember } = req.body;

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
  res.send("Logged out");
})

router.get("/user/auth", userTokenAuthenticator, (_req, res) => {
  res.status(200).send("User token still valid");
});

module.exports = router;
import express from 'express';
import { User } from '../models/User';
import { Admin } from '../models/Admin';
import { TokenParams } from '../types';
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/users', async (_req, res) => {
  res.json(await User.findAll());
});

router.post('/users', async (req, res) => {
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      res.status(404).send("User does not exist");
      return;
    }

    const admin = await Admin.findOne({
      where: {
        userId: user.id
      }
    });

    if (!await bcrypt.compare(password, user.passwordHash)) {
      throw Error("Invalid password");
    } else {
      const tokenParams: TokenParams = {
        id: user.id,
        username,
      };

      if (admin) {
        tokenParams.adminId = admin.id;
      }

      const token = await jwt.sign(
        tokenParams,
        process.env.JWT_SECRET,
        { expiresIn: 3600 * 24 * 31 }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          secure: false,
          sameSite: "lax",
          maxAge: 3600 * 24 * 31
        })
        .json({ id: user.id, username });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.send("Logged out");
})

module.exports = router;
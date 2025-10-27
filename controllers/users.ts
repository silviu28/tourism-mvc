import express from 'express';
import { User } from './models/User';
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

router.put('/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      res.status(404).send('invalid user');
      return;
    }
    if (!await bcrypt.compare(password, user.passwordHash)) {
      throw Error('invalid password');
    } else {
      res.status(200).json({
        id: user.id,
        username: user.username,
        token: jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: 3600 * 24 * 31,
        }),
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
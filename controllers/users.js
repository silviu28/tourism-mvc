const express = require('express');
const router = express.Router();
const sequelize = require('./sequelizeConfig');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/users', async (_req, res) => {
  const users = await sequelize.query('SELECT * FROM users', {
    type: QueryTypes.SELECT,
  });
  res.json(users);
});

router.post('/users', async (req, res) => {
  const {
    name,
    birthdate,
    username,
    email,
    password,
    notify,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const query = await sequelize.query(
      `
      INSERT INTO users (name, username, birthdate, email, password_hash, notify)
      VALUES (:name, :username, :birthdate, :email, :password_hash, :notify)
      `, {
      replacements: {
        name,
        username,
        birthdate: new Date(birthdate),
        email,
        password_hash: passwordHash,
        notify
      },
      type: QueryTypes.INSERT,
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await sequelize.query(
      'SELECT * FROM users WHERE username = :username', {
      replacements: { username },
      type: QueryTypes.SELECT,
    });

    const user = users[0];
    if (!user) {
      return res.status(404).send('invalid user');
    }
    if (!await bcrypt.compare(password, user.password_hash)) {
      throw Error('invalid password');
    } else {
      res.status(200).json({
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
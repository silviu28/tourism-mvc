const express = require('express');
const router = express.Router();
const sequelize = require('./sequelizeConfig');
const { QueryTypes } = require('sequelize');

router.get('/users', async (_req, res) => {
  const users = await sequelize.query('SELECT * FROM users', {
    type: QueryTypes.SELECT,
  });
  res.json(users);
});

router.post('/users', async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    confirm,
    notify,
  } = req.body;
  try {
    const query = await sequelize.query(
      `
      INSERT INTO users (name, username, email, password, notify)
      VALUES (?, ?, ?, ?, ?)
      `, {
      replacements: {
        name,
        username,
        email,
        password,
        confirm,
        notify
      },
      type: QueryTypes.INSERT,
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
const express = require('express');
const path = require('path');
const { Sequelize, QueryTypes } = require('sequelize');
const { MySqlDialect } = require('@sequelize/mysql');
require('dotenv').config({ quiet: true });
// const cors = require('cors');

const PORT = 4004;

const app = express();
app.use(express.static(
  path.join(__dirname, '..', 'views')
));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || '',
  host: 'localhost',
  port: 3306,
});

app.get('/users', async (_req, res) => {
  const users = await sequelize.query('SELECT * FROM users', {
    type: QueryTypes.SELECT,
  });
  res.json(users);
});

app.get('/comments', async (req, res) => {
  const comments = await sequelize.query('SELECT * FROM comments', {
    type: QueryTypes.SELECT,
  });
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  try {
    const { comment } = req.body;
    const query = await sequelize.query('INSERT INTO comments(comment) VALUES(:comment)', {
      replacements: { comment },
      type: QueryTypes.INSERT,
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/users', async (req, res) => {
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

app.get('/feedback', async (_req, res) => {
  const query = await sequelize.query('SELECT * FROM feebacks', {
    type: QueryTypes.SELECT,
  });
  res.json(query);
});

app.post('/feedback', async (req, res) => {
  const { feedback } = req.body;
  try {
    const query = await sequelize.query(
      'INSERT INTO feedbacks(feedback) VALUES (?)', {
      replacements: { feedback },
      type: QueryTypes.INSERT,
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/prices', async (req, res) => {
  const query = await sequelize.query('SELECT * FROM PRICES', {
    type: QueryTypes.SELECT,
  });
  res.json(query);
});

app.listen(PORT, () => {
  console.log(`--> localhost:${PORT}`);
});
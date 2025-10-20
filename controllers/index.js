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

app.get('/users', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`--> localhost:${PORT}`);
});
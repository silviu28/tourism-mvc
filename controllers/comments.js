const express = require('express');
const router = express.Router();
const sequelize = require('./sequelizeConfig');
const { QueryTypes } = require('sequelize');

router.get('/comments', async (_req, res) => {
  const comments = await sequelize.query(`
    SELECT c.id, c.comment, u.username FROM comments c
    JOIN users u ON c.user_id = u.id
    `, {
    type: QueryTypes.SELECT,
  });
  res.json(comments);
});

router.post('/comments', async (req, res) => {
  try {
    const { id, username, comment } = req.body;
    const query = await sequelize.query(`
      INSERT INTO comments(user_id, comment, date) VALUES(:id, :comment, :date)
      `, {
      replacements: { comment, id, date: new Date(), },
      type: QueryTypes.INSERT,
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
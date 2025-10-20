const express = require('express');
const router = express.Router();
const sequelize = require('./sequelizeConfig');
const { QueryTypes } = require('sequelize');

router.get('/comments', async (_req, res) => {
  const comments = await sequelize.query('SELECT * FROM comments', {
    type: QueryTypes.SELECT,
  });
  res.json(comments);
});

router.post('/comments', async (req, res) => {
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

module.exports = router;
const express = require('express');
const router = express.Router();
const sequelize = require('./sequelizeConfig');
const { QueryTypes } = require('sequelize');

router.get('/feedback', async (_req, res) => {
  const query = await sequelize.query('SELECT * FROM feebacks', {
    type: QueryTypes.SELECT,
  });
  res.json(query);
});

router.post('/feedback', async (req, res) => {
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

module.exports = router;
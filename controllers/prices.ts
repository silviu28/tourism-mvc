import express from 'express';
const router = express.Router();
const sequelize = require('./sequelizeConfig');
const { QueryTypes } = require('sequelize');

router.get('/prices', async (_req, res) => {
  const query = await sequelize.query('SELECT * FROM PRICES', {
    type: QueryTypes.SELECT,
  });
  res.json(query);
});

module.exports = router;
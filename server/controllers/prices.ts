import express from 'express';
import { Price } from '../models/Price';
const router = express.Router();

router.get('/prices', async (_req, res) => {
  try {
    const query = await Price.findAll();
    res.json(query);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/prices", async (req, res) => {
  try {
    const { id } = req.body;
    const price = await Price.findByPk(id);
    if (!price) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    await price.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/prices", async (req, res) => {
  try {
    const price = req.body;
    let oldPrice = await Price.findByPk(price.id);
    if (!oldPrice) {
      res.status(404).json({ error: "Does not exist " });
      return;
    }
    oldPrice = { ...price };
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
import express from 'express';
import { Price } from '../models/Price';
import adminTokenAuthenticator from '../middleware/adminTokenAuthenticator';
const router = express.Router();

router.get("/api/prices", async (_req, res) => {
  try {
    const query = await Price.findAll();
    res.json(query);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/api/prices/:id", async (req, res) => {
  try {
    const id = req.params.id;
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

router.post("/api/prices", adminTokenAuthenticator, async (req, res) => {
  try {
    const price = req.body;
    const query = await Price.create({ ...price });
    res.status(200).json(query);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/api/prices/:id", async (req, res) => {
  try {
    const price = req.body;
    let updatedPrice = await Price.findByPk(price.id);
    if (!updatedPrice) {
      res.status(404).json({ error: "Does not exist " });
      return;
    }
    updatedPrice = { ...price };
    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
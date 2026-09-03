import express from 'express';
import { Price } from '../models/Price';
import adminTokenAuthenticator from '../middleware/adminTokenAuthenticator';
const router = express.Router();

const PAGE_SIZE=10;

router.get("/api/prices", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;

    if (page < 1) {
      return res.status(400).json({ error: "page must be 1 or greater" });
    }

    const { rows, count } = await Price.findAndCountAll({
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * (page - 1),
    });

    return res.status(200).json({
      content: rows,
      totalCount: count,
      totalPages: Math.ceil(count / PAGE_SIZE),
      currentPage: page,
    });
  } catch (err) {
    console.error("Failed to fetch pricing:", err);
    return res.status(500).json({ error: "Failed to fetch pricing" });
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
  const id = req.params.id;
  try {
    const { price } = req.body;
    let updatedPrice = await Price.findByPk(id);
    if (!updatedPrice) {
      res.status(404).json({ error: "Does not exist" });
      return;
    }

    updatedPrice.set(price);
    await updatedPrice.save();
    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
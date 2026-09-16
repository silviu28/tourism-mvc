import express from 'express';
import { Price } from '../models/Price';
import adminTokenAuthenticator from '../middleware/adminTokenAuthenticator';
import { handlePagedQuery } from '../utils';
import { addPricingSchema, updatePricingSchema } from '../schemas';
const router = express.Router();

router.get("/api/prices", async (req, res) => {
  return handlePagedQuery(Price, req, res);
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
    const parsed = addPricingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const price = parsed.data;
    const query = await Price.create({ ...price });
    return res.status(200).json(query);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/api/prices/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const parsed = updatePricingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const price = parsed.data;
    const updatedPrice = await Price.findByPk(id);
    if (!updatedPrice) {
      return res.status(404).json({ error: "Does not exist" });
    }

    await updatedPrice.update({ ...price });
    return res.status(200).json(updatedPrice);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
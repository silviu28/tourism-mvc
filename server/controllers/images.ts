import express from "express";
import { Image } from "../models/Image";

const router = express.Router();

router.get("/images", async (_req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/images/:id", async (req, res) => {
  try {
    const id = req.params.id
    const image = await Image.findByPk(id);
    if (!image) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    await image.destroy();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
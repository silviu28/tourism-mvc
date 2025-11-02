import express from "express";
import { Image } from "../models/Image";
import tokenAuthenticator from "../middleware/userTokenAuthenticator";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";

const router = express.Router();

router.get("/api/images", async (_req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/api/images", adminTokenAuthenticator, async (req, res) => {
  const image = req.body;
  try {
    const query = await Image.create({ ...image });
    res.status(200).json(query);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/api/images/:id", tokenAuthenticator, async (req, res) => {
  try {
    const id = req.params.id
    const image = await Image.findByPk(id);
    if (!image) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    await image.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
import express from "express";
import { Image } from "../models/Image";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import { handlePagedQuery } from "../utils";
import { addImageSchema } from "../schemas";

const router = express.Router();

router.get("/api/images", async (req, res) => {
  return handlePagedQuery(Image, req, res);
});

router.post("/api/images", adminTokenAuthenticator, async (req, res) => {
  try {
    const parsed = addImageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const image = parsed.data;

    const query = await Image.create({ ...image });
    return res.status(200).json(query);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/api/images/:id", adminTokenAuthenticator, async (req, res) => {
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
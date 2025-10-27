import express from "express";
import { Comment } from "./models/Comment";
const router = express.Router();

router.get('/comments', async (_req, res) => {
  const comments = await Comment.findAll();
  // ???????? join
  res.json(comments);
});

router.post('/comments', async (req, res) => {
  try {
    const { id, comment } = req.body;
    const query = await Comment.create({ user_id: id, comment });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
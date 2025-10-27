import express from 'express';
import { Feedback } from './models/Feedback';
const router = express.Router();

router.get('/feedback', async (_req, res) => {
  const feedback = await Feedback.findAll();
  res.json(feedback);
});

router.post('/feedback', async (req, res) => {
  const { id, feedback } = req.body;
  try {
    const query = await Feedback.create({
      user_id: id,
      feedback
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
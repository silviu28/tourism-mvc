import express from 'express';
import adminTokenAuthenticator from '../middleware/adminTokenAuthenticator';
import { NotificationCategory } from '../models/NotificationCategory';

const router = express.Router();

router.get("/api/notificationCategory", adminTokenAuthenticator, async (_req, res) => {
  try {
    return res.status(200).json(await NotificationCategory.findAll());
  } catch (error) {
    return res.status(404).json({ error })
  }
});

router.post("/api/notificationCategory", adminTokenAuthenticator, async (req, res) => {
  const { name } = req.body;
  try {
    const query = await NotificationCategory.create({ name });
    res.status(200).json(query);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
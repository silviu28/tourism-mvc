import express from "express";
import { Admin } from "../models/Admin";
const router = express.Router();

router.get("/admins", async (_req, res) => {
  const admins = await Admin.findAll();
  res.json(admins);
});

module.exports = router;
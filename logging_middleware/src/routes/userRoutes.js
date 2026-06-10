import express from "express";

const router = express.Router();

import Log from "../logger/logger.js";

router.get("/", async (req, res) => {

  await Log(
    "backend",
    "info",
    "user-controller",
    "Fetching all users"
  );

  res.json({
    success: true,
    users: []
  });
});

export default router;
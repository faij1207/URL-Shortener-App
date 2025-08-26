// server/routes/urlRoutes.js
import express from "express";
import { createShortUrl, getAllUrls } from "../controllers/urlController.js";

const router = express.Router();

// POST - Create short URL
router.post("/shorten", createShortUrl);

// GET - Get all URLs
router.get("/", getAllUrls);

export default router;

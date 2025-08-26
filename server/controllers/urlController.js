// server/controllers/urlController.js
import { customAlphabet } from "nanoid";
import Url from "../models/Url.js";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);

// POST /api/url/shorten
export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "longUrl is required" });

    // optional: check if URL already exists
    let existing = await Url.findOne({ longUrl });
    if (existing) return res.json(existing);

    const shortCode = nanoid();
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const url = new Url({ longUrl, shortCode, shortUrl });
    await url.save();

    res.status(201).json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /:shortCode
export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });

    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/url
export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/url";

// Create short URL
export const createShortUrl = async (longUrl) => {
  const res = await axios.post(`${BASE_URL}/shorten`, { longUrl });
  return res.data;
};

// Get all URLs
export const getAllUrls = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

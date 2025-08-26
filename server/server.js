// server/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectUrl } from "./controllers/urlController.js";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, ".env") });

// Check required ENV variables
if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env file");
}
if (!process.env.PORT) {
  console.warn("⚠️ PORT is missing in .env file, using default 5000");
}

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes (for creating and listing URLs)
app.use("/api/url", urlRoutes);

// Redirect route (clean short link: http://localhost:5000/abc123)
app.get("/:shortCode", redirectUrl);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 URL Shortener API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ Loaded MONGODB_URI:", process.env.MONGODB_URI);
  console.log("✅ Loaded PORT:", PORT);
});

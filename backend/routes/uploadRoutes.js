const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "..", "uploads");

// Ensure 'uploads' directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  // Optional: Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(req.file.mimetype)) {
    fs.unlinkSync(req.file.path); // Delete invalid file
    return res.status(400).send("Unsupported file type.");
  }

  // Return public path to uploaded file
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;

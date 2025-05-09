const express = require("express");
const router = express.Router();
const { createJournalEntry, getJournalEntries } = require("../controllers/journalControllers");
const { protect } = require("../middleware/authMiddleware"); 

//post router is used for journalentry
router.post("/", protect, createJournalEntry);

// Route to get journal entries
router.get("/", protect, getJournalEntries);

module.exports = router;
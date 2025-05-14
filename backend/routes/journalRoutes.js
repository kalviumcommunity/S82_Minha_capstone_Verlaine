const express = require("express");
const router = express.Router();
const {
  createJournalEntry,
  getJournalEntries,
  updateJournalEntry,
  deleteJournalEntry
} = require("../controllers/journalControllers");
const { protect } = require("../middleware/authMiddleware"); 

//post router is used for journalentry
router.post("/", protect, createJournalEntry);

// Route to get journal entries
router.get("/", protect, getJournalEntries);

// Update journal entry
router.put("/:id", protect, updateJournalEntry);

// Delete journal entry
router.delete("/:id", protect, deleteJournalEntry);

module.exports = router;
const mongoose = require("mongoose");
// Define the schema for a journal entry
const journalEntrySchema = new mongoose.Schema({
  routine: { type: mongoose.Schema.Types.ObjectId, ref: "Routine", required: true },
  content: { type: String, required: true }
}, { timestamps: true });  

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
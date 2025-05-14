const mongoose = require("mongoose");
// Define the schema for a journal entry
const journalEntrySchema = new mongoose.Schema({
  // Relationship: Each journal entry is linked to one routine (Many JournalEntries -> One Routine)
  routine: { type: mongoose.Schema.Types.ObjectId, ref: "Routine", required: true },// Reference to the Routine entity
  content: { type: String, required: true }
}, { timestamps: true });  

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
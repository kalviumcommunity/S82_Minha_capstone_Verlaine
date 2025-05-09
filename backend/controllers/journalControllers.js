const JournalEntry = require("../models/JournalEntry");


const createJournalEntry = async (req, res) => {
  const { routine, content } = req.body;  
  try {
    const journalEntry = new JournalEntry({
      routine,
      content,
    });
    await journalEntry.save();
    res.status(201).json({ message: "Journal entry created successfully", journalEntry });
  } catch (error) {
    res.status(500).json({ message: "Error creating journal entry", error });
  }
};


const getJournalEntries = async (req, res) => {
  try {
    const journalEntries = await JournalEntry.find().populate("routine");
    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal entries", error });
  }
};

module.exports = { createJournalEntry, getJournalEntries };
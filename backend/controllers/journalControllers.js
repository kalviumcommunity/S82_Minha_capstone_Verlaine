const JournalEntry = require("../models/JournalEntry");
const Routine = require("../models/Routine");

// Create a new journal entry linked to a Routine 
const createJournalEntry = async (req, res) => {
  const { routine, content } = req.body;  
  try {
    const journalEntry = new JournalEntry({
      routine,  // References the Routine entity
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
    const { routineId, startDate, endDate } = req.query;
    // Get all routines that belong to the current user
    const routines = await Routine.find({ user: req.user.id });
    const routineIds = routines.map(r => r._id);

    const query = {
      routine: { $in: routineIds }
    };

    if (routineId) {
      query.routine = routineId;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    // Populate routine field to include full Routine data
    const journalEntries = await JournalEntry.find(query).populate("routine");

    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal entries", error });
  }
};


const updateJournalEntry = async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id).populate("routine");

    // Check if the journal entry belongs to the logged-in user
    if (!journalEntry || journalEntry.routine.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { content } = req.body;
    journalEntry.content = content || journalEntry.content;
    await journalEntry.save();

    res.json({ message: "Journal entry updated", journalEntry });
  } catch (error) {
    res.status(500).json({ message: "Error updating journal entry", error });
  }
};

// Delete journal entry only if it belongs to a routine linked to the logged-in user
const deleteJournalEntry = async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id).populate("routine");

    if (!journalEntry || journalEntry.routine.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await journalEntry.deleteOne();
    res.json({ message: "Journal entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting journal entry", error });
  }
};



module.exports = {
  createJournalEntry,
  getJournalEntries,
  updateJournalEntry,
  deleteJournalEntry
};


const JournalEntry = require("../models/JournalEntry");
const Routine = require("../models/Routine");

// Create a new journal entry linked to a Routine 
const createJournalEntry = async (req, res) => {
  const { routine, content } = req.body;
  try {
    // Ensure the routine belongs to the logged-in user
    const foundRoutine = await Routine.findOne({ _id: routine, user: req.user.id });
    if (!foundRoutine) {
      return res.status(403).json({ message: "You do not have access to this routine" });
    }

    const journalEntry = new JournalEntry({ routine, content });
    await journalEntry.save();

    res.status(201).json({ message: "Journal entry created successfully", journalEntry });
  } catch (error) {
    res.status(500).json({ message: "Error creating journal entry", error });
  }
};


const getJournalEntries = async (req, res) => {
  try {
    const { routineId, startDate, endDate } = req.query;

    const query = {};

    if (routineId) {
      // Ensure the routineId belongs to the current user
      const routine = await Routine.findOne({ _id: routineId, user: req.user.id });
      if (!routine) {
        return res.status(403).json({ message: "Access denied for this routine" });
      }
      query.routine = routineId;
    } else {
      // Get all routines belonging to the user
      const routines = await Routine.find({ user: req.user.id });
      const routineIds = routines.map(r => r._id);
      query.routine = { $in: routineIds };
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const journalEntries = await JournalEntry.find(query).populate("routine");

    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal entries", error });
  }
};


// Update journal entry only if it belongs to a routine linked to the logged-in user
const updateJournalEntry = async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id).populate("routine");

    if (!journalEntry || journalEntry.routine.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { content, routine } = req.body;

    if (routine && routine !== journalEntry.routine._id.toString()) {
      return res.status(400).json({ message: "Changing routine is not allowed" });
    }

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


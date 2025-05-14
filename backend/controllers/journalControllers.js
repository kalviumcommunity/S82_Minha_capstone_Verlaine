const JournalEntry = require("../models/JournalEntry");
const Routine = require("../models/Routine");

// Create a new journal entry linked to a Routine
const createJournalEntry = async (req, res) => {
  const { routine, content } = req.body;
  try {
    // Ensure the routine belongs to the logged-in user before associating the journal entry
    const foundRoutine = await Routine.findOne({ _id: routine, user: req.user.id });
    if (!foundRoutine) {
      return res.status(403).json({ message: "You do not have access to this routine" });
    }

    // Create and save journal entry linked to validated routine
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
      // Validate that the requested routine belongs to the current user
      const routine = await Routine.findOne({ _id: routineId, user: req.user.id });
      if (!routine) {
        return res.status(403).json({ message: "Access denied for this routine" });
      }
      query.routine = routineId;
    } else {
      // Retrieve all routines that belong to the current user
      const routines = await Routine.find({ user: req.user.id });
      const routineIds = routines.map(r => r._id);
      query.routine = { $in: routineIds };
    }

    // Filter entries by date range if provided
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Fetch journal entries matching user’s routines and optional filters
    const journalEntries = await JournalEntry.find(query).populate("routine");

    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal entries", error });
  }
};

// Update journal entry only if it belongs to a routine owned by the logged-in user
const updateJournalEntry = async (req, res) => {
  try {
    // Fetch the journal entry and its associated routine
    const journalEntry = await JournalEntry.findById(req.params.id).populate("routine");

    // Deny access if the user doesn't own the routine linked to the entry
    if (!journalEntry || journalEntry.routine.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { content, routine } = req.body;

    // Prevent changing the associated routine to a different one
    if (routine && routine !== journalEntry.routine._id.toString()) {
      return res.status(400).json({ message: "Changing routine is not allowed" });
    }

    // Update content if provided
    journalEntry.content = content || journalEntry.content;
    await journalEntry.save();

    res.json({ message: "Journal entry updated", journalEntry });
  } catch (error) {
    res.status(500).json({ message: "Error updating journal entry", error });
  }
};

// Delete journal entry only if it belongs to a routine owned by the logged-in user
const deleteJournalEntry = async (req, res) => {
  try {
    // Fetch the journal entry and its associated routine
    const journalEntry = await JournalEntry.findById(req.params.id).populate("routine");

    // Deny deletion if the user doesn’t own the linked routine
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

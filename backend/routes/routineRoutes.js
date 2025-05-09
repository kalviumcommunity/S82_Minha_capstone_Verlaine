const express = require("express");
const Routine = require("../models/Routine");
const JournalEntry = require("../models/JournalEntry");
const { protect } = require("../middleware/authMiddleware"); // import middleware

const router = express.Router();

// post endpoint is used to create routine
router.post("/create", protect, async (req, res) => {
  const { name } = req.body;
  try {
    const newRoutine = new Routine({ name, user: req.user.id }); // use user from token
    await newRoutine.save();
    res.status(201).json({ message: "Routine created.", routine: newRoutine });
  } catch (err) {
    res.status(400).json({ message: "Error creating routine.", error: err });
  }
});

//post router is used for routine entry
router.post("/create-entry", protect, async (req, res) => {
  const { routine, content } = req.body;
  try {
    const newEntry = new JournalEntry({ routine, content });
    await newEntry.save();
    res.status(201).json({ message: "Journal entry created.", entry: newEntry });
  } catch (err) {
    res.status(400).json({ message: "Error creating journal entry.", error: err });
  }
});

module.exports = router;

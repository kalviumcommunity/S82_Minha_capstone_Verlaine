const Routine = require("../models/Routine");

// Create a new routine
const createRoutine = async (req, res) => {
  const { name } = req.body;
  try {
    const newRoutine = new Routine({ name, user: req.user.id });
    await newRoutine.save();
    res.status(201).json({ message: "Routine created.", routine: newRoutine });
  } catch (err) {
    res.status(400).json({ message: "Error creating routine.", error: err });
  }
};

// Get all routines for the logged-in user
const getUserRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user.id });
    res.status(200).json(routines);
  } catch (err) {
    res.status(500).json({ message: "Error fetching routines.", error: err });
  }
};

module.exports = { createRoutine, getUserRoutines };

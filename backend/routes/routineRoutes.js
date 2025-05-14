const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createRoutine, getUserRoutines } = require("../controllers/routineController");

const router = express.Router();

// POST /api/routines/create — Create routine
router.post("/create", protect, createRoutine);

// GET /api/routines — Get routines for logged-in user
router.get("/", protect, getUserRoutines);

module.exports = router;

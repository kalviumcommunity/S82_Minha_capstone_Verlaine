const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// get endpoints
router.get("/", protect, adminOnly, getAllUsers);

// get endpoints
router.get("/:id", protect, getUserById);

// Put route 
// Route: PUT /api/users/:id
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
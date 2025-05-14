const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Route: GET /api/users
// Description: Fetch all users (admin only)
// Entity: User
router.get("/", protect, adminOnly, getAllUsers);

// Route: GET /api/users/:id
// Description: Get a single user by ID (admin or the user themself)
// Entity: User
router.get("/:id", protect, getUserById);

// Route: PUT /api/users/:id
// Description: Update user information (admin or the user themself)
// Entity: User
router.put("/:id", protect, updateUser);

// Route: DELETE /api/users/:id
// Description: Delete a user (admin or the user themself)
// Entity: User
router.delete("/:id", protect, deleteUser);

module.exports = router;

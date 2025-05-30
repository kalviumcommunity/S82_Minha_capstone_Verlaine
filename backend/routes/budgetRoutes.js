const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBudgetEntry,
  getBudgetEntries,
  updateBudgetEntry,
  deleteBudgetEntry,
} = require('../controllers/budgetController');

router.post('/', protect, createBudgetEntry);
router.get('/', protect, getBudgetEntries);
router.put('/:id', protect, updateBudgetEntry);
router.delete('/:id', protect, deleteBudgetEntry);

module.exports = router;
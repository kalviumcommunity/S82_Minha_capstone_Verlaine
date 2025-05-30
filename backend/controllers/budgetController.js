const Budget = require('../models/Budget');

// Create a new budget entry
const createBudgetEntry = async (req, res) => {
  const { productName, amount, category, purchaseDate } = req.body;
  try {
    const budgetEntry = new Budget({
      user: req.user.id,
      productName,
      amount,
      category,
      purchaseDate: purchaseDate || Date.now(),
    });
    await budgetEntry.save();
    res.status(201).json({ message: 'Budget entry created', budgetEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget entry', error: error.message });
  }
};

// Get budget entries for the logged-in user
const getBudgetEntries = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = { user: req.user.id };

    if (category) query.category = category;
    if (startDate || endDate) {
      query.purchaseDate = {};
      if (startDate) query.purchaseDate.$gte = new Date(startDate);
      if (endDate) query.purchaseDate.$lte = new Date(endDate);
    }

    const budgetEntries = await Budget.find(query).sort({ purchaseDate: -1 });
    res.status(200).json(budgetEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget entries', error: error.message });
  }
};

// Update a budget entry
const updateBudgetEntry = async (req, res) => {
  try {
    const budgetEntry = await Budget.findById(req.params.id);
    if (!budgetEntry || budgetEntry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { productName, amount, category, purchaseDate } = req.body;
    budgetEntry.productName = productName || budgetEntry.productName;
    budgetEntry.amount = amount !== undefined ? amount : budgetEntry.amount;
    budgetEntry.category = category || budgetEntry.category;
    budgetEntry.purchaseDate = purchaseDate || budgetEntry.purchaseDate;
    await budgetEntry.save();

    res.json({ message: 'Budget entry updated', budgetEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget entry', error: error.message });
  }
};

// Delete a budget entry
const deleteBudgetEntry = async (req, res) => {
  try {
    const budgetEntry = await Budget.findById(req.params.id);
    if (!budgetEntry || budgetEntry.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await budgetEntry.deleteOne();
    res.json({ message: 'Budget entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget entry', error: error.message });
  }
};

module.exports = {
  createBudgetEntry,
  getBudgetEntries,
  updateBudgetEntry,
  deleteBudgetEntry,
};
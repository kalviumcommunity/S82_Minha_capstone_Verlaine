const Routine = require('../models/Routine');
const JournalEntry = require('../models/JournalEntry');
const Budget = require('../models/Budget');

exports.getDashboardStats = async (req, res) => {
  try {
    const routineCount = await Routine.countDocuments({ user: req.user.id });
    const journalCount = await JournalEntry.countDocuments({ routine: { $in: await Routine.find({ user: req.user.id }).select('_id') } });
    const totalSpent = (await Budget.find({ user: req.user.id })).reduce((sum, entry) => sum + entry.amount, 0);

    res.status(200).json({
      success: true,
      stats: {
        routineCount,
        journalCount,
        totalSpent: totalSpent.toFixed(2),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching dashboard stats', error: err.message });
  }
};
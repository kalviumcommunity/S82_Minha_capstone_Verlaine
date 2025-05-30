const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productName: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['cleanser', 'moisturizer', 'serum', 'sunscreen', 'other'], default: 'other' },
  purchaseDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
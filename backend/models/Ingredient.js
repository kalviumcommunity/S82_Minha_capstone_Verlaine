const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  safety: {
    type: String,
    enum: ['safe', 'caution', 'unsafe'],
    default: 'safe'
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);

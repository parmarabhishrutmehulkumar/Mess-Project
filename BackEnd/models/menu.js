const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'], 
    required: true,
  },
  dailyMenu: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Menu', menuSchema);
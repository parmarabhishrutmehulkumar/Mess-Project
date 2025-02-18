const mongoose = require('mongoose');

// Define the Menu schema
const menuSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'], 
    required: true,
  },
  available: { type: Boolean, default: true }
});

// Create and export the Menu model
module.exports = mongoose.model('Menu', menuSchema);
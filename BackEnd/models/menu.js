const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'], 
    required: true,
  },
  day:{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], 
    required: true,
  },
  dailyMenu: { type: Boolean, default: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Menu', menuSchema);
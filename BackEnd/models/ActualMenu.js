const mongoose = require("mongoose");

const actualMenuSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("FullMenu", actualMenuSchema);
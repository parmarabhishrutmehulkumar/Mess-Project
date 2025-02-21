const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, default: uuidv4, unique: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  facultyName: { type: String, required: true },
  items: [{ 
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "FullMenu", required: true }, 
    quantity: { type: Number, required: true, min: 1 }
  }],
  totalPrice: { type: Number, required: true },
  qrCode: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
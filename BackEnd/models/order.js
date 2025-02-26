const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
    facultyName: { type: String, required: true },
    mealCategory: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    orderDate: { type: Date, default: Date.now },
    tokenId: { type: String, required: true, unique: true },
    qrCode: { type: String, required: true }
});

module.exports = mongoose.model("Order", orderSchema);
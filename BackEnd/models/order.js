const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);
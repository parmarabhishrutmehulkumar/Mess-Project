const Order = require('../models/order');

const placeOrder = async (req, res) => {
    try {
        const { items, totalPrice } = req.body;
        const newOrder = new Order({ userId: req.user.id, items, totalPrice });
        await newOrder.save();
        res.json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

module.exports = { placeOrder, getOrders };
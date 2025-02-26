const Order = require('../models/order');
const Faculty = require('../models/faculty');
const { v4: uuidv4 } = require('uuid');
const { sendOrderEmail } = require('../config/OrderMail');
const QRCode = require('qrcode');

const placeOrder = async (req, res) => {
    try {
        const { mealCategory } = req.body;

        console.log(req.user);

        const faculty = await Faculty.findById(req.user.userId);
        if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

        const existingOrder = await Order.findOne({
            facultyId: faculty._id,
            mealCategory,
            orderDate: { $gte: new Date().setHours(0, 0, 0, 0) }
        });

        if (existingOrder) return res.status(400).json({ msg: "Order already placed for today" });

        const tokenId = uuidv4();
        const qrCode = await QRCode.toDataURL(tokenId);

        const order = new Order({
            facultyId: faculty._id,
            facultyName: faculty.name,
            mealCategory,
            tokenId,
            qrCode
        });

        await order.save();

        // Send Email Notification
        await sendOrderEmail(faculty.email,{
            facultyName: faculty.name,
            mealCategory,
            tokenId,
            qrCodeDataUrl: qrCode
        });

        res.status(201).json({ msg: "Order placed successfully", orderId: order._id, tokenId, mealCategory });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { placeOrder };

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

module.exports = { placeOrder, getOrders };

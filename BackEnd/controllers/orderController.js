const Order = require('../models/order');
const Faculty = require('../models/faculty');
const FullMenu = require('../models/ActualMenu');
const { v4: uuidv4 } = require('uuid');
const { sendOrderEmail } = require('../config/OrderMail');
const QRCode = require('qrcode');

const placeOrder = async (req, res) => {
    try {
        const { facultyName, items } = req.body;
        const staffEmail = 'mess-staff@gmail.com'; // Replace with the actual staff email

        const faculty = await Faculty.findOne({ name: facultyName });
        if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

        const orderedItems = await Promise.all(
            items.map(async (item) => {
                const menuItem = await FullMenu.findOne({ name: item.name });
                if (!menuItem) throw new Error(`Menu item '${item.name}' not found`);
                return {
                    menuItem: menuItem._id,
                    name: menuItem.dish,
                    quantity: item.quantity,
                    price: menuItem.price
                };
            })
        );


        const totalPrice = orderedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        const tokenId = uuidv4();
        const qrCode = await QRCode.toDataURL(tokenId);

        const order = new Order({
            facultyId: faculty._id,
            facultyName: faculty.name,
            facultyEmail: faculty.email,
            items: orderedItems,
            totalPrice,
            tokenId,
            qrCode
        });



        await order.save();

        // Send email to mess staff
        await sendOrderEmail(staffEmail, {
            facultyName: faculty.name,
            facultyEmail: faculty.email,
            tokenId,
            totalPrice,
            orderedItems,
            qrCodeDataUrl: qrCode
        });

        res.status(201).json({ msg: "Order placed successfully", orderId: order._id, tokenId, items: orderedItems });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

module.exports = { placeOrder, getOrders };

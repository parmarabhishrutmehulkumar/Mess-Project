const Order = require('../models/order');
const Faculty = require('../models/faculty');
const FullMenu = require('../models/ActualMenu');
const { v4: uuidv4 } = require('uuid');
const { sendOrderEmail } = require('../config/OrderMail');
const QRCode = require('qrcode');
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: "rzp_test_g3ezQExpMD4bv6",
  key_secret: "mI2uV0FAHVv1mVVZ7PxUIXot",
});

const placeOrder = async (req, res) => {
  try {
    const { facultyName, items } = req.body;

    const faculty = await Faculty.findOne({ name: facultyName });

    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    const orderedItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await FullMenu.findOne({ dish: item.dish });
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
    await sendOrderEmail({
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

const createOrder = async (req, res) => {
  const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.send({ orderId: order.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature, ticketDetails } = req.body;

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    try {
      const qrCodeData = await QRCode.toDataURL(JSON.stringify(ticketDetails));

      // Save order details to the database
      const order = new Order({
        orderId,
        paymentId,
        ticketDetails,
        qrCode: qrCodeData,
        status: "Paid",
      });

      await order.save();

      res.send({ success: true, qrCode: qrCodeData });
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  } else {
    res.send({ success: false, message: "Invalid signature" });
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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

module.exports = { placeOrder, getOrders, createOrder, verifyPayment, getAllOrders };
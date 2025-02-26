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
      await sendOrderEmail(faculty.email, {
        facultyName: faculty.name,
        mealCategory,
        tokenId,
        qrCodeDataUrl: qrCode
      });

      res.status(201).json({ msg: "Order placed successfully", orderId: order._id, tokenId, mealCategory });
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

module.exports = { placeOrder, getOrders, createOrder, verifyPayment };

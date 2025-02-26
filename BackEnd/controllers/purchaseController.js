const Razorpay = require("razorpay");
const qrcode = require("qrcode");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: "your-razorpay-key-id",
  key_secret: "your-razorpay-key-secret",
});

exports.createOrder = async (req, res) => {
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

exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature, ticketDetails } = req.body;

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    try {
      const qrCodeData = await qrcode.toDataURL(JSON.stringify(ticketDetails));
      res.send({ success: true, qrCode: qrCodeData });
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  } else {
    res.send({ success: false, message: "Invalid signature" });
  }
};
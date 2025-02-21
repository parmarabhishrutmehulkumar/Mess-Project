import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

const Payment = () => {
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    mealType: "Lunch",
    quantity: 1,
    amount: 70, // ₹70 per ticket
  });

  const [qrData, setQrData] = useState(null);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/order", {
        ...ticket,
        amount: ticket.amount * ticket.quantity,
      });

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with Razorpay Key ID
        amount: ticket.amount * ticket.quantity * 100,
        currency: "INR",
        name: "Meal Ticket",
        description: "Lunch Ticket Purchase",
        order_id: data.orderId,
        handler: async (response) => {
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            ticketDetails: { ...ticket, amount: ticket.amount * ticket.quantity },
          });

          setQrData(verifyRes.data.qrCode);
        },
        prefill: {
          name: ticket.name,
          email: ticket.email,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Purchase Meal Ticket</h2>

      <input type="text" name="name" value={ticket.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={ticket.email} onChange={handleChange} placeholder="Email" />

      <select name="mealType" value={ticket.mealType} onChange={handleChange}>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>

      <input type="number" name="quantity" value={ticket.quantity} onChange={handleChange} min="1" />
      <p>Total Amount: ₹{ticket.amount * ticket.quantity}</p>

      <button onClick={handlePayment}>Pay Now</button>

      {qrData && (
        <div>
          <h3>QR Code Ticket</h3>
          <QRCode value={qrData} size={200} />
        </div>
      )}
    </div>
  );
};

export default Payment;
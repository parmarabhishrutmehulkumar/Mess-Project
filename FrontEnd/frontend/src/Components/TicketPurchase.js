import React, { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

import { FaShoppingCart } from "react-icons/fa";
import "./TicketPurchase.css";

const TicketPurchase = () => {
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    mealType: "Lunch",
    quantity: 1,
  });

  const [qrData, setQrData] = useState(null);
  const [ticketId, setTicketId] = useState("");

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/tickets", ticket);
      setTicketId(response.data.ticketId);
      setQrData(response.data.qrCode); // QR Code data from backend
      setTicket({ name: "", email: "", mealType: "Lunch", quantity: 1 });
    } catch (error) {
      console.error("Error purchasing ticket", error);
    }
  };

  return (
    <div className="ticket-container">
      <h2>Purchase a Meal Ticket</h2>

      <div className="form-field">
        <label>Name:</label>
        <input type="text" name="name" value={ticket.name} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label>Email:</label>
        <input type="email" name="email" value={ticket.email} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label>Meal Type:</label>
        <select name="mealType" value={ticket.mealType} onChange={handleChange}>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      <div className="form-field">
        <label>Quantity:</label>
        <input type="number" name="quantity" value={ticket.quantity} onChange={handleChange} min="1" required />
      </div>

      <button className="purchase-button" onClick={handlePurchase}>
        Purchase <FaShoppingCart />
      </button>

      {qrData && (
        <div className="qr-section">
          <h3>Your Ticket QR Code</h3>
          <QRCodeCanvas value={qrData} size={200} />

          <p>Ticket ID: {ticketId}</p>
        </div>
      )}
    </div>
  );
};

export default TicketPurchase;
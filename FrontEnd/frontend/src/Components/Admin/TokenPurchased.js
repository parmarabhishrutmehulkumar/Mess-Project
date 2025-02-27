import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Components/AdminCSS/TokenPurchased.css"; // Add CSS file if needed

const TokenPurchased = () => {
  const [tokens, setTokens] = useState([
    {
      orderId: "ORD12345",
      paymentId: "PAY12345",
      ticketDetails: {
        mealType: "Breakfast",
        quantity: 2,
        amount: 140,
      },
      status: "Completed",
    },
    {
      orderId: "ORD12346",
      paymentId: "PAY12346",
      ticketDetails: {
        mealType: "Lunch",
        quantity: 1,
        amount: 70,
      },
      status: "Pending",
    },
    {
      orderId: "ORD12347",
      paymentId: "PAY12347",
      ticketDetails: {
        mealType: "Dinner",
        quantity: 3,
        amount: 210,
      },
      status: "Completed",
    },
  ]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/order/orders");
        setTokens(data);
      } catch (error) {
        console.error("Error fetching tokens", error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="token-stats-container">
      <h2>Token Purchase Statistics</h2>
      <table className="token-stats-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>Meal Type</th>
            <th>Quantity</th>
            <th>Amount (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.orderId}</td>
              <td>{token.paymentId}</td>
              <td>{token.ticketDetails.mealType}</td>
              <td>{token.ticketDetails.quantity}</td>
              <td>{token.ticketDetails.amount}</td>
              <td>{token.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenPurchased;
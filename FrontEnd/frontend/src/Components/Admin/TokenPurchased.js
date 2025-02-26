import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Components/AdminCSS/TokenPurchased.css"; // Add CSS file if needed

const TokenPurchased = () => {
  const [tokens, setTokens] = useState([]);

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
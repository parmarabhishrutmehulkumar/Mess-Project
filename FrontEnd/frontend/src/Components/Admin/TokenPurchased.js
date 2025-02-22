import React, { useState} from "react";
import "../../Components/AdminCSS/TokenPurchased.css"; // Add CSS file if needed

const TokenPurchased = () => {
  const [tokenData] = useState([
    { date: "2025-02-21", tokensSold: 120, totalRevenue: 6000 },
    { date: "2025-02-20", tokensSold: 95, totalRevenue: 4750 },
    { date: "2025-02-19", tokensSold: 110, totalRevenue: 5500 },
  ]);

  return (
    <div className="token-stats-container">
      <h2>Token Purchase Statistics</h2>
      <table className="token-stats-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tokens Sold</th>
            <th>Total Revenue (₹)</th>
          </tr>
        </thead>
        <tbody>
          {tokenData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.tokensSold}</td>
              <td>{entry.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenPurchased;

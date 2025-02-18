import React from "react";
import Sidebar from "./Sidebar"; // Import Sidebar
import { FaCoffee, FaUtensils, FaPizzaSlice } from "react-icons/fa";
import "./Home.css"; // Import Home CSS
import { useTheme } from "./ThemeContext";

const Home = () => {
    const { darkMode, toggleDarkMode } = useTheme(); // Use darkMode state

  return (
    <div className="home-container">
      <Sidebar /> {/* Sidebar Component */}

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Cards */}
        <div className="welcome-cards">
          <div className="welcome-card">
            <h2>Welcome, User!</h2>
            <p>Enjoy your meal service</p>
          </div>
          <div className="welcome-card">
            <h2>Special Offers</h2>
            <p>Get discounts on bulk purchases</p>
          </div>
        </div>

        {/* Token Purchasing Section */}
        <div className="token-section">
          <h3>Purchase Meal Tokens</h3>
          <div className="token-options">
            <button className="token-button"><FaCoffee className="token-icon" /> Breakfast</button>
            <button className="token-button"><FaUtensils className="token-icon" /> Lunch</button>
            <button className="token-button"><FaPizzaSlice className="token-icon" /> Dinner</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

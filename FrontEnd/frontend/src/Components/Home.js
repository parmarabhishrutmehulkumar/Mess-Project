import React, { useState, useEffect } from "react"; 
import Sidebar from "./Sidebar"; // Import Sidebar
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons for Dark/Light mode
import "./Home.css"; // Import your Home styles

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [todayMenu, setTodayMenu] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Controls visibility of the week's menu

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Set Today's Menu Based on the Current Day
  const getDayMenu = () => {
    const weeklyMenu = {
      Monday: { breakfast: "Pancakes", lunch: "Grilled Chicken Salad", dinner: "Spaghetti" },
      Tuesday: { breakfast: "Omelette", lunch: "Veggie Burger", dinner: "Chicken Curry" },
      Wednesday: { breakfast: "Smoothie Bowl", lunch: "Turkey Sandwich", dinner: "Grilled Fish" },
      Thursday: { breakfast: "Avocado Toast", lunch: "Caesar Salad", dinner: "Beef Stew" },
      Friday: { breakfast: "French Toast", lunch: "Chicken Wrap", dinner: "Pizza" },
      Saturday: { breakfast: "Bagels", lunch: "Pasta", dinner: "BBQ Ribs" },
      Sunday: { breakfast: "Eggs Benedict", lunch: "Steak and Fries", dinner: "Sushi" },
    };

    const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
    setTodayMenu(weeklyMenu[currentDay]);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible); // Toggle the visibility of the week's menu
  };

  useEffect(() => {
    getDayMenu(); // Set the menu when the component mounts

    if (darkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [darkMode]);

  return (
    <div className="home-container">
      <Sidebar /> {/* Sidebar Component */}

      {/* Dark Mode Switch with Icon */}
      <div onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </div>

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
            <button className="token-button">Breakfast</button>
            <button className="token-button">Lunch</button>
            <button className="token-button">Dinner</button>
          </div>
        </div>

        {/* Today's Menu Display */}
        <div className="menu-section">
          <h3>Today's Menu</h3>
          <div className="menu">
            <p><strong>Breakfast:</strong> {todayMenu.breakfast}</p>
            <p><strong>Lunch:</strong> {todayMenu.lunch}</p>
            <p><strong>Dinner:</strong> {todayMenu.dinner}</p>
          </div>
        </div>
      </main>

      {/* Button to View Week's Menu */}
      <button className="view-menu-button" onClick={toggleMenu}>
        View Week's Menu
      </button>

      {/* Week's Menu Section */}
      {isMenuVisible && (
        <div className="week-menu-section">
          <h3>Week's Menu</h3>
          <div className="week-menu-item">Monday: Pancakes, Grilled Chicken Salad, Spaghetti</div>
          <div className="week-menu-item">Tuesday: Omelette, Veggie Burger, Chicken Curry</div>
          <div className="week-menu-item">Wednesday: Smoothie Bowl, Turkey Sandwich, Grilled Fish</div>
          <div className="week-menu-item">Thursday: Avocado Toast, Caesar Salad, Beef Stew</div>
          <div className="week-menu-item">Friday: French Toast, Chicken Wrap, Pizza</div>
          <div className="week-menu-item">Saturday: Bagels, Pasta, BBQ Ribs</div>
          <div className="week-menu-item">Sunday: Eggs Benedict, Steak and Fries, Sushi</div>
        </div>
      )}
    </div>
  );
};

export default Home;

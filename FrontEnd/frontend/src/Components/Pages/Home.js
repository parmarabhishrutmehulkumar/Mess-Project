import React, { useState, useEffect } from "react"; 
import Sidebar from "./Sidebar"; // Import Sidebar
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons for Dark/Light mode
import "../Styles/Home.css"; // Import your Home styles
import TicketPurchase from "./TicketPurchase";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [todayMenu, setTodayMenu] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Controls visibility of the week's menu

  // Toggle dark mode function
 // const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => {
  setDarkMode((prevMode) => {
    console.log("Dark mode toggled to:", !prevMode); // Debugging
    return !prevMode;
  });
};


  // Set Today's Menu Based on the Current Day
  const getDayMenu = () => {
    const weeklyMenu = {
      Monday: { breakfast: "Pancakes", lunch: " Panner Masala", dinner: "Spaghetti" },
      Tuesday: { breakfast: "Omelette", lunch: "Veggie Burger", dinner: "Masala Curry" },
      Wednesday: { breakfast: "Smoothie Bowl", lunch: "Club Sandwich", dinner: "Pav Bhaji" },
      Thursday: { breakfast: "Avocado Toast", lunch: "Caesar Salad", dinner: "Veg Pulav" },
      Friday: { breakfast: "French Toast", lunch: "Chinese Wrap", dinner: "Pizza" },
      Saturday: { breakfast: "Dosa", lunch: "Pasta", dinner: "BBQ" },
      Sunday: { breakfast: "Samosa", lunch: "French Fries", dinner: "Sushi" },
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
  {darkMode ? <FaSun key="sun" size={24} /> : <FaMoon key="moon" size={24} />}
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
     <TicketPurchase/>
      {/* Button to View Week's Menu */}
      <button className="view-menu-button" onClick={toggleMenu}>
        View Week's Menu
      </button>

      {/* Week's Menu Section (Table Format) */}
      {isMenuVisible && (
        <div className="week-menu-section">
          <h3>Week's Menu</h3>
          <table className="week-menu-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Monday</td><td>Pancakes</td><td>Grilled Salad</td><td>Spaghetti</td></tr>
              <tr><td>Tuesday</td><td>Omelette</td><td>Veggie Burger</td><td> Curry</td></tr>
              <tr><td>Wednesday</td><td>Smoothie Bowl</td><td>Turkey Sandwich</td><td>Grilled Fish</td></tr>
              <tr><td>Thursday</td><td>Avocado Toast</td><td>Caesar Salad</td><td>Masala Paneer</td></tr>
              <tr><td>Friday</td><td>French Toast</td><td>Wrap</td><td>Pizza</td></tr>
              <tr><td>Saturday</td><td>Samosa</td><td>Pasta</td><td>BBQ</td></tr>
              <tr><td>Sunday</td><td>Benedict</td><td>French Fries</td><td>Sushi</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
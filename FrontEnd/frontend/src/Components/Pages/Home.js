import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaUser,
  FaUtensils,
  FaCalendarAlt,
  FaShoppingCart,
} from "react-icons/fa";
import "../Styles/Home.css";
import Payment from "./Payment";
import { Button, Typography, Modal, Box, Avatar } from "@mui/material"; // Import the Payment component
import axios from "axios";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [todayMenu, setTodayMenu] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [open, setOpen] = React.useState(false);

  const [selectedMeal, setSelectedMeal] = useState(null); // State to hold selected meal for payment
  const sliderRef = useRef(null);
  const sliderInterval = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Set Today's Menu Based on the Current Day
  const getDayMenu = () => {
    const weeklyMenu = {
      Monday: {
        breakfast: "Idli-Sambhar & Tea",
        lunch: "Panner Masala",
        dinner: "Spaghetti",
      },
      Tuesday: {
        breakfast: "Omelette",
        lunch: "Veggie Burger",
        dinner: "Masala Curry",
      },
      Wednesday: {
        breakfast: "Smoothie Bowl",
        lunch: "Club Sandwich",
        dinner: "Pav Bhaji",
      },
      Thursday: {
        breakfast: "Avocado Toast",
        lunch: "Caesar Salad",
        dinner: "Veg Pulav",
      },
      Friday: {
        breakfast: "French Toast",
        lunch: "Chinese Wrap",
        dinner: "Pizza",
      },
      Saturday: { breakfast: "Dosa", lunch: "Pasta", dinner: "BBQ" },
      Sunday: { breakfast: "Samosa", lunch: "French Fries", dinner: "Sushi" },
    };

    const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
    setTodayMenu(weeklyMenu[currentDay] || weeklyMenu.Monday);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Start/Pause slider on hover
  const pauseSlider = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
      sliderInterval.current = null;
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const resumeSlider = () => {
    if (!sliderInterval.current) {
      sliderInterval.current = setInterval(nextSlide, 5000);
    }
  };

  useEffect(() => {
    getDayMenu();

    if (darkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }

    // Auto-rotate slides
    sliderInterval.current = setInterval(nextSlide, 5000);

    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current);
      }
    };
  }, [darkMode]);

  // Reset slider interval when slide changes
  useEffect(() => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
    sliderInterval.current = setInterval(nextSlide, 5000);
  }, [currentSlide]);

  const slides = [
    {
      title: "Welcome to",
      subtitle: "Mess Management System",
      caption: "Let us Guide you",
      imgUrl:
        "https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Delicious Meals",
      subtitle: "Fresh and Healthy",
      caption: "Served daily with care",
      imgUrl:
        "https://images.unsplash.com/photo-1739467372234-2aba33f6b7ee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Easy Booking",
      subtitle: "Anytime Anywhere",
      caption: "Book your meals in advance",
      imgUrl:
        "https://images.unsplash.com/photo-1740219148636-824ab17bdd57?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const weeklyMenu = [
    {
      day: "Monday",
      breakfast: "Idli-Sambhar & Tea",
      lunch: "Dal-Batti,Rice,Chaas & Salad",
      dinner: "Patta Gobhi,Dal,Roti,Rice,Dry Manchurian",
    },
    {
      day: "Tuesday",
      breakfast: "Veg. Kathi Roll & Tea",
      lunch: "Jeera Aloo,Kadhi,Rice,Roti,Salad",
      dinner: "Panner Veg, Fried Rice, Roti, Sweet, Salad",
    },
    {
      day: "Wednesday",
      breakfast: "Poha,Sev,Kadhi & Tea",
      lunch: "Chhole Bhature,Jeera Rice, Chaas,Salad",
      dinner: "Soya Matar,Dal,Rice,Roti",
    },
    {
      day: "Thursday",
      breakfast: "Usal Pav & Tea",
      lunch: "Green Vege,Dal,Roti,Chass,Salad",
      dinner: "Sev-Tamatar,Dal,Roti,RiceChinese Fried Rice",
    },
    {
      day: "Friday",
      breakfast: "Aloo-Paratha",
      lunch: "Masala Baigan,Roti,Dal,Rice,Chass,Salad",
      dinner: "Totha Bhakri,Fried Rice,Salad,Halva",
    },
    {
      day: "Saturday",
      breakfast: "Khaman-Kadhi & Tea",
      lunch: "Mix-Veg,Dal,Roti,Rice,Chass, Salad",
      dinner: "Veg. Kofta,Roti,Dal,Rice,Salad,Pikle",
    },
    {
      day: "Sunday",
      breakfast: "Samosa Chutney & Tea",
      lunch: "Ghiya Chana,Dal,Roti,Rice,Chass,Salad",
      dinner: "Corn -Fritters,Dal,Roti,Dal,Rice,Salad",
    },
  ];

  const handlePurchase = (mealType) => {
    setSelectedMeal(mealType);
  };

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handlemenu = async() => {
    try {
      const {data} = await axios.get("http://localhost:5000/api/menu");
      console.log(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  return (
    <>
      <div className="home-container">
        <header className="main-header">
          <div className="header-container">
            <div className="logo">
              <img
                src="https://plus.unsplash.com/premium_photo-1668902221435-1239bbdb60b5?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Logo"
                className="logo-img"
              />
              <span className="logo-text">Mess Cafeteria</span>
            </div>

            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
            <Sidebar />
            <nav
              className={`main-nav ${mobileMenuOpen ? "mobile-active" : ""}`}
            >
              <ul>
                <li className="active">
                  <Link to="/home">Home</Link>
                </li>

                <li className="dropdown">
                  <Link to="/signup">Sign Up</Link>
                  <div className="dropdown-content">
                    <Link to="/student">Student</Link>
                    <Link to="/faculty">Faculty</Link>
                  </div>
                </li>
                <li>
                  <Link to="/attendance">Attendance</Link>
                </li>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <div
                onClick={toggleDarkMode}
                className="dark-mode-toggle header-icon"
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </div>
              <FaUser size={20} cursor={"pointer"} onClick={handleOpen} />
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      color="black"
                    >
                     Name: {userInfo ? userInfo.name : "Guest"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Email: {userInfo ? userInfo.email : "Guest"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Role: {userInfo ? userInfo.role : "Guest"}{" "}
                    </Typography>

                      {
                        userInfo && userInfo.role === "student" ? (
                          <Avatar src={userInfo.qrCode} sx={{ width: 96, height: 96 }}> </Avatar>
                        ) : null
                      }
              
                  </Box>
                </Modal>
              </div>
              ;
            </div>
          </div>
        </header>

        <div
          className="hero-slider"
          ref={sliderRef}
          onMouseEnter={pauseSlider}
          onMouseLeave={resumeSlider}
        >
          <div
            className="slide-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                className="slide"
                key={index}
                style={{ backgroundImage: `url(${slide.imgUrl})` }}
              >
                <div className="slide-overlay"></div>
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <h1>{slide.subtitle}</h1>
                  <p>{slide.caption}</p>
                  <div className="cta-buttons">
                    <button className="cta-button primary">SEE SERVICES</button>
                    <button className="cta-button secondary">LEARN MORE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-arrow prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="slider-arrow next" onClick={nextSlide}>
            &#10095;
          </button>

          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>

        <main className="main-content">
          <section className="welcome-section">
            <div className="section-heading">
              <h2>Welcome to Our Mess</h2>
              <p>Enjoy healthy and delicious meals every day</p>
            </div>

            <div className="welcome-cards">
              <div className="welcome-card">
                <div className="card-icon">
                  <FaUtensils />
                </div>
                <h3>Quality Meals</h3>
                <p>Freshly prepared meals with quality ingredients</p>
              </div>
              <div className="welcome-card">
                <div className="card-icon">
                  <FaCalendarAlt />
                </div>
                <h3>Weekly Menu</h3>
                <p>Diverse menu options every day of the week</p>
              </div>
              <div className="welcome-card">
                <div className="card-icon">
                  <FaShoppingCart />
                </div>
                <h3>Easy Purchase</h3>
                <p>Get discounts on bulk meal token purchases</p>
              </div>
            </div>
          </section>
          <section className="token-section">
            <div className="section-heading">
              <h2>Purchase Meal Tokens</h2>
              <p>Select your meal preferences and purchase tokens</p>
            </div>

            <div className="token-options">
              <div className="token-card">
                <h3>Breakfast</h3>
                <p className="token-price">₹70 per meal</p>
                <p className="token-desc">Available from 7:30 AM to 9:30 AM</p>
                <button
                  className="token-button"
                  onClick={() => handlePurchase("Breakfast")}
                >
                  Purchase
                </button>
              </div>

              <div className="token-card">
                <h3>Lunch</h3>
                <p className="token-price">₹70 per meal</p>
                <p className="token-desc">Available from 12:15 PM to 2:00 PM</p>
                <button
                  className="token-button"
                  onClick={() => handlePurchase("Lunch")}
                >
                  Purchase
                </button>
              </div>

              <div className="token-card">
                <h3>Dinner</h3>
                <p className="token-price">₹70 per meal</p>
                <p className="token-desc">Available from 7:00 PM to 9:00 PM</p>
                <button
                  className="token-button"
                  onClick={() => handlePurchase("Dinner")}
                >
                  Purchase
                </button>
              </div>
            </div>
          </section>
          <section className="menu-section">
            <div className="section-heading">
              <h2>Our Menu</h2>
              <p>Delicious and nutritious meals served daily</p>
            </div>

            <div className="menu-tabs">
              <button
                className={`menu-tab ${activeTab === "today" ? "active" : ""}`}
                onClick={() => handleTabChange("today")}
              >
                Today's Menu
              </button>
              <button
                className={`menu-tab ${activeTab === "week" ? "active" : ""}`}
                onClick={handlemenu}
              >
                Weekly Menu
              </button>
            </div>

            <div className="menu-content">
              {activeTab === "today" ? (
                <div className="today-menu">
                  <div className="meal-card">
                    <h3>Breakfast</h3>
                    <p className="meal-item">{todayMenu.breakfast}</p>
                    <p className="meal-time">7:30 AM - 9:30 AM</p>
                  </div>

                  <div className="meal-card">
                    <h3>Lunch</h3>
                    <p className="meal-item">{todayMenu.lunch}</p>
                    <p className="meal-time">12:15 PM - 2:00 PM</p>
                  </div>

                  <div className="meal-card">
                    <h3>Dinner</h3>
                    <p className="meal-item">{todayMenu.dinner}</p>
                    <p className="meal-time">7:00 PM - 9:00 PM</p>
                  </div>
                </div>
              ) : (
                <div className="weekly-menu">
                  <h2>Weekly Menu</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyMenu.map((dayMenu, index) => (
                        <tr key={index}>
                          <td>{dayMenu.day}</td>
                          <td>{dayMenu.breakfast}</td>
                          <td>{dayMenu.lunch}</td>
                          <td>{dayMenu.dinner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
          {selectedMeal && <Payment mealType={selectedMeal} />}{" "}
          {/* Render Payment component when a meal is selected */}
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Mess Management System</h3>
              <p>
                Providing quality meals and services to our customers since
                2020.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/attendance">Attendance</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact Info</h3>
              <p>123 Campus Road, University Area</p>
              <p>Email: info@messsystem.com</p>
              <p>Phone: +91 1234567890</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Mess Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User Components
import Signup from './Components/Pages/Signup';
import SignIn from './Components/Pages/SignIn';
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import Settings from './Components/Pages/Settings';
import Feedback from './Components/Pages/Feedback';
import Complaint from './Components/Pages/Complaint';
import TicketPurchase from './Components/Pages/TicketPurchase';

// Admin Components
import AdminSignup from './Components/Admin/AdminSignup';
import AdminSignin from './Components/Admin/AdminSignin';
import AdminHome from './Components/Admin/AdminHome';
import ManageUsers from './Components/Admin/ManageUsers';
import ManageOrders from './Components/Admin/ManageOrders';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/signin" element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/home" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} />} />
          <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/feedback" element={<Feedback darkMode={darkMode} />} />
          <Route path="/complaint" element={<Complaint darkMode={darkMode} />} />
          <Route path="/purchase-ticket" element={<TicketPurchase darkMode={darkMode} />} />

          {/* Admin Routes */}
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-orders" element={<ManageOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

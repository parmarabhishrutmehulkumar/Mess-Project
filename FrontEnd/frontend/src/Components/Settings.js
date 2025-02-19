// Settings.js
import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar
import { FaUser, FaEnvelope, FaLock, FaBell } from "react-icons/fa";
import "./Settings.css"; // Import CSS for styling

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="settings-container">
      <Sidebar /> {/* Sidebar remains on the page */}

      <main className="settings-content">
        <h2>Settings</h2>

        {/* Name Input */}
        <div className="settings-field">
          <FaUser className="settings-icon" />
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={settings.name}
            onChange={handleChange}
          />
        </div>

        {/* Email Input */}
        <div className="settings-field">
          <FaEnvelope className="settings-icon" />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={settings.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="settings-field">
          <FaLock className="settings-icon" />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={settings.password}
            onChange={handleChange}
          />
        </div>

        {/* Notifications Toggle */}
        <div className="settings-field">
          <FaBell className="settings-icon" />
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
        </div>

        {/* Save Button */}
        <button className="save-button">Save Changes</button>
      </main>
    </div>
  );
};

export default Settings;

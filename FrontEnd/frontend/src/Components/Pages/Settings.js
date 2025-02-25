// Settings.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaUser, FaEnvelope, FaLock, FaBell, FaSave } from "react-icons/fa";
import "../Styles/Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: "",
    notifications: true,
  });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error on field change
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!settings.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!settings.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(settings.email)) {
      errors.email = "Email is invalid";
    }
    
    if (settings.password && settings.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Saving settings:", settings);
        setIsSubmitting(false);
        // Show success message or redirect
      }, 1000);
    }
  };
  
  return (
    <div className="settings-container">
      {!isMobile && <Sidebar />}
      
      <main className="settings-content">
        <h2 className="settings-title">Account Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="settings-card">
            <h3 className="settings-section-title">Personal Information</h3>
            
            <div className={`settings-field ${formErrors.name ? 'error' : ''}`}>
              <div className="field-icon">
                <FaUser className="settings-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={settings.name}
                  onChange={handleChange}
                />
                {formErrors.name && <p className="error-message">{formErrors.name}</p>}
              </div>
            </div>
            
            <div className={`settings-field ${formErrors.email ? 'error' : ''}`}>
              <div className="field-icon">
                <FaEnvelope className="settings-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={settings.email}
                  onChange={handleChange}
                />
                {formErrors.email && <p className="error-message">{formErrors.email}</p>}
              </div>
            </div>
          </div>
          
          <div className="settings-card">
            <h3 className="settings-section-title">Security</h3>
            
            <div className={`settings-field ${formErrors.password ? 'error' : ''}`}>
              <div className="field-icon">
                <FaLock className="settings-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="password">Change Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="New password"
                  value={settings.password}
                  onChange={handleChange}
                />
                {formErrors.password && <p className="error-message">{formErrors.password}</p>}
              </div>
            </div>
          </div>
          
          <div className="settings-card">
            <h3 className="settings-section-title">Preferences</h3>
            
            <div className="settings-field toggle-field">
              <div className="field-icon">
                <FaBell className="settings-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="notifications" className="toggle-label">
                  <span>Notifications</span>
                  <div className="toggle-container">
                    <input
                      id="notifications"
                      type="checkbox"
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleChange}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="field-description">Receive notifications about updates and activity</p>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="save-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
            {!isSubmitting && <FaSave className="button-icon" />}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Settings;
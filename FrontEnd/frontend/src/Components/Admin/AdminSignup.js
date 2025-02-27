// AdminSignup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUserPlus } from "react-icons/fa";
import axios from "axios"
import "./AdminSignup.css";

const AdminSignup = () => {
  const [adminData, setAdminData] = useState({ 
    email: "", 
    password: "",
    confirmPassword: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!adminData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(adminData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!adminData.password.trim()) {
      errors.password = "Password is required";
    } else if (adminData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (adminData.confirmPassword !== adminData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
  };
  
  const handleSignup = async(e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      const {data} = await axios.post("http://localhost:5000/api/staff/signup" , adminData);

      localStorage.setItem("staff", JSON.stringify(data));


      if(data){

          // Simulate signup success
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/admin/home"); // Redirect to admin sign-in
      }, 1000);

      }
      
    
    }
  };
  
  return (
    <div className="admin-signup-container">
      <div className="admin-signup-content">
        <h2 className="admin-title">Admin Signup</h2>
        
        <form onSubmit={handleSignup}>
          <div className="admin-card">
            <div className={`admin-field ${formErrors.email ? 'error' : ''}`}>
              <div className="field-icon">
                <FaUser className="admin-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter admin email"
                  value={adminData.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && <p className="error-message">{formErrors.email}</p>}
              </div>
            </div>
            
            <div className={`admin-field ${formErrors.password ? 'error' : ''}`}>
              <div className="field-icon">
                <FaLock className="admin-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={adminData.password}
                  onChange={handleChange}
                  required
                />
                {formErrors.password && <p className="error-message">{formErrors.password}</p>}
              </div>
            </div>
            
            <div className={`admin-field ${formErrors.confirmPassword ? 'error' : ''}`}>
              <div className="field-icon">
                <FaLock className="admin-icon" />
              </div>
              <div className="field-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={adminData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {formErrors.confirmPassword && <p className="error-message">{formErrors.confirmPassword}</p>}
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="signup-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
            {!isSubmitting && <FaUserPlus className="button-icon" />}
          </button>
        </form>
        
        <div className="auth-link">
          Already have an account? <a href="/admin/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
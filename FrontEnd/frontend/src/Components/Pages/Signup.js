import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import "../Styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    uid: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.name || !formData.email || !formData.uid || !formData.password) {
      setError("All fields are required!");
      return;
    }

    // Here, you would typically make an API call to sign up the user
    // Simulating success for now:

    const {data} =await axios.post("http://localhost:5000/api/auth/signup", formData);

    localStorage.setItem("user", JSON.stringify(data));

    

    console.log(data)
    setSuccessMessage("Account created successfully!");

    if (data) {
      navigate("/signin"); // Redirect to sign-in page after successful signup
    }
    setTimeout(() => {
      navigate("/signin");
    }, 2000); // Added the missing timeout value (2 seconds)

  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2>Create Account</h2>
        
        {error && <div className="message error">{error}</div>}
        {successMessage && <div className="message success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={error && !formData.name ? "error-input" : ""} 
              placeholder="Enter your full name"
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={error && !formData.email ? "error-input" : ""} 
              placeholder="Enter your email"
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="uid">UID</label>
            <input 
              type="text" 
              id="uid" 
              name="uid" 
              value={formData.uid} 
              onChange={handleChange} 
              className={error && !formData.uid ? "error-input" : ""} 
              placeholder="Enter your UID"
              required 
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={error && !formData.password ? "error-input" : ""} 
                placeholder="Create a strong password"
                required 
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select 
              id="role" 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="">select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
          
          <div className="signin-link">
            Already have an account? <a href="/signin">Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
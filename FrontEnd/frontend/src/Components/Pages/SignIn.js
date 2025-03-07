import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirection
import "../Styles/SignIn.css";
import axios from "axios";
import { IconEye, IconEyeOff } from "@tabler/icons-react"; // Import icons for password visibility

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
 
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Example validation
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signin", formData);
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data.userDetails)); // Store user data in local storage
      navigate("/signin/authotp");
    } catch (error) {
      setError("Sign-in failed. Please check your credentials.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <h2>Welcome Back</h2>

        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={error && !formData.email ? "error-input" : ""}
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
                placeholder="Enter your password"
                className={error && !formData.password ? "error-input" : ""}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
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
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

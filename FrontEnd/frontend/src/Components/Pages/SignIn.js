import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirection
import "../Styles/SignIn.css";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate after successful signup

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Example validation
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    const { data } = axios
      .post("http://localhost:5000/api/auth/signin", formData)
      .then((response) => {
        console.log("Sign-in successful:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in local storage
        navigate("/home");
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("Sign-in error:", error);
        setError("Sign-in failed. Please check your credentials.");
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <button type="submit">Sign In</button>
        </form>

        {/* Move the SignUp link OUTSIDE the form but inside signin-box */}
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

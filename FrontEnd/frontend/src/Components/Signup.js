import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
 // Import icons
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    uid: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [theme, setTheme] = useState("light"); // Dynamic theme
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.name || !formData.email || !formData.uid || !formData.password) {
      setError("All fields are required!");
      return;
    }

    setSuccessMessage("Signup successful!");

    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  return (
    <div className={`signup-container ${theme}`}>
      <h2>Sign Up</h2>

      <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={error ? "error-input" : ""} required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>UID</label>
          <input type="text" name="uid" value={formData.uid} onChange={handleChange} required />
        </div>

        <div className="input-group password-group">
          <label>Password</label>
          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
          <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}

          </span>
        </div>

        <div className="input-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminSignin.css";
import axios from "axios";

const AdminSignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",});
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const {data}  = axios.post("http://localhost:5000/api/staff/signin", credentials);
    console.log(data);
    setTimeout(() => {
      navigate("/admin/home"); // Redirect to admin dashboard
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Admin Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Admin Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/admin/signup">Sign Up</a></p>
    </div>
  );
};

export default AdminSignIn;

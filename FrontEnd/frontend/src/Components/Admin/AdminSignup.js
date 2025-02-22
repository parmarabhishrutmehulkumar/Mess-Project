import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Admin Signed Up:", adminData);

    // Simulate signup success
    setTimeout(() => {
      navigate("/admin/signin"); // Redirect to admin sign-in
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Admin Email"
          value={adminData.email}
          onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Admin Password"
          value={adminData.password}
          onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/admin/signin">Sign In</a></p>
    </div>
  );
};

export default AdminSignup;

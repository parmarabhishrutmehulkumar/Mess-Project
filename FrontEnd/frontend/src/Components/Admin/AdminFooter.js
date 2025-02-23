import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../AdminCSS/AdminFooter.css"; 

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <p>© {new Date().getFullYear()} Mess Management System. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/support">Support</Link>
      </div>
    </footer>
  );
};

export default AdminFooter;

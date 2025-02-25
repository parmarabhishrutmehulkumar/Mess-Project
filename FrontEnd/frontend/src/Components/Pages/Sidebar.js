import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaCog, FaCommentDots, FaExclamationTriangle, FaSignOutAlt } from "react-icons/fa";
import "../Styles/Sidebar.css"; // Sidebar styling

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear authentication data
      localStorage.removeItem("token"); 
      localStorage.removeItem("user"); 
      sessionStorage.clear(); 

      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <FaBars />
      </button>

      {/* Sidebar Links */}
      <ul>
        <li>
          <Link to="/profile"><FaUser className="icon" /> {!isCollapsed && "Profile"}</Link>
        </li>
        <li>
          <Link to="/settings"><FaCog className="icon" /> {!isCollapsed && "Settings"}</Link>
        </li>
        <li>
          <Link to="/feedback"><FaCommentDots className="icon" /> {!isCollapsed && "Feedback"}</Link>
        </li>
        <li>
          <Link to="/complaint"><FaExclamationTriangle className="icon" /> {!isCollapsed && "Complaint"}</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="icon" /> {!isCollapsed && "Logout"}
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

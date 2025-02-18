import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaCog, FaCommentDots, FaExclamationTriangle } from "react-icons/fa";
import "./Sidebar.css"; // Sidebar styling

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      </ul>
    </aside>
  );
};

export default Sidebar;

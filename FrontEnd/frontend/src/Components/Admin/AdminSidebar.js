import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUsers, FaUtensils, FaExclamationTriangle, FaChartBar, FaUserCheck, FaShoppingCart} from "react-icons/fa";
import "../../Components/AdminCSS/AdminSidebar.css"; // Sidebar CSS

const AdminSidebar = ({ setSelectedComponent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          <FaBars />
        </button>
        {!isCollapsed && <h2 className="sidebar-title">Admin</h2>}
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/manage-users">
            <FaUsers className="sidebar-icon" /> {!isCollapsed && "Manage Users"}
          </Link>
        </li>
        <li>
            <Link to="/admin/manage-menu">
            <FaUtensils className="sidebar-icon" /> {!isCollapsed && "Manage Menu"}
            </Link>
        </li>
        <li>
          <Link to="/admin/complaints">
            <FaExclamationTriangle className="sidebar-icon" /> {!isCollapsed && "Complaints"}
          </Link>
        </li>
        <li>
          <Link to="/admin/reports">
            <FaChartBar className="sidebar-icon" /> {!isCollapsed && "View Reports"}
          </Link>
        </li>
        <li>
          <Link to="/admin/attendance">
            <FaUserCheck className="sidebar-icon" /> {!isCollapsed && "Attendance"}
          </Link>
        </li>
        <li>
          <Link to="/admin/token-purchased">
            <FaShoppingCart className="sidebar-icon" /> {!isCollapsed && "Token Purchased"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

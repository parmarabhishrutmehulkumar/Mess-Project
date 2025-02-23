import { Link } from "react-router-dom";
import "../AdminCSS/AdminNavbar.css"; // Corrected path
// Navbar CSS

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <h2 className="navbar-title">Admin Panel</h2>
      <div className="nav-links">
        <Link to="/admin/manage-users" className="nav-link">👥 Users</Link>
        <Link to="/admin/manage-menu" className="nav-link">📋 Menu</Link>
        <Link to="/admin/manage-orders" className="nav-link">🛒 Orders</Link>
        <Link to="/admin/reports" className="nav-link">📊 Reports</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;

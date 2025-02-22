import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";
import AdminSidebar from "./AdminSidebar"; // Import Sidebar
import "../../Components/AdminCSS/AdminHome.css";
import { FaUsers, FaShoppingCart, FaUserCheck, FaExclamationTriangle } from "react-icons/fa";

const AdminHome = () => {
  const [data, setData] = useState([
    { day: "Monday", dishes: 50 },
    { day: "Tuesday", dishes: 75 },
    { day: "Wednesday", dishes: 60 },
    { day: "Thursday", dishes: 90 },
    { day: "Friday", dishes: 80 },
  ]); // Dummy data for UI testing

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    tokensPurchased: 0,
    attendance: 0,
    complaints: 0,
  });

  useEffect(() => {
    const fetchDishesServed = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats/dishes-served");
        if (response.data.length > 0) {
          const formattedData = response.data.map(item => ({
            day: item._id || "Unknown",
            dishes: item.totalDishes || 0
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching dish data:", error);
      }
    };

    const fetchMetrics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats/metrics");
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchDishesServed();
    fetchMetrics();
    
    const interval = setInterval(() => {
      fetchDishesServed();
      fetchMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Admin Navbar */}
      <AdminNavbar />

      <div className="admin-home">
         <AdminSidebar />

        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>

          {/* Real-Time Dishes Served Graph */}
          <div className="chart-container">
            <h2>Live Dishes Served Data</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="dishes" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics Below Graph */}
          <div className="dashboard-metrics">
            <div className="metric-card">
              <FaUsers className="metric-icon users" />
              <h3>{metrics.totalUsers}</h3>
              <p>Total Users</p>
            </div>

            <div className="metric-card">
              <FaShoppingCart className="metric-icon tokens" />
              <h3>{metrics.tokensPurchased}</h3>
              <p>Tokens Purchased</p>
            </div>

            <div className="metric-card">
              <FaUserCheck className="metric-icon attendance" />
              <h3>{metrics.attendance}</h3>
              <p>Attendance</p>
            </div>

            <div className="metric-card">
              <FaExclamationTriangle className="metric-icon complaints" />
              <h3>{metrics.complaints}</h3>
              <p>Complaints</p>
            </div>
          </div>

          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

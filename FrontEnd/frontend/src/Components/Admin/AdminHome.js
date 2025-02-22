import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AdminNavbar from "./AdminNavbar"; // Import navbar
import "../../Components/AdminCSS/AdminHome.css";
import AdminFooter from "./AdminFooter";

const AdminHome = () => {
  const [data, setData] = useState([
    { day: "Monday", dishes: 50 },
    { day: "Tuesday", dishes: 75 },
    { day: "Wednesday", dishes: 60 },
    { day: "Thursday", dishes: 90 },
    { day: "Friday", dishes: 80 },
  ]); // Dummy data for UI testing

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

    fetchDishesServed();
    const interval = setInterval(fetchDishesServed, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Admin Navbar */}
      <AdminNavbar />

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
        <AdminFooter/>
      </div>
    </div>
  );
};

export default AdminHome;

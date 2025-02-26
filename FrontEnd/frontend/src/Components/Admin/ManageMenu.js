import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Components/AdminCSS/ManageMenu.css";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [newDish, setNewDish] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleUpdate = async () => {
    if (selectedDay && selectedMeal && newDish) {
      try {
        const response = await axios.post("http://localhost:5000/api/menu", {
          dish: newDish,
          category: selectedMeal,
          available: true,
        });

        setMenu([...menu, response.data.newMenuItem]);
        setNewDish("");
        setSelectedDay("");
        setSelectedMeal("");
      } catch (error) {
        console.error("Error updating menu:", error);
      }
    }
  };

  return (
    <div className="menu-container">
      <h2>Manage Weekly Menu</h2>

      <table className="menu-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
            <tr key={item._id}>
              <td>{item.day}</td>
              <td>{item.category === "breakfast" ? item.dish : ""}</td>
              <td>{item.category === "lunch" ? item.dish : ""}</td>
              <td>{item.category === "dinner" ? item.dish : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-controls">
        <h3>Update Menu</h3>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="">Select Day</option>
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
          <option value="">Select Meal Type</option>
          <option value="morning">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <input type="text" placeholder="Enter New Dish" value={newDish} onChange={(e) => setNewDish(e.target.value)} />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ManageMenu;
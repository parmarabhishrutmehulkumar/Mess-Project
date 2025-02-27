import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Components/AdminCSS/ManageMenu.css";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [newDish, setNewDish] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
        const response = await axios.post("http://localhost:5000/api/menu/add", {
          day: selectedDay,
          category: selectedMeal,
          dish: newDish,
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
          {days.map((day) => {
            const menuItem = menu.filter(item => item.day.toLowerCase() === day.toLowerCase());
            return (
              <tr key={day}>
                <td>{day}</td>
                <td>{menuItem.find(item => item.category === "breakfast")?.dish || "-"}</td>
                <td>{menuItem.find(item => item.category === "lunch")?.dish || "-"}</td>
                <td>{menuItem.find(item => item.category === "dinner")?.dish || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="admin-controls">
        <h3>Update Menu</h3>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="">Select Day</option>
          {days.map((day) => (
            <option key={day} value={day.toLowerCase()}>{day}</option>
          ))}
        </select>

        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
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
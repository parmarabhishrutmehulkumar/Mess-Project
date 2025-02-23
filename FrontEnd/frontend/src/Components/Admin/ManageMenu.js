import React, { useState } from "react";
import "../../Components/AdminCSS/ManageMenu.css"; // Add styles

const ManageMenu = () => {
  const initialMenu = [
    { id: 1, day: "Monday", breakfast: "Pancakes", lunch: "Paneer Shawarma", dinner: "Pasta" },
    { id: 2, day: "Tuesday", breakfast: "Oatmeal", lunch: "Veggie Wrap", dinner: "Pizza" },
    { id: 3, day: "Wednesday", breakfast: "Smoothie", lunch: "Rice & Beans", dinner: "Salad" },
    { id: 4, day: "Thursday", breakfast: "Toast", lunch: "Noodles", dinner: "Soup" },
    { id: 5, day: "Friday", breakfast: "Paratha", lunch: "Veg Biryani", dinner: "Burger" },
    { id: 6, day: "Saturday", breakfast: "Dosa", lunch: "Paneer Curry", dinner: "Sushi" },
    { id: 7, day: "Sunday", breakfast: "Idli", lunch: "Dal Tadka", dinner: "Tacos" },
  ];

  const [menu, setMenu] = useState(initialMenu);
  const [newDish, setNewDish] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");

  // Update dish for selected day and meal type
  const handleUpdate = () => {
    if (selectedDay && selectedMeal && newDish) {
      setMenu(menu.map((item) =>
        item.day === selectedDay ? { ...item, [selectedMeal]: newDish } : item
      ));
      setNewDish("");
      setSelectedDay("");
      setSelectedMeal("");
    }
  };

  return (
    <div className="menu-container">
      <h2>Manage Weekly Menu</h2>

      {/* Menu Table (Only Display for Users) */}
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
            <tr key={item.id}>
              <td>{item.day}</td>
              <td>{item.breakfast}</td>
              <td>{item.lunch}</td>
              <td>{item.dinner}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Admin Controls for Adding/Updating Menu */}
      <div className="admin-controls">
        <h3>Update Menu</h3>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="">Select Day</option>
          {menu.map((item) => (
            <option key={item.id} value={item.day}>
              {item.day}
            </option>
          ))}
        </select>

        <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <input
          type="text"
          placeholder="Enter New Dish"
          value={newDish}
          onChange={(e) => setNewDish(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ManageMenu;

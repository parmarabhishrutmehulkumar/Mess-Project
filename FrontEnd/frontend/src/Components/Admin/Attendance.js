import React, { useState } from "react";
import "../../Components/AdminCSS/Attendance.css"; // Add CSS file

const Attendance = () => {
  // Dummy data for student attendance per meal
  const [attendanceData] = useState([
    { date: "2025-02-21", breakfast: 120, lunch: 150, dinner: 140 },
    { date: "2025-02-20", breakfast: 110, lunch: 140, dinner: 130 },
    { date: "2025-02-19", breakfast: 115, lunch: 145, dinner: 135 },
  ]);

  return (
    <div className="attendance-container">
      <h2>Student Meal Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.breakfast}</td>
              <td>{entry.lunch}</td>
              <td>{entry.dinner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;

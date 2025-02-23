import React, { useEffect, useState } from "react";
import "../../Components/AdminCSS/ManageUsers.css"; // Add styles
import axios from "axios"; // Make API calls

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend API
    axios.get("http://localhost:5000/api/admin/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="manage-users-container">
      <h2>Registered Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>UID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role || "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

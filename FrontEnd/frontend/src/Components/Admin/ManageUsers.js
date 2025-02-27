import React, { useEffect, useState } from "react";
import "../../Components/AdminCSS/ManageUsers.css"; // Add styles

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dummy user data instead of API call
    const dummyUsers = [
      { _id: "1", username: "john_doe", email: "john@example.com", role: "Admin" },
      { _id: "2", username: "jane_doe", email: "jane@example.com", role: "User" },
      { _id: "3", username: "michael_smith", email: "michael@example.com", role: "Moderator" },
      { _id: "4", username: "alice_wonder", email: "alice@example.com", role: "User" },
    ];
    setUsers(dummyUsers);
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

import React, { useEffect, useState } from "react";
import "../../Components/AdminCSS/ManageUsers.css"; // Add styles

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dummy user data instead of API call
    const dummyUsers = [
      { _id: "1", username: "Abhi", email: "abhi@gmail.com", role: "Admin" },
      { _id: "2", username: "Rohan", email: "rohan123@gmail.com", role: "Student" },
      { _id: "3", username: "Divyaprakash", email: "divy1@gmail.com", role: "Student" },
      { _id: "4", username: "Khushi", email: "khushigendi@gmail.com", role: "Faculty" },
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

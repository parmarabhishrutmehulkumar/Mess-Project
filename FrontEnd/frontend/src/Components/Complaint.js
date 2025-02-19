import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // Icons for complaints
import "./Complaint.css"; // Add your own CSS styling

const Complaint = () => {
  const [complaint, setComplaint] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prevComplaint) => ({
      ...prevComplaint,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle complaint submission here (e.g., send to a server)
    alert("Complaint submitted successfully!");
    // Reset form after submission
    setComplaint({
      name: "",
      email: "",
      category: "",
      description: "",
      priority: "Medium",
    });
  };

  return (
    <div className="complaint-container">
      <h2>Submit a Complaint</h2>

      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-field">
          <label htmlFor="name">Name (Optional):</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={complaint.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email (Optional):</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            value={complaint.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="category">Complaint Category:</label>
          <select
            name="category"
            id="category"
            value={complaint.category}
            onChange={handleChange}
          >
            <option value="">Select a Category</option>
            <option value="Bug">Bug</option>
            <option value="Error">Error</option>
            <option value="Service Issue">Service Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="description">Complaint Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Describe your issue"
            value={complaint.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            id="priority"
            value={complaint.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit Complaint <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Complaint;

import { useState, useEffect } from "react";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("/api/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  return (
    <div className="complaints-container">
      <h2>User Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints available.</p>
      ) : (
        <ul className="complaints-list">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="complaint-item">
              <strong>Complaint #{complaint.id}:</strong> {complaint.message}  
              <br />
              <span>Status: {complaint.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Complaints;

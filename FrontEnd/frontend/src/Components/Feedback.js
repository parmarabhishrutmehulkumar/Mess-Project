import React, { useState } from "react";
import { FaStar, FaPaperPlane, FaArrowLeft } from "react-icons/fa"; // Import back icon
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./Feedback.css";

const Feedback = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
    setFeedback({ name: "", email: "", rating: 0, message: "" });
  };

  return (
    <div className="feedback-container">
      <h2>Give Us Your Feedback</h2>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-field">
          <label htmlFor="name">Name (Optional):</label>
          <input type="text" name="name" id="name" placeholder="Your name" value={feedback.name} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email (Optional):</label>
          <input type="email" name="email" id="email" placeholder="Your email" value={feedback.email} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label htmlFor="rating">Rating (1-5):</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} size={30} color={star <= feedback.rating ? "#ffd700" : "#ccc"} onClick={() => setFeedback({ ...feedback, rating: star })} style={{ cursor: "pointer" }} />
            ))}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="message">Feedback Message:</label>
          <textarea name="message" id="message" placeholder="Enter your feedback here" value={feedback.message} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-button">
          Submit Feedback <FaPaperPlane />
        </button>
      </form>

      {/* 🚀 Back to Home Button */}
      <button className="back-home-button" onClick={() => navigate("/home")}>
        <FaArrowLeft /> Back to Home
      </button>
    </div>
  );
};

export default Feedback;

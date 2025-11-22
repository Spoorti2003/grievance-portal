import React, { useState } from "react";
import { useParams } from "react-router-dom";

const FeedBack = () => {
  const { grievanceId } = useParams(); // Get grievance ID from URL params
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0); // To track hover state for stars
  const [comments, setComments] = useState("");
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || rating < 1 || rating > 5) {
      alert("Please select a valid rating.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/createFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grievance_id: grievanceId,
          student_id: localStorage.getItem("userId"),
          rating,
          comments,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create feedback.");
      }

      alert("Feedback submitted successfully!");
      //navigate("/student-dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <div className="d-flex align-items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hover || rating) ? "text-warning" : "text-secondary"
                }`}
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={() => setRating(star)} // Set rating on click
                onMouseEnter={() => setHover(star)} // Highlight stars on hover
                onMouseLeave={() => setHover(0)} // Reset highlight on mouse leave
              >
                ★
              </span>
            ))}
          </div>
          {rating === 0 && (
            <small className="text-danger">Please select a rating.</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            Comments
          </label>
          <textarea
            id="comments"
            className="form-control"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows="3"
            placeholder="Share your feedback here"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedBack;

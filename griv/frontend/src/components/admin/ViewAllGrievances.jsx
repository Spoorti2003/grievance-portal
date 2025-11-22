import React, { useState, useEffect } from "react";

import Navbar from "../shared/Navbar"; // Adjust path
import Sidebar from "./Sidebar"; // Adjust path

const ViewAllGrievances = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fetchFeedback");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback data");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <>
      <Navbar role="admin" />
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          className="content-wrapper"
          style={{
            marginLeft: "200px", // Adjust to match the width of your sidebar
            padding: "20px",
            width: "100%",
          }}
        >
          <h2 className="mb-4">All Grievances Feedback</h2>
          {loading && <p>Loading feedback...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && feedbacks.length === 0 && (
            <p>No feedback data available.</p>
          )}
          <div className="row">
            {feedbacks.map((feedback) => (
              <div className="col-md-4" key={feedback.id}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{feedback.grievance_title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      By: {feedback.student_name}
                    </h6>
                    <p className="card-text">
                      <strong>Rating:</strong> {feedback.feedback_rating} / 5
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllGrievances;

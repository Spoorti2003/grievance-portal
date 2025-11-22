import React from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css"; // Import CSS file for styling

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="index-container">
      {/* Section 1: Heading and Login Info */}
      <section className="section-one">
        <h1>Welcome to College Grievance Portal</h1>
        <p>Choose the Preferred Login Below</p>
      </section>

      {/* Section 2: Cards */}
      <section className="section-two">
        <div className="cards-container">
          {/* Student Card */}
          <div className="card">
            <img
              src="/images/student.jpeg"
              alt="Student Login"
              className="card-image"
            />
            <button
              className="card-button"
              onClick={() => navigate("/studentlogin")}
            >
              User Login
            </button>
          </div>

          {/* Admin Card */}
          <div className="card">
            <img
              src="/images/admin.jpeg"
              alt="Admin Login"
              className="card-image"
            />
            <button
              className="card-button"
              onClick={() => navigate("/adminlogin")}
            >
              Admin Login
            </button>
          </div>

          {/* Staff Card */}
          <div className="card">
            <img
              src="/images/staff.jpeg"
              alt="Staff Login"
              className="card-image"
            />
            <button
              className="card-button"
              onClick={() => navigate("/stafflogin")}
            >
              Staff Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

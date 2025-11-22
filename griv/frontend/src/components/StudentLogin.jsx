import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css"; // Create a CSS file for custom styling

const StudentLogin = () => {
  const navigate = useNavigate();

  // State variables for form inputs
  // Separate state variables for student
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const handleStudentLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/studentlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: studentUsername,
          password: studentPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Student Login Error:", errorData);
        throw new Error("Student login failed");
      }

      const data = await response.json();
      console.log("Student Login Success:", data);

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);

      // Pass the userId to the StudentDashboard via navigate
      navigate("/studentdashboard", {
        state: {
          username: studentUsername,
          role: data.role,
          userId: data.userId, // Ensure you're passing data.userId
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid student credentials!");
    }
  };

  return (
    <div className="staff-login-container">
      <div className="section-one">
        <h1>Student Login</h1>
        <p>Welcome to the student portal</p>
      </div>
      <div className="section-two">
        <div className="staff-login-card">
          <h2>Login</h2>
          <form onSubmit={handleStudentLogin}>
            <div className="form-group">
              <label htmlFor="studentUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="studentUsername"
                value={studentUsername}
                onChange={(e) => setStudentUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="studentPassword"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              Student Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;

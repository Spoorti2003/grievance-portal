import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StaffLogin.css"; // Create a CSS file for custom styling

const StaffLogin = () => {
  const navigate = useNavigate();

  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
  
    try {
      const response = await fetch("http://localhost:5000/api/stafflogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save token and staff ID to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("staffId", data.uid); // Save staff ID
        localStorage.setItem("username", username);
  
        // Navigate to Staff Dashboard
        navigate("/staffdashboard");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="staff-login-container">
      {/* Header Section */}
      <section className="section-one">
        <h1>Welcome to College Grievance Portal</h1>
        <p>Please enter your credentials below to log in.</p>
      </section>

      {/* Login Form Section */}
      <section className="section-two">
        <div className="staff-login-card">
          <h2>Staff Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default StaffLogin;

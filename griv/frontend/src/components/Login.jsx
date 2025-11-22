import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: adminUsername,
          password: adminPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Admin Login Error:", errorData);
        throw new Error("Admin login failed");
      }

      const data = await response.json();
      console.log("Admin Login Success:", data);
      localStorage.setItem("token", data.token);

      navigate("/admindashboard", {
        state: { username: adminUsername, role: data.role },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="admin-login-container">
      {/* Header Section */}
      <section className="section-one">
        <h1>Welcome to College Grievance Portal</h1>
        <p>Please enter your credentials below to log in.</p>
      </section>

      {/* Login Form Section */}
      <section className="section-two">
        <div className="staff-login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="adminUsername"
                placeholder="Enter username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="adminPassword"
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
            <button type="submit" className="btn btn-primary w-100">
              Admin Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;

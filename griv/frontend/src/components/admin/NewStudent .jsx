import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../admin/Sidebar";

const NewStudent = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    class_id: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allClasses");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();

        if (data.result && Array.isArray(data.result)) {
          setClasses(data.result);
        } else {
          console.error(
            "API response does not contain 'result' or is not an array:",
            data
          );
          setClasses([]);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error message on input change
  };

  // Validate strong password
  const isPasswordValid = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password
    if (formData.username === formData.password) {
      setError("Username and password cannot be the same.");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      setMessage("Student added successfully!");
      setFormData({
        username: "",
        password: "",
        name: "",
        class_id: "",
        email: "",
        mobile: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("Failed to add student. Please try again.");
    }
  };

  return (
    <>
      <div>
        <Navbar role="admin" />
      </div>
      <div className="d-flex">
        <Sidebar />
        <div
          className="container d-flex justify-content-center align-items-center "
          style={{ height: "100vh", marginLeft: "200px", marginTop: "100px" }}
        >
          <div
            className="card mt-6"
            style={{
              width: "1000px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              minWidth: "600px",
            }}
          >
            <h3 className="text-center mb-4">Add New Student</h3>
            {message && <div className="alert alert-info">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="class_id" className="form-label">
                  Class
                </label>
                <select
                  id="class_id"
                  name="class_id"
                  className="form-select"
                  value={formData.class_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  {Array.isArray(classes) &&
                    classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  className="form-control"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength="10"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Add Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStudent;

// Import necessary dependencies
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../admin/Sidebar";

const CreateSemester = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create class");
      }

      // Remove this line if you don't need the API response data
      await response.json();

      setMessage("Semester created successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating class:", error);
      setMessage("Failed to create class. Please try again.");
    }
  };

  return (
    <>
      <div>
        <Navbar role="admin" />
        <div className="d-flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh", marginLeft: "200px" }}
          >
            <div className="card" style={{ width: "1000px", minWidth: "600px" }}>
              <h3 className="text-center mb-4">Create Semester</h3>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Semester Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Create Semester
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSemester;

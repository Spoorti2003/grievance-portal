import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../admin/Sidebar";

const CreateGrievanceType = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the name field is empty
    if (!name.trim()) {
      setMessage("Grievance type name is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/grievance-types",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      const data = await response.json(); // Get the response data
      console.log("Response from server:", data); // Log the response for debugging

      if (!response.ok) {
        throw new Error(data.error || "Failed to create grievance type");
      }

      setMessage(data.message || "Saved successfully!"); // Set success message
      setName(""); // Clear the input field
    } catch (error) {
      console.error("Error saving grievance type:", error);
      setMessage("Failed to save grievance type. Please try again.");
    }
  };

  return (
    <div>
      {/* Header */}
      <Navbar role="admin" />

      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "100vh",
    marginLeft: "250px", // Adjust this value based on your sidebar width
    backgroundColor: "#f8f9fa",
  }}
>
  <div className="card" style={{ width: "1000px", minWidth: "600px" }}>
    <h3 className="text-center mb-4">Create Grievance Type</h3>

    {/* Display success or error message */}
    {message && (
      <div
        className={`alert ${
          message.includes("Failed") ? "alert-danger" : "alert-success"
        } text-center`}
        role="alert"
      >
        {message}
      </div>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Grievance Type Name
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Enter grievance type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Save
      </button>
    </form>
  </div>
</div>
      </div>
    </div>
  );
};

export default CreateGrievanceType;

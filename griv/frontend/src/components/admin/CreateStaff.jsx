import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../admin/Sidebar";

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [grievanceTypeId, setGrievanceTypeId] = useState("");
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch grievance types on component mount
  useEffect(() => {
    const fetchGrievanceTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/fetchgrievancetypes"
        );
        const data = await response.json();

        // Set the grievanceTypes state with the "result" key
        if (data.result) {
          setGrievanceTypes(data.result);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching grievance types:", error.message);
      }
    };

    fetchGrievanceTypes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          grievance_type_id: grievanceTypeId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create staff");
      }

      setMessage("Staff created successfully!");
      setName("");
      setUsername("");
      setPassword("");
      setGrievanceTypeId("");
    } catch (error) {
      console.error("Error creating staff:", error.message);
      setMessage(error.message || "Failed to create staff. Please try again.");
    }
  };

  return (
    <>
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

            <h3 className="text-center mb-4">Create Staff</h3>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
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
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="grievanceTypeId" className="form-label">
                  Grievance Type
                </label>
                <select
                  id="grievanceTypeId"
                  className="form-select"
                  value={grievanceTypeId}
                  onChange={(e) => setGrievanceTypeId(e.target.value)}
                  required
                >
                  <option value="">Select Grievance Type</option>
                  {grievanceTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Create Staff
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStaff;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GrivResolve = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("resolved");

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getGrievanceDetails/${id}`
        );
        if (!response.ok) throw new Error("Could not fetch grievance details");
        const data = await response.json();
        setGrievance(data);
      } catch (error) {
        setError("Could not fetch grievance details");
      } finally {
        setLoading(false);
      }
    };
    fetchGrievance();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      const resolvedBy = localStorage.getItem("username"); // Retrieve the logged-in staff username
      if (!resolvedBy) {
        alert("Staff username not found. Please log in again.");
        return;
      }
  
      const response = await fetch(
        `http://localhost:5000/api/updateGrievanceStatus/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, resolved_by: resolvedBy }), // Pass the username as resolved_by
        }
      );
  
      if (!response.ok) throw new Error("Failed to update grievance status");
      alert("Grievance status updated and email sent to student.");
    } catch (error) {
      console.error(error);
      alert("Error updating grievance status.");
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;
   
  const handleLogout=()=>{
    navigate("/");
  }
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-end mb-4"> 
  <div> <h2>Grievance Details</h2></div> {/* Optional placeholder for left content */}
  <button className="btn btn-primary ms-auto" onClick={handleLogout} style={{width:"200px"}}>Log Out</button>
</div>
      
      {grievance ? (
        <div className="card" style={{ width: "1000px", minWidth: "600px" }}>
          <div className="card-body">
            <h5 className="card-title">{grievance.title}</h5>
            <p>
              <strong>Description:</strong> {grievance.description}
            </p>
            <p>
              <strong>Status:</strong> {grievance.status}
            </p>
            <p>
              <strong>Priority:</strong> {grievance.priority}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(grievance.created_at).toLocaleString()}
            </p>
            {grievance.image && (
              <img
                src={`http://localhost:5000/${grievance.image}`}
                alt="Grievance"
                className="img-fluid mt-3"
                style={{ width: "300px", height: "200px", objectFit: "cover" }}
              />
            )}

            {/* Update Status */}
            <div className="mt-4">
              <label htmlFor="status">Update Status:</label>
              <select
                id="status"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                className="btn btn-success mt-3"
                onClick={handleStatusUpdate}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No grievance found</div>
      )}
    </div>
  );
};

export default GrivResolve;

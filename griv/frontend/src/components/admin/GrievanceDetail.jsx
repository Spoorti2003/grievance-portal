import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GrievanceDetail = () => {
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
      const resolvedBy = 1; // Example: Admin user ID
      const response = await fetch(
        `http://localhost:5000/api/updateGrievanceStatus/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, resolved_by: resolvedBy }),
        }
      );

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error("Failed to update grievance status");
      }

      alert("Grievance status updated and email sent to student.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating grievance status. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Grievance Details</h2>
      {grievance ? (
        <div
          className="card p-4"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div className="card-body">
            <h3 className="card-title">{grievance.title}</h3>
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
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            )}

            {/* Update Status */}
            <div className="mt-4">
              <label htmlFor="status" className="form-label">
                Update Status:
              </label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                className="btn btn-success mt-3 w-100"
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

export default GrievanceDetail;

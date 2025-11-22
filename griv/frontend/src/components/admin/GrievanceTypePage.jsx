import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GrievanceTypePage = () => {
  const { type } = useParams(); // `type` is fetched from the URL params
  const navigate = useNavigate(); // For navigation
  const [grievances, setGrievances] = useState([]);
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch grievances when the page loads or type/priority changes
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getGrievancesByTypes?type=${type}&priority=${priority}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch grievances");
        }
        const data = await response.json();
        setGrievances(data);
      } catch (error) {
        setError("Could not fetch grievances");
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, [type, priority]);

  return (
    <div className="container mt-4">
      <h2>Grievances for {type}</h2>

      {/* Priority Filter */}
      <div className="mb-3">
        <label>Filter by Priority:</label>
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Grievances Table */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => (
              <tr key={grievance.id}>
                <td>{grievance.title}</td>
                <td>{grievance.status}</td>
                <td>{grievance.priority}</td>
                <td>{new Date(grievance.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={
                      () => navigate(`/grievance/${grievance.id}`) // Navigate to GrievanceDetail page
                    }
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GrievanceTypePage;

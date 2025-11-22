import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievances = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/getgrives", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            staffId: JSON.parse(atob(token.split(".")[1])).uid,
          }), // Decode the token to get staffId
        });

        if (!response.ok) throw new Error("Could not fetch grievances");

        const data = await response.json();
        setGrievances(data.grievances);
      } catch (error) {
        setError("Could not fetch grievances");
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleViewDetails = (id) => {
    navigate(`/GrivResolve/${id}`); // Navigates to GrivResolve with the grievance ID
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  const handleLogout=()=>{
    navigate("/");
  }

  return (
    <div className="container mt-4">
     
      <div className="d-flex justify-content-between align-items-end mb-4"> 
  <div> <h2>Grievances Assigned to You</h2></div> {/* Optional placeholder for left content */}
  <button className="btn btn-primary ms-auto" onClick={handleLogout} style={{width:"200px"}}>Log Out</button>
</div>
      {grievances.length > 0 ? (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => (
              <tr key={grievance.id}>
                <td>{grievance.id}</td>
                <td>{grievance.title}</td>
                <td>{grievance.priority}</td>
                <td>{grievance.status}</td>
                <td>{new Date(grievance.created_at).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(grievance.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No grievances assigned</div>
      )}
    </div>
  );
};

export default StaffDashboard;

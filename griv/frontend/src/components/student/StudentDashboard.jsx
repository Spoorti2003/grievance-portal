import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const username = localStorage.getItem("username");
  const role = "student"; // Assuming a default role, adjust as needed
  const userId = localStorage.getItem("userId");

  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const fetchGrievances = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getGrievancesByStudent/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch grievances");
        }

        const data = await response.json();
        setGrievances(data.grievances || []);
      } catch (error) {
        console.error("Error fetching grievances:", error);
        alert("Failed to fetch grievances!");
      }
    };

    fetchGrievances();
  }, [userId, navigate]);

  
  const handleLogout=()=>{
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-end mb-4"> 
  <div> <h2>Welcome to Student Dashboard</h2></div> {/* Optional placeholder for left content */}
  <button className="btn btn-primary ms-auto" onClick={handleLogout} style={{width:"200px"}}>Log Out</button>
</div>
      
      <div>
        <h1>Welcome, {username}</h1>
        <p style={{ display: "none" }}>Role: {role}</p>
        <p style={{ display: "none" }}>ID: {userId}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Your Grievances</h4>
        <Link to="/newgrievance" className="btn btn-primary"  style={{width:"300px"}}>
          Generate Grievance
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grievances.length > 0 ? (
            grievances.map((grievance) => (
              <tr key={grievance.id}>
                <td>{grievance.title}</td>
                <td>{grievance.priority}</td>
                <td>{grievance.status}</td>
                <td>{new Date(grievance.created_at).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/feedback/${grievance.id}`}
                    className="btn btn-sm btn-success"
                  >
                    Create Feedback
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No grievances found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;

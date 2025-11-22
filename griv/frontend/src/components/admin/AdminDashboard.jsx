import React, { useEffect, useState } from "react";

import Navbar from "../shared/Navbar";
import Sidebar from "./Sidebar";
import GrievanceChart from "./GrievanceChart";
import PendingGrievances from "./PendingGrievances";
import SolvedGrievances from "./SolvedGrievances";

const AdminDashboard = ({ role }) => {
  const [grievances, setGrievances] = useState([]);
  const [pending, setPending] = useState([]);
  const [solved, setSolved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/grievanceForChart"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch grievances");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setGrievances(data);
          setPending(
            data.filter((grievance) => grievance.status === "pending")
          );
          setSolved(
            data.filter((grievance) => grievance.status === "resolved")
          );
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching grievances:", error);
        setError("Could not fetch grievances");
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, [role]);

  return (
    <div>
      <Navbar role={role} />
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="container mt-4" style={{ marginLeft: "200px" }}>
          <h2 className="text-center">Admin Dashboard</h2>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div>
          ) : (
            <>
              <GrievanceChart grievances={grievances} />
              <div className="row mt-4">
                <div className="col-md-6" style={{visibility:"hidden"}}>
                  <PendingGrievances grievances={pending} />
                </div>
                <div className="col-md-6" style={{visibility:"hidden"}}>
                  <SolvedGrievances grievances={solved} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

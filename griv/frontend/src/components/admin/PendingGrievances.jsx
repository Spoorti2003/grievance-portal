import React from "react";

const PendingGrievances = ({ grievances }) => {
  if (!grievances || grievances.length === 0) {
    return <div>No pending grievances</div>;
  }

  return (
    <div>
      <h5>Pending Grievances</h5>
      <ul>
        {grievances.map((grievance) => (
          <li key={grievance.id}>{grievance.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PendingGrievances;

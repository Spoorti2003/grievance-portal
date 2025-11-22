import React from "react";

const SolvedGrievances = ({ grievances }) => {
  return (
    <div className="card"  style={{ width: "1000px", minWidth: "600px" }}>
      <div className="card-body">
        <h5 className="card-title">Solved Grievances</h5>
        <ul className="list-group">
          {grievances.map((grievance) => (
            <li key={grievance.id} className="list-group-item">
              <strong>Type:</strong> {grievance.type} <br />
              <strong>Description:</strong> {grievance.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SolvedGrievances;

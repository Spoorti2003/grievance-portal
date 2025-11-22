import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/create-semester" className="nav-link">
            Create Semester
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-grievance-type" className="nav-link">
            Create Grievance Type
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-staff" className="nav-link">
            Create Staff
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-student" className="nav-link">
            Create Student
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/view-all-grievances" className="nav-link">
            View  Grievances Feedback
          </Link>
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;

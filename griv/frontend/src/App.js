import "./App.css";
import Login from "./components/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import ViewAllGrievances from "./components/admin/ViewAllGrievances";
import StudentDashboard from "./components/student/StudentDashboard";
import NewGrievance from "./components/student/NewGrievance";
import GrievanceTypePage from "./components/admin/GrievanceTypePage";
import GrievanceDetail from "./components/admin/GrievanceDetail";
import CreateSemester from "./components/admin/CreateSemester";
import NewStudent from "./components/admin/NewStudent ";
import CreateStaff from "./components/admin/CreateStaff";
import CreateGrievanceType from "./components/admin/CreateGrievanceType";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import StaffLogin from "./components/StaffLogin";
import StaffDashBoard from "./components/staff/StaffDashBoard";
import GrivResolve from "./components/staff/GrivResolve";
import StudentLogin from "./components/StudentLogin";
import FeedBack from "./components/student/FeedBack";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/newgrievance" element={<NewGrievance />} />
        <Route path="/grievances/:type" element={<GrievanceTypePage />} />
        <Route path="/grievance/:id" element={<GrievanceDetail />} />
        <Route path="/create-semester" element={<CreateSemester />} />
        <Route path="/create-student" element={<NewStudent />} />
        <Route path="/create-staff" element={<CreateStaff />} />
        <Route path="/stafflogin" element={<StaffLogin />} />
        <Route path="/staffdashboard" element={<StaffDashBoard />} />
        <Route
          path="/create-grievance-type"
          element={<CreateGrievanceType />}
        />
        <Route path="/GrivResolve/:id" element={<GrivResolve />} />
        <Route path="/feedback/:grievanceId" element={<FeedBack />} />
        <Route path="/view-all-grievances" element={<ViewAllGrievances />} />
      </Routes>
    </Router>
  );
}

export default App;

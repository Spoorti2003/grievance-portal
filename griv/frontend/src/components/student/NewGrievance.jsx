import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewGrievance = () => {
  const usrId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [image, setImage] = useState(null);
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [grievanceTypeId, setGrievanceTypeId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch grievance types from the backend
    const fetchGrievanceTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/fetchgrievancetypes"
        );
        const data = await response.json();
        setGrievanceTypes(data.result);
      } catch (error) {
        console.error("Error fetching grievance types:", error);
      }
    };

    fetchGrievanceTypes();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLogout=()=>{
    navigate("/");
  }

  // Speech Recognition Logic
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language (can be changed)

    recognition.onstart = () => {
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get voice input
      setDescription((prev) => prev + " " + transcript); // Append to description
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error occurred while recognizing voice.");
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId = localStorage.getItem("userId"); // Get studentId from localStorage
    console.log("Retrieved Student ID:", studentId);

    // Check if studentId is available
    if (!studentId) {
      alert("Student not logged in. Please log in first.");
      navigate("/login"); // Redirect to login if studentId is not available
      return;
    }

    const formData = new FormData();
    formData.append("student_id", usrId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("grievance_type_id", grievanceTypeId); // Add grievance type ID
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/grievances", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Grievance submitted successfully!");
        navigate("/studentdashboard");
      } else {
        const errorData = await response.json();
        console.error("Error submitting grievance:", errorData);
        alert("Failed to submit grievance.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the grievance.");
    }
  };

  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-end mb-4"> 
  <div></div> {/* Optional placeholder for left content */}
  <button className="btn btn-primary ms-auto" onClick={handleLogout} style={{width:"200px"}}>Log Out</button>
</div>
      <h2>Submit a New Grievance</h2>
      <h2  style={{ display: "none" }}>User ID: {usrId || "Not Found"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Grievance Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button
            type="button"
            style={{width:"300px"}}
            className="btn btn-outline-primary mt-2"
            onClick={startVoiceInput}
          >
            🎤 Speak Description
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-control"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="grievanceType" className="form-label">
            Grievance Type
          </label>
          <select
            className="form-control"
            id="grievanceType"
            value={grievanceTypeId}
            onChange={(e) => setGrievanceTypeId(e.target.value)}
            required
          >
            <option value="">Select Grievance Type</option>
            {grievanceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Attach an Image (Optional)
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit Grievance
        </button>
      </form>
    </div>
  );
};

export default NewGrievance;

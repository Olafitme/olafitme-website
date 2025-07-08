import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const skills = ["Marketing", "UI/UX", "Engineering", "Finance", "Product"];

const MentorList = () => {
  const { user } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    fetchMentors();
  }, [selectedSkill]);

  const fetchMentors = async () => {
    try {
      const query = selectedSkill ? `?skill=${selectedSkill}` : "";
      const res = await api.get(`/mentors${query}`);
      setMentors(res.data);
    } catch (err) {
      console.error("Failed to load mentors", err);
    }
  };

  const sendRequest = async (mentorId) => {
    try {
      await api.post("/requests", { mentorId });
      alert("Mentorship request sent");
    } catch (err) {
      alert("Request failed or already sent");
    }
  };

  return (
    <div>
      <h2>Find a Mentor</h2>

      <label>Filter by Skill:</label>
      <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
        <option value="">-- All --</option>
        {skills.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "1rem" }}>
        {mentors.map((mentor) => (
          <div key={mentor._id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
            <h3>{mentor.name || mentor.email}</h3>
            <p>{mentor.bio}</p>
            <p><strong>Skills:</strong> {mentor.skills.join(", ")}</p>
            <button onClick={() => sendRequest(mentor._id)}>Request Mentorship</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;
import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await api.get("/admin/sessions");
      setSessions(res.data);
    } catch (err) {
      alert("Failed to load sessions");
    }
  };

  return (
    <div>
      <h2>Admin: All Mentorship Sessions</h2>

      {sessions.length === 0 && <p>No sessions in the system.</p>}

      {sessions.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p><strong>Mentor:</strong> {s.mentor?.name || s.mentor?.email}</p>
          <p><strong>Mentee:</strong> {s.mentee?.name || s.mentee?.email}</p>
          <p><strong>Scheduled At:</strong> {new Date(s.scheduledAt).toLocaleString()}</p>

          {s.feedback?.menteeRating && (
            <p><strong>Rating:</strong>  {s.feedback.menteeRating}</p>
          )}

          {s.feedback?.menteeComment && (
            <p><strong>Mentee Feedback:</strong> {s.feedback.menteeComment}</p>
          )}

          {s.feedback?.mentorComment && (
            <p><strong>Mentor Comment:</strong> {s.feedback.mentorComment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminSessions;
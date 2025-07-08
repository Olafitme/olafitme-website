import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const SessionsOverview = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const endpoint = user.role === "mentor" ? "/sessions/mentor" : "/sessions/mentee";
      const res = await api.get(endpoint);
      setSessions(res.data);
    } catch (err) {
      alert("Failed to load sessions");
    }
  };

  return (
    <div>
      <h2>{user.role === "mentor" ? "My Mentorship Sessions" : "My Booked Sessions"}</h2>

      {sessions.length === 0 && <p>No sessions booked yet.</p>}

      {sessions.map((s) => (
        <div key={s._id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
          <p>
            <strong>With:</strong>{" "}
            {user.role === "mentor"
              ? s.mentee?.name || s.mentee?.email
              : s.mentor?.name || s.mentor?.email}
          </p>
          <p><strong>Scheduled At:</strong> {new Date(s.scheduledAt).toLocaleString()}</p>

          {/* Feedback Section */}
          {s.feedback?.menteeRating && (
            <p><strong>Rating:</strong>  {s.feedback.menteeRating}</p>
          )}
          {s.feedback?.menteeComment && (
            <p><strong>Mentee Comment:</strong> {s.feedback.menteeComment}</p>
          )}
          {s.feedback?.mentorComment && (
            <p><strong>Mentor Comment:</strong> {s.feedback.mentorComment}</p>
          )}

          {/* Feedback Button if missing */}
          {user.role === "mentee" && !s.feedback?.menteeRating && (
            <Link to={`/sessions/${s._id}/feedback`}>
              <button>Leave Feedback</button>
            </Link>
          )}

          {user.role === "mentor" && !s.feedback?.mentorComment && (
            <Link to={`/sessions/${s._id}/feedback`}>
              <button>Add Mentor Comment</button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionsOverview;
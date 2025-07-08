import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const FeedbackForm = () => {
  const { id } = useParams(); // session ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  const [session, setSession] = useState(null);
  const [form, setForm] = useState({
    menteeRating: "",
    menteeComment: "",
    mentorComment: "",
  });

  useEffect(() => {
    api.get(user.role === "mentor" ? "/sessions/mentor" : "/sessions/mentee")
      .then((res) => {
        const s = res.data.find((sess) => sess._id === id);
        if (!s) return navigate("/sessions");
        setSession(s);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/sessions/${id}/feedback`, form);
      alert("Feedback submitted");
      navigate("/sessions");
    } catch (err) {
      alert("Submission failed");
    }
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div>
      <h2>Leave Feedback for Session</h2>
      <p><strong>With:</strong> {user.role === "mentor" ? session.mentee?.name : session.mentor?.name}</p>
      <p><strong>At:</strong> {new Date(session.scheduledAt).toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        {user.role === "mentee" && (
          <>
            <label>Rating (1–5):</label>
            <input
              name="menteeRating"
              type="number"
              min="1"
              max="5"
              value={form.menteeRating}
              onChange={handleChange}
              required
            />
            <br />
            <label>Your Comment:</label>
            <textarea
              name="menteeComment"
              value={form.menteeComment}
              onChange={handleChange}
              required
            />
          </>
        )}

        {user.role === "mentor" && (
          <>
            <label>Mentor Comment (optional):</label>
            <textarea
              name="mentorComment"
              value={form.mentorComment}
              onChange={handleChange}
            />
          </>
        )}

        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
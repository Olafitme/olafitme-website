import { useEffect, useState } from "react";
import api from "../api/axios";

const SessionBooking = () => {
  const [acceptedMentors, setAcceptedMentors] = useState([]);
  const [form, setForm] = useState({ mentorId: "", scheduledAt: "" });

  useEffect(() => {
    // Load accepted requests (mentors)
    api.get("/requests/sent").then((res) => {
      const accepted = res.data.filter((r) => r.status === "ACCEPTED");
      setAcceptedMentors(accepted);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sessions", form);
      alert("Session booked!");
      setForm({ mentorId: "", scheduledAt: "" });
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Book a Mentorship Session</h2>
      {acceptedMentors.length === 0 && <p>You have no accepted mentors yet.</p>}

      {acceptedMentors.length > 0 && (
        <form onSubmit={handleSubmit}>
          <label>Choose Mentor:</label>
          <select name="mentorId" value={form.mentorId} onChange={handleChange} required>
            <option value="">-- select --</option>
            {acceptedMentors.map((r) => (
              <option key={r._id} value={r.mentor._id}>
                {r.mentor.name || r.mentor.email}
              </option>
            ))}
          </select>

          <div>
            <label>Session Time (ISO):</label>
            <input
              name="scheduledAt"
              type="datetime-local"
              value={form.scheduledAt}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Book Session</button>
        </form>
      )}
    </div>
  );
};

export default SessionBooking;
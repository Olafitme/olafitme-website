import { useEffect, useState } from "react";
import api from "../api/axios";

const MentorRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests/received");
      setRequests(res.data);
    } catch (err) {
      alert("Failed to load requests");
    }
  };

  const respond = async (id, action) => {
    try {
      await api.put(`/requests/${id}`, { status: action });
      setRequests((prev) => prev.map(r => r._id === id ? { ...r, status: action } : r));
    } catch (err) {
      alert("Failed to update request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Incoming Mentorship Requests</h2>

      {requests.length === 0 && <p>No pending requests.</p>}

      {requests.map((r) => (
        <div key={r._id} style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem 0" }}>
          <h4>Mentee: {r.mentee.name || r.mentee.email}</h4>
          <p><strong>Goals:</strong> {r.mentee.goals}</p>
          <p><strong>Email:</strong> {r.mentee.email}</p>
          <p><strong>Status:</strong> {r.status}</p>

          {r.status === "PENDING" && (
            <>
              <button onClick={() => respond(r._id, "ACCEPTED")}>✅ Accept</button>
              <button onClick={() => respond(r._id, "REJECTED")} style={{ marginLeft: "1rem" }}>❌ Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MentorRequests;
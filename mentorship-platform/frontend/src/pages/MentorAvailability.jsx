import { useEffect, useState } from "react";
import api from "../api/axios";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MentorAvailability = () => {
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await api.get("/availability");
      setSlots(res.data);
    } catch (err) {
      alert("Failed to load availability");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/availability", form);
      setForm({ dayOfWeek: "", startTime: "", endTime: "" });
      fetchAvailability();
    } catch (err) {
      alert("Failed to save slot");
    }
  };

  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this availability slot?")) return;
    try {
      await api.delete(`/availability/${id}`);
      fetchAvailability();
    } catch (err) {
      alert("Failed to delete slot");
    }
  };

  return (
    <div>
      <h2>Set Your Availability</h2>

      <form onSubmit={handleSubmit}>
        <select name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} required>
          <option value="">-- Day --</option>
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Slot</button>
      </form>

      <h3>Current Availability</h3>
      {slots.length === 0 && <p>No availability set.</p>}
      {slots.map((slot) => (
        <div key={slot._id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "0.5rem" }}>
          <p>
            <strong>{slot.dayOfWeek}</strong>: {slot.startTime} – {slot.endTime}
          </p>
          <button onClick={() => deleteSlot(slot._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MentorAvailability;
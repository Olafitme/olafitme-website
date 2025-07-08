import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const skillsList = ["Marketing", "UI/UX", "Product", "Engineering", "Finance"];

const ProfileEdit = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: [],
    goals: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load current profile data
    api.get("/users/me").then((res) => {
      setForm({
        name: res.data.name || "",
        bio: res.data.bio || "",
        skills: res.data.skills || [],
        goals: res.data.goals || "",
      });
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSkill = (skill) => {
    const updated = form.skills.includes(skill)
      ? form.skills.filter((s) => s !== skill)
      : [...form.skills, skill];
    setForm({ ...form, skills: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me/profile", form);
      alert("Profile updated");
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Edit Profile ({user.role})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Bio:</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} />
        </div>

        <div>
          <label>Goals:</label>
          <input name="goals" value={form.goals} onChange={handleChange} />
        </div>

        <div>
          <label>Skills
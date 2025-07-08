const User = require("../models/User");

exports.listMentors = async (req, res) => {
  try {
    const { skill } = req.query;
    const filter = { role: "mentor" };
    if (skill) filter.skills = skill;
    const mentors = await User.find(filter).select("-password");
    res.json(mentors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
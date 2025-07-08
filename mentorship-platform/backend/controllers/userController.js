const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const updates = (({ name, bio, skills, goals }) => ({ name, bio, skills, goals }))(req.body);
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
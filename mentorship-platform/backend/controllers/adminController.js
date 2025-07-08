const User = require("../models/User");

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Update a user's role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "mentor", "mentee"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });
q
    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Session = require("../models/Session");

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("mentor", "name email")
      .populate("mentee", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

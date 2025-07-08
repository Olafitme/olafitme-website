const Availability = require("../models/Availability");

// Mentor sets availability slots
exports.setAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;

    const slot = await Availability.create({
      mentor: req.user.id,
      dayOfWeek,
      startTime,
      endTime,
    });

    res.status(201).json(slot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentor views their availability
exports.getAvailability = async (req, res) => {
  try {
    const slots = await Availability.find({ mentor: req.user.id });
    res.json(slots);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentor deletes a slot
exports.deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Availability.findById(id);
    if (!slot || slot.mentor.toString() !== req.user.id)
      return res.status(403).json({ error: "Access denied" });

    await Availability.findByIdAndDelete(id);
    res.json({ message: "Slot deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  startTime: { type: String, required: true }, // e.g., "15:00"
  endTime:   { type: String, required: true }, // e.g., "17:00"
}, { timestamps: true });

module.exports = mongoose.model("Availability", AvailabilitySchema);
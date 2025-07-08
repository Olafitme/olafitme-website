const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  feedback: {
    menteeRating: { type: Number, min: 1, max: 5 },
    menteeComment: String,
    mentorComment: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Session", SessionSchema);
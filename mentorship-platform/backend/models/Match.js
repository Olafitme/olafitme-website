const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
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
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Match", MatchSchema);
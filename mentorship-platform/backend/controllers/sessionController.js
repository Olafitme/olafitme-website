const Request = require("../models/Request");

// Mentee schedules session after acceptance
exports.createSession = async (req, res) => {
  try {
    const { mentorId, scheduledAt } = req.body;

    const request = await Request.findOne({
      mentee: req.user.id,
      mentor: mentorId,
      status: "ACCEPTED",
    });

    if (!request) return res.status(400).json({ error: "No accepted request found" });

    const session = await Session.create({
      mentor: mentorId,
      mentee: req.user.id,
      scheduledAt,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentor views all their sessions
exports.getMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user.id }).populate("mentee", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentee views all their sessions
exports.getMenteeSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentee: req.user.id }).populate("mentor", "name email");
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Submit feedback after session
exports.submitFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { menteeRating, menteeComment, mentorComment } = req.body;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    const isMentee = session.mentee.toString() === req.user.id;
    const isMentor = session.mentor.toString() === req.user.id;

    if (!isMentee && !isMentor) return res.status(403).json({ error: "Access denied" });

    if (isMentee) {
      session.feedback.menteeRating = menteeRating;
      session.feedback.menteeComment = menteeComment;
    }

    if (isMentor) {
      session.feedback.mentorComment = mentorComment;
    }

    await session.save();
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
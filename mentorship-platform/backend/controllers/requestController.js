const Request = require("../models/Request");

// Mentee sends mentorship request to mentor
exports.sendRequest = async (req, res) => {
  try {
    const { mentorId } = req.body;
    const existing = await Request.findOne({
      mentee: req.user.id,
      mentor: mentorId,
      status: "PENDING",
    });

    if (existing) return res.status(400).json({ error: "Request already sent" });

    const request = await Request.create({
      mentor: mentorId,
      mentee: req.user.id,
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentee views their sent requests
exports.viewSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mentee: req.user.id }).populate("mentor", "name email skills");
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentor views incoming requests
exports.viewReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mentor: req.user.id }).populate("mentee", "name email goals");
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mentor updates request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ error: "Request not found" });
    if (request.mentor.toString() !== req.user.id) return res.status(403).json({ error: "Access denied" });

    request.status = status;
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
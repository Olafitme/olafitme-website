const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createSession,
  getMentorSessions,
  getMenteeSessions,
  submitFeedback,
} = require("../controllers/sessionController");

router.post("/", auth(["mentee"]), createSession);
router.get("/mentor", auth(["mentor"]), getMentorSessions);
router.get("/mentee", auth(["mentee"]), getMenteeSessions);
router.put("/:id/feedback", auth(), submitFeedback);

module.exports = router;
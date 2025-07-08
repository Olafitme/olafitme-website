const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { listMentors } = require("../controllers/mentorController");

// GET /mentors (Mentee views mentors)
router.get("/", auth(["mentee"]), listMentors);

module.exports = router;
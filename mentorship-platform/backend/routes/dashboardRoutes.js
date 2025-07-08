const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth(), (req, res) => {
  res.json({ message: `Welcome to the ${req.user.role} dashboard` });
});

module.exports = router;
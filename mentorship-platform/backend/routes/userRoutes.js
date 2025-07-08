const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { updateProfile } = require("../controllers/userController");

// PUT /users/me/profile
router.put("/me/profile", auth(), updateProfile);

module.exports = router;
// /backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);      // POST /auth/register
router.post("/login", login);            // POST /auth/login
router.get("/me", authMiddleware(), getMe); // GET /auth/me

module.exports = router;
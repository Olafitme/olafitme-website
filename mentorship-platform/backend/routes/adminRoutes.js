const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getAllUsers, updateUserRole } = require("../controllers/adminController");

// GET /admin/users → view all users
router.get("/users", auth(["admin"]), getAllUsers);

// PUT /admin/users/:id/role → change role (e.g. promote/demote)
router.put("/users/:id/role", auth(["admin"]), updateUserRole);

// backend/routes/adminRoutes.js
router.get("/sessions", auth(["admin"]), getAllSessions);

const { getAllUsers, updateUserRole, deleteUser, getAllSessions } = require("../controllers/adminController");

module.exports = router;

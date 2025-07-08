const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  sendRequest,
  viewSentRequests,
  viewReceivedRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

router.post("/", auth(["mentee"]), sendRequest); // mentee → mentor
router.get("/sent", auth(["mentee"]), viewSentRequests);
router.get("/received", auth(["mentor"]), viewReceivedRequests);
router.put("/:id", auth(["mentor"]), updateRequestStatus);

module.exports = router;
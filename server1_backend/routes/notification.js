const express = require("express");
const { getNotifications } = require("../controller/notificationController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/notifications", isAuthenticatedUser, getNotifications);

module.exports = router;

const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("../controller/message.controller.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.get("/chat/:id/getMessages", isAuthenticatedUser, getMessages);
router.post("/chat/:id/sendMessages", isAuthenticatedUser, sendMessage);

module.exports = router;

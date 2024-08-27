const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { getUsersForSidebar } = require("../controller/user.controller.js");

const router = express.Router();

router.get("/chat/getSidebarUsers", isAuthenticatedUser, getUsersForSidebar);

module.exports = router;

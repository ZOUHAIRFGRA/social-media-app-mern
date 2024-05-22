const express = require("express");
const { newChat, getChats } = require("../controllers/chatCtrl");
const { isAuthenticated } = require("../middlewares/auth");

const router = express();

router.route("/newChat").post(isAuthenticated, newChat);
router.route("/chats").get(isAuthenticated, getChats);

module.exports = router;

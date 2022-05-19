const express = require("express");
const router = express.Router();

// const {upload} = require("../ImageConfig/MulterConfig")
const {
	ChatPost,
	getSingleChat,
	GetAllChat,
	DeleteChat,
} = require("../Controller/chatController");

router.post("/:chatId/chat", ChatPost);
router.get("/", GetAllChat);
router.get("/:id/chats/chat", getSingleChat);
router.delete("/:id/chats/user", DeleteChat);

module.exports = router;

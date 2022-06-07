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
router.get("/:id", getSingleChat);
router.delete("/:id", DeleteChat);

module.exports = router;

const express = require("express");
const router = express.Router();

// const {upload} = require("../ImageConfig/MulterConfig")
const {
	PostFriends,
	GetAllFriends,
	getSingleFriends,
	DeleteFriends,
} = require("../Controller/addChatController");

router.post("/:ddid/friend", PostFriends);
router.get("/friends/all", GetAllFriends);
router.get("/:id/friending", getSingleFriends);
// router.delete("/:id/chats/user", DeleteChat);

module.exports = router;

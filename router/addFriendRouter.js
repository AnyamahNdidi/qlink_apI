const express = require("express");
const router = express.Router();

// const {upload} = require("../ImageConfig/MulterConfig")
const {
PostFriends,
GetAllFriends,
getSingleFriends,
DeleteFriends
} = require("../Controller/addChatController");

router.post("/:ddid/friend", PostFriends);
router.get("/chat/friend",GetAllFriends );
router.get("/:id/friend/friends", getSingleFriends);
// router.delete("/:id/chats/user", DeleteChat);

module.exports = router;

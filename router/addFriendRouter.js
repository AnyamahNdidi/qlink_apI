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
router.get("/",GetAllFriends );
router.get("/:id", getSingleFriends);
// router.delete("/:id/chats/user", DeleteChat);

module.exports = router;

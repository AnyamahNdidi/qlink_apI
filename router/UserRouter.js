const express = require("express");
const router = express.Router();
const { upload } = require("../ImageConfig/MulterConfig");
const {
	RegisterClient,
	RegisterDeveloper,
	getAlll,
	getOne,
	EditProfile,
	LoginUser,
	EditImage,
	getOneConversation,
	getOnePayment
} = require("../Controller/UserController");

router.post("/developerReg", upload, RegisterDeveloper);
router.route("/clientReg", upload).post(RegisterClient);
router.route("/login").post(LoginUser);
router.get("/", getAlll);
router.get("/:id", getOne);
router.get("/conv/:id", getOneConversation);
router.get("/paye/:id", getOnePayment);
router.patch("/editprofile/:id", upload, EditProfile);
router.patch("/:id/edituserAvatar", upload, EditImage);

module.exports = router;

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
	getOnePayment,
	getDevToken,
	verifiedDeveloper,
	getClientToken,
} = require("../Controller/UserController");

//developer router registration
router.post("/developerReg", upload, RegisterDeveloper);
router.get("/dev/:id/:token", getDevToken);
router.post("/dev/:id/:token", verifiedDeveloper);

//client registration
router.route("/clientReg/reg", upload).post(RegisterClient);
router.route("/client/reg/:id/:token").get(getClientToken);

router.route("/login").post(LoginUser);
router.get("/", getAlll);
router.get("/:id", getOne);
router.get("/conv/:id", getOneConversation);
router.get("/paye/:id", getOnePayment);
router.patch("/editprofile/:id", upload, EditProfile);
router.patch("/:id/edituserAvatar", upload, EditImage);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
	postApplied,
	getApplyed,
	getApplyedSingle,
} = require("../Controller/applyController");

router.post("/:userId/apply", postApplied);
router.get("/apply", getApplyed);
router.get("/:id/apply", getApplyedSingle);

module.exports = router;

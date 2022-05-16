const express = require("express");
const router = express.Router();
const { imageman } = require("../ImageConfig/MulterConfig");
// const {upload} = require("../ImageConfig/MulterConfig")
const { postApplied, getApplyed } = require("../Controller/applyController");

router.post("/:userId/apply", imageman, postApplied);
router.post("/apply", getApplyed);

module.exports = router;

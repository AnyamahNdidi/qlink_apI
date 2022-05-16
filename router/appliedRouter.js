const express = require("express");
const router = express.Router();
const { image } = require("../ImageConfig/MulterConfig");
// const {upload} = require("../ImageConfig/MulterConfig")
const { postApplied, getApplyed } = require("../Controller/applyController");

router.post("/:id/apply", image, postApplied);
router.post("/apply", getApplyed);

module.exports = router;

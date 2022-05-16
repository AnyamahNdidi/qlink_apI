const express = require("express");
const router = express.Router();

const {
	paymentPost,
	getSinglePay,
	GetAllPay,
} = require("../Controller/payController");

router.post("/:id/paynow", paymentPost);
router.get("/paynow", GetAllPay);
router.post("/:id/paynow", getSinglePay);
module.exports = router;

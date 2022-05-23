const payData = require("../Model/PayModel");
const userData = require("../Model/UserModel");
const mongoose = require("mongoose")

const paymentPost = async (req, res) => {
	try {
		const userID = req.params.id;
		const payOwn = new payData(req.body);
		const userOwn = await userData.findById(userID);
		payOwn.userPay = userOwn;
		await payOwn.save();

		userOwn.payment.push(mongoose.Types.ObjectId(payOwn._id));
		await userOwn.save();
		res.status(201).json({
			data: payOwn,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const GetAllPay = async (req, res) => {
	try {
		const getData = await payData.find().populate("userPay");
		res.status(200).json(getData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getSinglePay = async (req, res) => {
	try {
		// const userID = req.params.id;

		const editing = await jobData.findById(req.params.id).populate("userPay");

		res.status(200).json({
			data: editing,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	paymentPost,
	GetAllPay,
	getSinglePay,
};

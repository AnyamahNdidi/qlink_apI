const jobData = require("../Model/JobModel");
const appyData = require("../Model/ApplyModel");
const cloudinary = require("../ImageConfig/CloudinaryConfig");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const userModel = require("../Model/UserModel");

const postApplied = async (req, res) => {
	try {
		const jobId = req.params.userId;

	

		const { name, email, userCv, applicationletter, userId } = req.body;

		

		const createUser = await appyData.create({
			name,
			email,
			userCv,
			applicationletter,
			userId
		});
		const dUser = await jobData.findById(jobId);
		createUser.userApply = dUser;
		await createUser.save();

		dUser.applied.push(mongoose.Types.ObjectId(createUser._id));
		await dUser.save();

		res.status(201).json({
			message: "product created",
			product: createUser,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getApplyed = async (req, res) => {
	try {
		const getData = await appyData.find();

		res.status(200).json(getData);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
const getApplyedSingle = async (req, res) => {
	try {
		const getData = await appyData.findById(req.params.id);

		res.status(200).json(getData);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	postApplied,
	getApplyed,
	getApplyedSingle,
};

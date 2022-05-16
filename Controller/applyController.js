const jobData = require("../Model/JobModel");
const appyData = require("../Model/ApplyModel");
const cloudinary = require("../ImageConfig/CloudinaryConfig");
const res = require("express/lib/response");
const postApplied = async (req, res) => {
	try {
		const jobId = req.params.userId;

		const { name, email, experience, location, phoneNumber } = req.body;

		const Image = await cloudinary.uploader.upload(req.file.path);

		const createUser = await appyData.create({
			name,
			email,
			experience,
			location,
			phoneNumber,
			image: Image.secure_url,
		});
		const dUser = await jobData.findById(jobId);
		createUser.userApply = dUser;
		await createUser.save();

		dUser.applied.push(createUser);
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

const getApplyed = async () => {
	try {
		const getData = await appyData.find();

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
};

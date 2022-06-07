const { response } = require("express");
const jobData = require("../Model/JobModel");
const userData = require("../Model/UserModel");
const mongoose = require("mongoose")

const PostJobs = async (req, res) => {
	try {
		const userID = req.params.id;
		const jobOwn = new jobData(req.body);
		const userOwn = await userData.findById(userID);
		jobOwn.user = userOwn;
		await jobOwn.save();

		userOwn.job.push(mongoose.Types.ObjectId(jobOwn._id));
		await userOwn.save();
		res.status(201).json({
			data: jobOwn,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const EditJob = async (req, res) => {
	try {
		const {
			email,
			jobTitle,
			jobType,
			salary,
			expreience,
			qualification,
			selectTime,
			location,
			description
		} = req.body;
		const userID = req.params.id;
		const jobOwn = await jobData.findById(req.params.id);
		const userOwn = await userData.findById(userID);
		console.log(userOwn);

		const editingData = await jobData.findByIdAndUpdate(
			req.params.id,
			{
				email,
				jobTitle,
				jobType,
				salary,
				expreience,
				qualification,
				selectTime,
				location,
				description
			},
			{ new: true },
		);

		res.status(200).json({
			data: editingData,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getSingleJob = async (req, res) => {
	try {
		const userID = req.params.id;
		const jobOwn = await jobData.findById(req.params.id);
		const userOwn = await userData.findById(userID);
		console.log(userOwn);
		const editing = await jobData.findById(req.params.id).populate("applied");

		res.status(200).json({
			data: editing,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const GetAllJobs = async (req, res) => {
	try {
		const { limit = 20 } = req.query;
		
		const getData = await jobData.find().populate("applied").limit(limit);
		res.status(200).json(getData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const DeleteJob = async (req, res) => {
	try {
		const userID = req.params.id;

		const userOwn = await userData.findById(userID);
		console.log(userOwn, userOwn);
		const removeJobs = await jobData.findByIdAndRemove(req.params.id);

		res.status(200).json({
			meassge: "delected successfully",
			data: removeJobs,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const queryData = async (req, res) => {
  
	const keyword = req.query.search ?
	{
		$or:[
			{jobTitle: {$regex:req.query.search, $options:"i"}},
			{skillSet: {$regex:req.query.search, $options:"i"}}
		]
	} : {}
	
	const jobUser = await jobData.find(keyword)
	res.status(200).send(jobUser)

}

module.exports = {
	PostJobs,
	EditJob,
	getSingleJob,
	GetAllJobs,
	DeleteJob,
	queryData
};

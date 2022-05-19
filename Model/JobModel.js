const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
	{
		jobTitle: {
			type: String,
		},
		contactemail: {
			type: String,
		},
		description: {
			type: String,
		},
		skillSet:{
			type: String,
		},
		budget: {
			type: String,
		},
		expreience: {
			type: String,
		},
		projectDuration: {
			type: String,
		},
		selectTime: {
			type: String,
		},
		location: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		applied: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "apply",
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("jobs", jobSchema);

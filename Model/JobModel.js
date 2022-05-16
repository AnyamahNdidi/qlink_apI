const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
	{
		jobTitle: {
			type: String,
		},
		email: {
			type: String,
		},
		jobType: {
			type: String,
		},
		salary: {
			type: String,
		},
		expreience: {
			type: String,
		},
		qualification: {
			type: String,
		},
		SelectTime: {
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

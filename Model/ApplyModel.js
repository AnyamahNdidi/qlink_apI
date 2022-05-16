const mongoose = require("mongoose");

const applySchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		image: {
			type: String,
		},
		expreience: {
			type: String,
		},
		location: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},

      

		userApply: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "jobs",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("apply", applySchema);

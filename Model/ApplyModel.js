const mongoose = require("mongoose");

const applySchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		userCv: {
			type: String,
		},
		userId: {
			type: String,
		},
		
		applicationletter : {
			type : String
		},
		userApply: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "jobs",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("apply", applySchema);

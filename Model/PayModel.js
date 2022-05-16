const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		userIDS: {
			type: String,
		},
		userPay: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("pay", userSchema);

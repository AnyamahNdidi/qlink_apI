const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		message: {
			type: String,
		},
		userChat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("chat", userSchema);

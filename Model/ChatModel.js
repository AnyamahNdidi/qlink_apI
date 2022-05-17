const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		message: {
			type: String,
		},
		sendTo: {
			type: String,
		},
		userChat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "addfriend",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("chat", userSchema);

const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		message: {
			type: String,
		},
		sendTo: {
			type: String,
		},
		sendingUser: {
			type: String,
		},
		userChat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "addfriends",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("chats", userSchema);

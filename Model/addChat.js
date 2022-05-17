const mongoose = require("mongoose");
const addSchema = mongoose.Schema(
	{
		userName: {
			type: String,
		},
		userImage: {
			type: String,
		},
		addedID: {
			type: String,
		},
	
		userFriend: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	 conversation : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "chat"
  }],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("addfriend", addSchema);

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
		password: {
			type: String,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
			//  default : "https://i.stack.imgur.com/l60Hf.png"
		},
		jobTitle: {
			type: String,
			default: "type a job title",
		},
		salary: {
			type: String,
			default: "enter your salary",
		},
		age: {
			type: String,
			default: "78",
		},
		cv: {
			type: String,
			default:
				"https://image.winudf.com/v2/image1/ZXUubm9jdmFwcC5ub2N2X2ljb25fMTYwMzM0MTU4Nl8wNzA/icon.png?w=&fakeurl=1",
		},
		experience: {
			type: String,
			default: "years of expreience",
		},
		phoneNumber: {
			type: String,
			default: "000000000000",
		},
		websiteUrl: {
			type: String,
			default: "www.mywebstiteurl.com",
		},
		description: {
			type: String,
			default: "write a bio about yourself",
		},
		verified: {
			type: Boolean,
		},
		gender: {
			type: String,
			default: "male",
		},
		location: {
			type: String,
			default: "lagos NG",
		},
		isDeveloper: {
			type: Boolean,
		},
	

		isAdmin: {
			type: Boolean,
		},
		job: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "jobs",
			},
		],
		payment: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "pay",
			},
		],

		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "addfriends",
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model("users", userSchema);

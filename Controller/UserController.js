const userData = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const { generateToken } = require("../ValidationFile/generateToken");
const {
	validateUsers,
	validateSignIn,
} = require("../ValidationFile/ValidateUser");
const cloudinary = require("../ImageConfig/CloudinaryConfig");
const path = require("path");

const default_url = "https://i.stack.imgur.com/l60Hf.png";

const verify = async (req, res, next) => {
	try {
		const authCheck = await req.headers.authorization;

		if (authCheck) {
			const token = await authCheck;

			jwt.verify(token, process.env.JWT_SECRETE, (error, payload) => {
				if (error) {
					res.status(400).json({ message: `error found ${error.message}` });
				} else {
					req.user = payload;
					next();
				}
			});
		} else {
			res.status(500).json({ message: "token needed" });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

//function for registration

const RegisterDeveloper = async (req, res) => {
	try {
		const { error } = validateUsers(req.body);
		if (error) {
			return res.status(409).json({
				status: "Failed to Validate user",
				message: error.details[0].message,
			});
		}
		const {
			name,
			email,
			avatar,
			jobTitle,
			salary,
			age,
			experience,
			phoneNumber,
			websiteUrl,
			description,
			gender,
			location,
			password,
		} = req.body;
		const checkEmail = await userData.findOne({ email: req.body.email });

		const Image = await cloudinary.uploader.upload(default_url);
		const salt = await bcrypt.genSalt(10);

		const hash = await bcrypt.hash(password, salt);

		if (checkEmail) {
			return res.status(401).json({ msg: "user already register" });
		}
		const CreateUser = await userData.create({
			name,
			email,
			avatar: Image.secure_url,
			avatarID: Image.public_id,
			jobTitle,
			salary,
			age,
			experience,
			phoneNumber,
			websiteUrl,
			description,
			gender,
			location,
			isDeveloper: true,
			isAdmin: false,
			password: hash,
		});
		res.status(200).json({
			msg: "user created",
			data: {
				CreateUser,
				token: generateToken({ _id: CreateUser._id, name: CreateUser.name }),
			},
		});
	} catch (err) {
		res.status(400).json({ msg: "error creating user", data: err.message });
	}
};
const RegisterClient = async (req, res) => {
	try {
		const { error } = validateUsers(req.body);
		if (error) {
			return res.status(409).json({
				status: "Failed to Validate user",
				message: error.details[0].message,
			});
		}

		const {
			name,
			email,
			avatar,
			jobTitle,
			salary,
			age,
			experience,
			phoneNumber,
			websiteUrl,
			description,
			gender,
			location,
			password,
		} = req.body;
		const checkEmail = await userData.findOne({ email: req.body.email });

		const Image = await cloudinary.uploader.upload(default_url);
		const salt = await bcrypt.genSalt(10);

		const hash = await bcrypt.hash(password, salt);

		if (checkEmail) {
			return res.status(401).json({ msg: "user already register" });
		}
		const CreateUser = await userData.create({
			name,
			email,
			avatar: Image.secure_url,
			avatarID: Image.public_id,
			jobTitle,
			salary,
			age,
			experience,
			phoneNumber,
			websiteUrl,
			description,
			gender,
			location,
			isDeveloper: false,
			isAdmin: false,
			password: hash,
		});
		res.status(200).json({
			msg: "user created",
			data: {
				CreateUser,
				token: generateToken({ _id: CreateUser._id, name: CreateUser.name }),
			},
		});
	} catch (err) {
		res.status(400).json({ msg: "error creating user", data: err.message });
	}
};

const LoginUser = async (req, res) => {
	try {
		const { error } = validateSignIn(req.body);
		if (error) {
			return res.status(409).json({
				status: "Can't sign In User",
				message: error.details[0].message,
			});
		}
		const { email, password } = req.body;

		const user = await userData.findOne({ email });
		if (user) {
			const checkPassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);
			if (checkPassword) {
				const { password, ...info } = user._doc;
				const token = generateToken({
					id: user._id,
					email: user.email,
					name: user.email,
				});

				res.status(200).json({
					message: `welcome back ${user.name}`,
					data: { ...info, token },
				});
			} else {
				res.status(400).json({ message: "password is incorrect" });
			}
		} else {
			res.status(400).json({ message: "Email doesnt exist" });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
	// const {email, password} = req.body
};

const getAlll = async (req, res) => {
	try {
		const data = await userData.find().populate("job").populate("friends").populate("payment");

		res.status(200).json({
			msg: "all data found successfully",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};

const getOne = async (req, res) => {
	try {
		const data = await userData.findById(req.params.id).populate("job").populate("friends").populate("payment")
		res.status(200).json({
			msg: "user profile found",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};

const getOneConversation = async (req, res) => {
	try {
		const data = await userData
			.findById(req.params.id)
			.populate("conversation");
		res.status(200).json({
			msg: "user profile found",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};

const getOnePayment = async (req, res) => {
	try {
		const data = await userData.findById(req.params.id).populate("payment");
		res.status(200).json({
			msg: "user profile found",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};

//the patch method to edit profile
const EditProfile = async (req, res) => {
	try {
		const {
			name,
			email,
			avatar,
			jobTitle,
			salary,
			age,
			experience,
			phoneNumber,
			websiteUrl,
			description,
			gender,
			location,
			password,
		} = req.body;

		// const checker = await userData.find()

		// if(checker){
		// await cloudinary.uploader.destroy(checker.avatar)

		// const Image = await cloudinary.uploader.upload(req.file.path)

		const EditData = await userData.findByIdAndUpdate(
			req.params.id,
			{
				name,
				email,
				// avatar : Image.secure_url,
				//  avatarID : Image.public_id,
				jobTitle,
				salary,
				age,
				experience,
				phoneNumber,
				websiteUrl,
				description,
				gender,
				location,
				password,
			},
			{ new: true },
		);
		return res.status(201).json({
			message: "successfull",
			data: EditData,
		});
		// }
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};
const EditImage = async (req, res) => {
	try {
		const checker = await userData.find();

		// if (checker) {
		// 	await cloudinary.uploader.destroy(checker.avatar);

		const Image = await cloudinary.uploader.upload(req.file.path);

		const EditData = await userData.findByIdAndUpdate(
			req.params.id,
			{
				avatar: Image.secure_url,
				avatarID: Image.public_id,
			},
			{ new: true },
		);
		return res.status(201).json({
			message: "successfull",
			data: EditData,
		});
		// }
	} catch (err) {
		res.status(500).json({
			msg: err.message,
		});
	}
};

module.exports = {
	RegisterClient,
	RegisterDeveloper,
	LoginUser,
	verify,
	getAlll,
	getOne,
	EditProfile,
	EditImage,
	getOneConversation,
	getOnePayment,
};

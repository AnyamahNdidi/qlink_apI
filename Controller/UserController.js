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
const crypto = require("crypto")
const nodemailer = require("nodemailer");
const binary = require("@hapi/joi/lib/types/binary");
const verifiedModel = require("../Model/verifiedModel");
const { param } = require("../router/UserRouter");
// const verifiedClientModel = require("../Model/verifiedClientModel")

const transport = nodemailer.createTransport({
		service:process.env.SERVICE,
		auth:{
			user:process.env.USER,
			pass:process.env.PASS
		}
})

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

		const testToken = crypto.randomBytes(4).toString("hex")
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
			verified:false,
			isDeveloper : false,
			developerToken:testToken,
			isAdmin: false,
			password: hash,
		});

		const createToken = crypto.randomBytes(32).toString("hex")
		
		const getIkoken = jwt.sign({createToken}, process.env.JWT_SECRETE, {expiresIn : "20m"})
		
		await verifiedModel.create({
			token:getIkoken,
			userId:CreateUser._id,
			_id:CreateUser._id
		})

		const mailOptions =  {
			from : "noreply@gmail.com",
			to:email,
			subject:"QUABATORS OTP VERIFICATION",
			html:`
			<h1>This is to verify your account please use click this <a 
			href="http://localhost:3001/api/user/dev/${CreateUser._id}/${getIkoken}"
			>link</a> </h1>
			<h3>c\Copy this REFRENCE CODE <span style="color:green">${testToken}</span>  and finish up your reg. <br/></h3>
			`
		}
		transport.sendMail(mailOptions, (err, info)=>{
			if(err){
				console.log(err.message)
			}else{
				console.log("mail sent", info.response)
			}
		})

		res.status(200).json({
			msg: "please Check your mail for code reference",
			data: {
				CreateUser,
			
				token: jwt.sign({ _id: CreateUser._id, isDeveloper: CreateUser.isDeveloper,verified: CreateUser.verified,},process.env.JWT_SECRETE,{ expiresIn: "2d" }
				)
			},
		});
	} catch (err) {
		res.status(400).json({ msg: "error creating user", data: err.message });
	}
};

const getDevToken = async (req, res) =>{

	try{
		const user  = await userData.findById(req.params.id);

		if(user){
			await userData.findByIdAndUpdate(
				req.params.id,
				{
					myToken :req.params.token
				},
				{new:true}
			)

			await verifiedModel.findByIdAndUpdate(
				user._id,
				{
					token:"",
					userId:user._id
				},
				{new:true}
			)

			res.status(200).json({
				message : "user has been authorized, you can now sign in"
			})

		}else{
			res.status(404).json({
				message :"user not authorized"
			})
		}

	}catch(error){
		res.status(404).json({
			message : error.message
		})
	}
}

const verifiedDeveloper = async (req, res) => {
	try {
		const { developerToken } = req.body;

		const user = await userData.findById(req.params.id);

		if (user) {
			if (developerToken === user.developerToken) {
				await userData.findByIdAndUpdate(
					user._id,
					{ verified: true, isDeveloper: true },
					{ new: true }
				);

				res.status(404).json({
					message: "Awesome you can now sign in",
				});
			} else {
				res.status(404).json({
					message: "no user fine with this details",
				});
			}
		} else {
			res.status(404).json({
				message: "no user",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
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
			verified:false,
			isDeveloper : false,
			isAdmin: false,
			password: hash,
		});

		const createToken = crypto.randomBytes(32).toString("hex")
		const testToken = crypto.randomBytes(32).toString("binary")
		const getIkoken = jwt.sign({createToken}, process.env.JWT_SECRETE, {expiresIn : "20m"})
		
		await verifiedModel.create({
			token:getIkoken,
			userId:CreateUser._id,
			_id:CreateUser._id
		})

		const  mailOptions = {
            from : "noreply@gmail.com",
            to:email,
            subject:"QUABATORS VERIFICATION",
            html:`
            <h3>this is to verify your account, pease use the 
            <a href="http://localhost:3000/api/user/client/reg/${CreateUser._id}/${getIkoken}">link</a>
            
            `
        }

		transport.sendMail(mailOptions, (err, info)=>{
			if(err){
				console.log(err.message)
			}else{
				console.log("mail sent", info.response)
			}
		})

		res.status(200).json({
			msg: "user created please check your mail and click the link to verify your account",
			data: {
				CreateUser,
				token: jwt.sign({ _id: CreateUser._id, isDeveloper: CreateUser.isDeveloper,verified: CreateUser.verified,},process.env.JWT_SECRETE,{ expiresIn: "2d" }
				),
			},
		});
	} catch (err) {
		res.status(400).json({ msg: "error creating user", data: err.message });
	}
};


const getClientToken = async (req, res)=>{
	try{

		const  users  = await userData.findById(req.params.id)

		if(users){
			await userData.findByIdAndUpdate(req.params.id,
				{
					isDeveloper: false,
					verified:true,
				},
				{new:true}
				)
			await verifiedModel.findByIdAndUpdate(req.params.id,
				{
					token:"",
					userId:users._id
				},
				{new:true}
				)
				res.status(200).json({
					message:"user has been authrorized you can now sign in"
				})


		}else{
			res.status(404).json({
				message:"user not verifield"
			})
		}

		

	}catch(error){
		res.status(400).json({
			message : error.message
		})
	}

}

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
				if(user.verified){
					const { password, ...info } = user._doc;
				const token = jwt.sign({ _id: CreateUser._id, isDeveloper: CreateUser.isDeveloper,verified: CreateUser.verified,},process.env.JWT_SECRETE,{ expiresIn: "2d" }
				)

				res.status(200).json({
					message: `welcome back ${user.name}`,
					data: { ...info, token },
				});


				}else{

		const createToken = crypto.randomBytes(32).toString("hex")
		// const testToken = crypto.randomBytes(32).toString("binary")
		const getIkoken = jwt.sign({createToken}, process.env.JWT_SECRETE, {expiresIn : "20m"})
		
	

		const  mailOptions = {
            from : "noreply@gmail.com",
            to:email,
            subject:"QUABATORS VERIFICATION",
            html:`
            <h3>this is to verify your account, pease use the 
            <a href="http://localhost:3000/api/user/client/reg/${CreateUser._id}/${getIkoken}">link</a>
            
            `
        }

		transport.sendMail(mailOptions, (err, info)=>{
			if(err){
				console.log(err.message)
			}else{
				console.log("mail sent", info.response)
			}
		})


				}


				
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

//  url test ?limit=2
const getAlll = async (req, res) => {
	try {
		const { limit = 20 } = req.query;
		const data = await userData.find().populate("job").populate("friends").populate("payment").limit(limit);

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
	getDevToken,
	getClientToken,
	verifiedDeveloper
};

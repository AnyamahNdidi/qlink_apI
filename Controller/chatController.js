const chatData = require("../Model/ChatModel");
const userData = require("../Model/addChat");

const ChatPost = async (req, res) => {
	try {
		const userID = req.params.chatId;
		const chatOwn = new chatData(req.body);
		const userOwn = await userData.findById(userID);
		chatOwn.userChat = userOwn;
		await chatOwn.save();

		userOwn.conversation.push(chatOwn);
		await userOwn.save();
		res.status(201).json({
			data: chatOwn,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const GetAllChat = async (req, res) => {
	try {
		const getData = await chatData.find();
		res.status(200).json(getData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getSingleChat = async (req, res) => {
	try {
		// const userID = req.params.id;

		const editing = await chatData.findById(req.params.id).populate("userChat");

		res.status(200).json({
			data: editing,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
const DeleteChat = async (req, res) => {
	try {
		// const userID = req.params.id;

		const delChat = await chatData.findByIdAndRemove(req.params.id);

		res.status(200).json({
			data: delChat,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	ChatPost,
	GetAllChat,
	getSingleChat,
	DeleteChat,
};

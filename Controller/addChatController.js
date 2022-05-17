const FriendsData = require("../Model/addChat");
const userData = require("../Model/UserModel");

const PostFriends = async (req, res) => {
	try {
		const userID = req.params.ddid;
		const chatOwn = new FriendsData(req.body);
		const userOwn = await userData.findById(userID);
		chatOwn.userFriend = userOwn;
		await chatOwn.save();

		userOwn.friends.push(chatOwn);
		await userOwn.save();
		res.status(201).json({
			data: chatOwn,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const GetAllFriends = async (req, res) => {
	try {
		const getData = await FriendsData.find().populate('conversation')
		res.status(200).json(getData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getSingleFriends = async (req, res) => {
	try {
		// const userID = req.params.id;

		const editing = await FriendsData.findById(req.params.id).populate("userFriend").populate('conversation')

		res.status(200).json({
			data: editing,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
const DeleteFriends = async (req, res) => {
	try {
		// const userID = req.params.id;

		const delChat = await FriendsData.findByIdAndRemove(req.params.id);

		res.status(200).json({
			data: delChat,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	PostFriends,
  getSingleFriends,
  GetAllFriends,
  DeleteFriends
};

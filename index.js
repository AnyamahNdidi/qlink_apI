require("dotenv").config();
// require("./dbConfig/db");
const express = require("express");
const cors = require("cors");
const http = require('http')
const mongoose = require("mongoose")

const url_online  = "mongodb+srv://gideon:NTp46J2P7Efieni@cluster0.7rupp.mongodb.net/QlinkDataDB?retryWrites=true&w=majority"


mongoose.connect(url_online).then(()=>{
    console.log('Database connected successfully...')
}).catch((error)=>{
    console.log(error)
})

const port = process.env.PORT || 6905;
const app = express();
const server = http.createServer(app)
const {Server} = require("socket.io");
// const { on } = require("./Model/UserModel");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log("connection has been established", socket.id);
});


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mongoose.connection;

db.on("open", ()=>{
	const dbConnect = db.collection("chats").watch()
	dbConnect.on("change", (change)=>{
		console.log(change)
		if(change.operationType === "insert"){

			const file = {
				_id:change.fullDocument._id,
				message: change.fullDocument.message,
				sendTo: change.fullDocument.sendTo,
				userChat: change.fullDocument.userChat,
			};
			io.emit("observer", file)

		}

	})
})

// app.use(express.json())
app.use("/api/user", require("./router/UserRouter"));
app.use("/", require("./router/chatRouter"));
app.use("/api/user", require("./router/addFriendRouter"));
app.use("/api/jobs", require("./router/jobRouter"));
app.use("/api/jobs", require("./router/appliedRouter"));
app.use("/api/pay", require("./router/payRouter"));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

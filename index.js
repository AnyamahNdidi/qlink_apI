require("dotenv").config();
require("./dbConfig/db");
const express = require("express");
const cors = require("cors");
const http = require('http')

const port = process.env.PORT || 6905;
const app = express();
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// app.use(express.json())
app.use("/api/user", require("./router/UserRouter"));
app.use("/api/user", require("./router/chatRouter"));
app.use("/api/user", require("./router/addFriendRouter"));
app.use("/api/jobs", require("./router/jobRouter"));
app.use("/api/jobs", require("./router/appliedRouter"));
app.use("/api/pay", require("./router/payRouter"));

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

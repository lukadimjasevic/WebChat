const { HOST, PORT } = require("./config/server.json");
const express = require("express");
const app = express();
const http = require("http");
const port = PORT;
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const { checkToken } = require("./socket/middlewares/checkToken");

app.use(cors({ origin: `http://${HOST}:5173`, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users", require("./api/routes/users"));
app.use("/groups", require("./api/routes/groups"));
app.use("/messages", require("./api/routes/messages"));

app.use(require("./api/middlewares/error").handleError);

const server = http.createServer(app);

server.listen(port, async() => {
	console.log("Server is running...");
	//await sequelize.sync({ force: true });
	await sequelize.authenticate();
	console.log("Database connected!");
});

const io = new Server(server, {
	cors: {
		origin: `http://${HOST}:5173`,
		methods: ["GET", "POST"],
	}
});

io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on("join_room", ({ groupId }) => {
		socket.join(groupId);
	});

	socket.on("receive_message", async(data) => {
		const { groupId, accessToken, message } = data;
		let auth;

		try { auth = await checkToken(accessToken); }
		catch { return; }

		if (auth.status !== "success") return;

		const createdAt = new Date();

		io.to(groupId).emit("receive_message", {
			message,
			username: auth.user.username,
			picture: auth.user.picture,
			createdAt
		});
	});
});
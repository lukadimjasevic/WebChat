const express = require("express");
const app = express();
const http = require("http");
const port = process.env.PORT || 3000;
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users", require("./api/routes/users"));
app.use("/groups", require("./api/routes/groups"));
app.use("/messages", require("./api/routes/messages"));

app.use(require("./api/middlewares/error").handleError);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	}
});

const messages = [
	{userId: 1, user: "Luka", color: "blue", message: "Bok"},
	{userId: 2, user: "Mirko", color: "orange", message: "Bok i tebi"}
];

io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.emit("receive_message", messages);

	socket.on("send_message", (data) => {
		messages.push(data);
		io.emit("receive_message", messages);
	});
});

server.listen(port, async() => {
	console.log("Server is running...");

	//await sequelize.sync({ force: true });
	await sequelize.authenticate();
	console.log("Database connected!");
});
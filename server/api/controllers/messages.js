const db = require("../../models");
const { QueryTypes } = require("sequelize");
const dbUtils = require("../database");
const error = require("../../errors");
const constants = require("../../utils/constants/data");


const checkMessage = (message, next) => {
	if (!message || message.length > constants.MESSAGE_MESSAGE_MAX) 
		return next(new error.HttpBadRequest(`The message must have between 1 and ${constants.MESSAGE_MESSAGE_MAX} characters`));
}


exports.createMessage = async(req, res, next) => {
	const { message } = req.body;
	const { groupId } = req.params;
	const { user } = res.locals;

	checkMessage(message, next);

	const userId = user.user_id;
	const newMessage = await dbUtils.createMessage(userId, groupId, message);

	return res.json({
		status: "ok",
		message: "Message successfully created",
		data: {
			message: newMessage.message,
		}
	});
}


exports.getMessages = async(req, res, next) => {
	const group_id = req.params.groupId;

	const messageAttributes = ["user_id", "group_id", "message", "createdAt"];
	const userAttributes = ["username", "picture"];

	const messages = await db.Message.findAll({
		where: {
			group_id
		},
		attributes: messageAttributes,
		include: [
			{ model: db.User, attributes: userAttributes }
		],
		order: [
			["createdAt", "ASC"]
		]
	});

	const formattedMessages = messages.map((message) => {
		const { User, ...rest } = message.toJSON(); // Destructure the fields
		return {
		  ...rest,
		  username: User.username, // Add the 'username' field from the 'User' model
		  picture: User.picture
		};
	});

	return res.json({
		status: "ok",
		message: "Successfully fetched all messages for the requested group",
		data: formattedMessages
	});
}
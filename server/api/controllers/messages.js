const dbUtils = require("../database");
const error = require("../../errors");
const constants = require("../../utils/constants/data");


const checkMessage = (message, next) => {
	if (!message || message.length > constants.MESSAGE_MESSAGE_MAX) 
		return next(new error.HttpBadRequest(`The message must have between 1 and ${constants.MESSAGE_MESSAGE_MAX} characters`));
}


exports.createMessage = async(req, res, next) => {
	const { message, groupCode } = req.body;
	const user = res.locals.user;

	// Provjeriti da li korisnik pripada toj grupi

	checkMessage(message, next);

	const userId = user.user_id;
	const groupId = (await dbUtils.getGroup(groupCode)).group_id;
	const newMessage = await dbUtils.createMessage(userId, groupId, message);

	return res.json({
		status: "ok",
		message: "Message successfully created",
		newMessage: {
			message: newMessage.message,
		}
	});
}
const dbUtils = require("../database");
const error = require("../../errors");


exports.createMessage = async(req, res, next) => {
	const { message, groupCode } = req.body;
	const token = res.locals.token;

	// Provjeriti da li korisnik pripada toj grupi

	if (!message || message.length > 255) return next(new error.HttpBadRequest("The message must have between 1 and 255 characters"));

	const userId = (await dbUtils.getUser(token)).user_id;
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
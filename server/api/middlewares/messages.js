const db = require("../../models");
const error = require("../../errors");
const constants = require("../../utils/constants/data");


/* Middleware for checking if the user is in the requested group */
exports.checkUserGroup = async(req, res, next) => {
	const group_id = req.params.groupId;
	const { user: { user_id } } = res.locals;

	const isUserInGroup = await db.user_group_rel.findOne({
		where: {
			group_id,
			user_id
		}
	});

	if (!isUserInGroup) {
		next(new error.HttpNotFound("The user is not a member of the requested group"));
	}

	next();
}


/* Middleware for checking if the message meets the requirements */
exports.checkMessage = (req, res, next) => {
	const { message } = req.body;

	if (!message || message.length > constants.MESSAGE_MESSAGE_MAX) 
		return next(new error.HttpBadRequest(`The message must have between 1 and ${constants.MESSAGE_MESSAGE_MAX} characters`));

	res.locals.message = message;
	next();
}
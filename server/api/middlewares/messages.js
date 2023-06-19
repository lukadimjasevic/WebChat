const error = require("../../errors");
const constants = require("../../utils/constants/data");


/* Middleware for checking if the message meets the requirements */
exports.checkMessage = (req, res, next) => {
	const { message } = req.body;

	if (!message || message.length > constants.MESSAGE_MESSAGE_MAX) 
		return next(new error.HttpBadRequest(`The message must have between 1 and ${constants.MESSAGE_MESSAGE_MAX} characters`));

	res.locals.message = message;
	next();
}
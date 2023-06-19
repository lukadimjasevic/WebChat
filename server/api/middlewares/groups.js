const error = require("../../errors");
const constants = require("../../utils/constants/data");


/* Middleware for checking if the name meets the requirements */
exports.checkName = (req, res, next) => {
	const { name } = req.body;

	if (!name || name.length > constants.GROUP_NAME_MAX) 
		return next(new error.HttpBadRequest(`The group name must have between 1 and ${constants.GROUP_NAME_MAX} characters`));

	res.locals.name = name;
	next();
}
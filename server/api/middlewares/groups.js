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


/* Middleware for checking if the name meets the requirements */
exports.checkName = (req, res, next) => {
	const { name } = req.body;

	if (!name || name.length > constants.GROUP_NAME_MAX) 
		return next(new error.HttpBadRequest(`The group name must have between 1 and ${constants.GROUP_NAME_MAX} characters`));

	res.locals.name = name;
	next();
}
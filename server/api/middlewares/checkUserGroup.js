const db = require("../../models");
const error = require("../../errors");


/* Middleware for checking if a user is in the requested group */


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
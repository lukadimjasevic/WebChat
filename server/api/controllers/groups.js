const db = require("../../models");
const dbUtils = require("../database");
const { QueryTypes } = require("sequelize");
const error = require("../../errors");


exports.createGroup = async(req, res, next) => {
	const { name } = req.body;
	const token = res.locals.token;

	if (!name || name.length > 24) 
		return next(new error.HttpBadRequest("The group name must have between 1 and 24 characters"));

	const adminId = (await dbUtils.getUser(token)).user_id;
	const group = await dbUtils.createGroup(name, adminId);
	await dbUtils.addUserToGroup(adminId, group.group_id);

	return res.json({
		status: "ok",
		message: "Group successfully created",
	});
}


exports.joinGroup = async(req, res, next) => {
	const { groupCode } = req.body;
	const token = res.locals.token;

	const userId = (await dbUtils.getUser(token)).user_id;
	const group = await dbUtils.getGroup(groupCode);

	if (!group) 
		return next(new error.HttpNotFound("The requested group doesn't exists"));

	const isUserJoined = await db.user_group_rel.findOne({ where: { user_id: userId }});
	if (isUserJoined) 
		return next(new error.HttpConflict("The user is already joined to the requested group"));

	await dbUtils.addUserToGroup(userId, group.group_id);

	return res.json({
		status: "ok",
		message: "Successfully joined the requested group",
	});
}


exports.getGroupUsers = async(req, res) => {
	const { groupCode } = req.params;
	
	const users = await db.sequelize.query(
		`SELECT users.username FROM users
		INNER JOIN user_group_rel ON users.user_id = user_group_rel.user_id
		INNER JOIN groups ON groups.group_id = user_group_rel.group_id
		WHERE groups.group_code = ?;`,
		{
			replacements: [groupCode],
			type: QueryTypes.SELECT,
		}
	);

	return res.json({
		status: "ok",
		message: "Successfully fetched all users for the requested group",
		users: users,
	});
}
const db = require("../../models");
const dbUtils = require("../database");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const error = require("../../errors");
const constants = require("../../utils/constants/data");


const checkName = (name, next) => {
	if (!name || name.length > constants.GROUP_NAME_MAX) 
		return next(new error.HttpBadRequest(`The group name must have between 1 and ${constants.GROUP_NAME_MAX} characters`));
}


exports.createGroup = async(req, res, next) => {
	const { name } = req.body;
	const user = res.locals.user;

	checkName(name, next);

	const adminId = user.user_id;
	const group = await dbUtils.createGroup(name, adminId);
	await dbUtils.addUserToGroup(adminId, group.group_id);

	return res.json({
		status: "success",
		message: "Group successfully created",
	});
}


exports.joinGroup = async(req, res, next) => {
	const { groupCode } = req.body;
	const user = res.locals.user;

	const userId = user.user_id;
	const group = await dbUtils.getGroup(groupCode);

	if (!group) 
		return next(new error.HttpNotFound("The requested group doesn't exists"));

	const isUserJoined = await db.user_group_rel.findOne({ 
		where: { 
			[Op.and]: [
				{ user_id: userId },
				{ group_id: group.group_id } 
			]
		}
	});

	if (isUserJoined) 
		return next(new error.HttpConflict("The user is already joined to the requested group"));

	await dbUtils.addUserToGroup(userId, group.group_id);

	return res.json({
		status: "success",
		message: "Successfully joined the requested group",
	});
}


exports.getUserGroups = async(req, res, next) => {
	const { user } = res.locals;

	const groups = await db.sequelize.query(
		`SELECT groups.group_id, groups.name, groups.group_code FROM groups
		INNER JOIN user_group_rel ON groups.group_id = user_group_rel.group_id
		WHERE user_group_rel.user_id = ?`,
		{
			replacements: [user.user_id],
			type: QueryTypes.SELECT,
		}
	);

	return res.json({
		status: "success",
		message: "Successfully fetched all groups for current user",
		groups: groups,
	});
}


exports.getGroup = async(req, res, next) => {
	const { user } = res.locals;
	const { groupId } = req.params;

	const isUserInGroup = await db.user_group_rel.findOne({
		where: {
			[Op.and]: [
				{ user_id: user.user_id },
				{ group_id: groupId },
			]
		}
	});

	if (!isUserInGroup) {
		return next(new error.HttpNotFound("Cannot find the user for the requested group"));
	}

	const groupAttributes = ["group_id", "group_code", "name"];
	const adminAttributes = ["user_id", "username", "email"];

	const group = await db.Group.findOne({
		where		: { group_id: groupId },
		attributes	: groupAttributes,
		include		: [{ model: db.User, attributes: adminAttributes, as: "admin" }]
	});

	return res.json({
		status: "success",
		message: "Successfully fetched requested group",
		group: group,
	});
}
const db = require("../../models");
const dbUtils = require("../database");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const error = require("../../errors");


exports.createGroup = async(req, res, next) => {
	const { user, name } = res.locals;

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
	const { groupId } = req.params;

	const groupAttributes = ["group_id", "group_code", "name"];
	const adminAttributes = ["user_id", "username", "email"];

	const group = await db.Group.findOne({
		where		: { group_id: groupId },
		attributes	: groupAttributes,
		include		: [{ model: db.User, attributes: adminAttributes, as: "admin" }]
	});

	const groupMembers = await db.user_group_rel.findAll({
		where		: { group_id: groupId },
		include		: [{ model: db.User, attributes: adminAttributes }]
	});

	const formattedMembers = groupMembers.map(({ User: { user_id, username, email } }) => {
		return { user_id, username, email }
	});

	group.dataValues.members = formattedMembers;
	
	return res.json({
		status: "success",
		message: "Successfully fetched requested group",
		group: group
	});
}


exports.deleteUserFromGroup = async(req, res, next) => {
	const { groupId } = req.params
	const { user } = res.locals;

	// Find the total number of group members
	const memberCount = await db.user_group_rel.count({
		where: {
			group_id: groupId 
		},
	});

	// Deleting the relationship between the user and the group
	await db.user_group_rel.destroy({
		where: {
			group_id: groupId, 
			user_id: user.user_id
		}
	});

	if (memberCount === 1) {
		// Delete the group and group messages

		// Delete all messages
		await db.Message.destroy({
			where: {
				group_id: groupId
			}
		});

		// Delete the group
		await db.Group.destroy({
			where: {
				group_id: groupId
			}
		});
	} else {
		// Delete the member from the group if the member isn't the admin
		// If the member is the admin, then pass the admin role to the next older member

		// Check if the user is the admin of the group
		const isAdmin = await db.Group.findOne({
			where: { 
				group_id: groupId, 
				admin_id: user.user_id 
			}
		});

		if (isAdmin) {
			// Find next admin
			const nextAdmin = await db.user_group_rel.findAll({
				where		: { group_id: groupId },
				attributes  : ["user_id"],
				limit		: 1,
				order		: [
					["createdAt", "ASC"]
				]
			});

			// Set new admin
			await db.Group.update(
				{ admin_id: nextAdmin[0].user_id }, 
				{ where: {
					group_id: groupId
				}}
			);
		}
	}

	return res.json({
		status: "success",
		message: "You are successfully exited from the group",
	});
}
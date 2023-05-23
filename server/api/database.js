const db = require("../models");
const { groupCode } =  require("./generateString");


exports.createUser = async(username, password, email, token, token_created) => {
	return await db.User.create({ username, password, email, token, token_created });
}


exports.getUser = async(token) => {
	return await db.User.findOne({ where: { token }});
}


exports.updateUserToken = async(email, token=null, token_created=null) => {
	return (await db.User.findOne({ where: { email }})).update({ token, token_created });
}


exports.createGroup = async(name, admin_id) => {
	return await db.Group.create({ group_code: groupCode(), name, admin_id });
}


exports.getGroup = async(group_code) => {
	return await db.Group.findOne({ where: { group_code }});
}


exports.addUserToGroup = async(user_id, group_id) => {
	return await db.user_group_rel.create({ user_id, group_id });
}


exports.createMessage = async(user_id, group_id, message) => {
	return await db.Message.create({ user_id, group_id, message });
}
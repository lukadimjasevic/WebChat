const dbUtils = require("../../api/database");
const error = require("../../errors");


exports.checkToken = async(accessToken) => {
	if (!accessToken) {
		return new error.HttpUnauthorized("Authorization failed");
	}

	const user = await dbUtils.getUser(accessToken);
	
	if (!user) 
		return new error.HttpUnauthorized("Authorization failed");


	return {
		status: "success",
		user: user,
	}
}
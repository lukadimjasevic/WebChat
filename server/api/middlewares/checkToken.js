const db = require("../../models");
const dbUtils = require("../database");
const error = require("../../errors");


exports.checkToken = async(req, res, next) => {

	const accessToken = req.cookies.access_token;

	if (!accessToken) {
		return next(new error.HttpUnauthorized("Authorization failed"));
	}

	const user = await dbUtils.getUser(accessToken);
	
	if (!user) 
		return next(new error.HttpUnauthorized("Authorization failed"));

	res.locals.token = accessToken;
	res.locals.user = user;
	next();
}
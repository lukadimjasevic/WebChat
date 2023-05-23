const { createToken } = require("../generateString");
const db = require("../../models");
const dbUtils = require("../database");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const error = require("../../errors");

const cookieExpires = 7 * 24 * 3600000; // 7 days


exports.register = async(req, res, next) => {
	const { username, password, email } = req.body;

	if (!username || username.length < 3 || username.length > 24) 
		return next(new error.HttpBadRequest("The username must have between 3 and 24 characters"));
	
	if (!password || password.length < 3 || password.length > 16) 
		return next(new error.HttpBadRequest("The password must have between 3 and 16 characters"));

	if (!email || email.length < 3 || email.length > 320) 
		return next(new error.HttpBadRequest("The email must have between 3 and 320 characters"));

	const checkUser = await db.User.findOne(
		{ where: { 
			[Op.or]: [ 
				{ email },
				{ username }
			]
		}
	});
	
	// Check if email or username exists
	if (checkUser) 
		return next(new error.HttpConflict("Username or email already exists"));

	const saltRounds = 10;
	const token = createToken();
	const tokenCreated = new Date();
	
	bcrypt.hash(password, saltRounds, async(err, hash) => {
		if (err) throw err;

		const user = await dbUtils.createUser(username, hash, email, token, tokenCreated);

		res.cookie("access_token", token, {
			expires: new Date(Date.now() + cookieExpires)
		});

		return res.json({
			status: "ok",
			message: "Account successfully created",
			user: {
				username: user.username,
				email: user.email,
			}
		});
	});
}


exports.login = async(req, res, next) => {
	const { email, password } = req.body;

	if (!password || password.length < 3 || password.length > 16) 
		return next(new error.HttpBadRequest("The password must have between 3 and 16 characters"));

	if (!email || email.length < 3 || email.length > 320) 
		return next(new error.HttpBadRequest("The email must have between 3 and 320 characters"));

	const user = await db.User.findOne({ where: { email }});

	if (!user)
		return next(new error.HttpNotFound("Wrong email"));

	bcrypt.compare(password, user.password, async(err, result) => {
		if (err) throw err;

		if (!result) 
			return next(new error.HttpUnauthorized("Wrong password"));
			
		if (user.token !== null) {
			const tokenCreated = new Date(user.token_created);
			const tokenExpires = new Date(tokenCreated.getTime() + cookieExpires);
			
			if (tokenExpires < Date.now()) {
				// Expired
				await dbUtils.updateUserToken(user.email);
			} else {
				// Not expired
				return res.json({
					status: "ok",
					message: "Successfully logged in",
				});
			}
		}
		const token = createToken();
		const tokenCreated = new Date();

		await dbUtils.updateUserToken(user.email, token, tokenCreated);

		res.cookie("access_token", token, {
			expires: new Date(Date.now() + cookieExpires)
		});

		return res.json({
			status: "ok",
			message: "Successfully logged in",
		});
	});
}


exports.logout = async(req, res, next) => {
	const token = res.locals.token;

	const user = await dbUtils.getUser(token);
	user.update({ token: null, token_created: null });

	res.clearCookie("access_token");

	return res.json({
		status: "ok",
		message: "Successfully logged out",
	})
}
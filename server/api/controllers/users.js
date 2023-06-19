const { createToken } = require("../generateString");
const db = require("../../models");
const dbUtils = require("../database");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const error = require("../../errors");
const fs = require("fs");
const { COOKIE_EXPIRE_TIME, COOKIE_DOMAIN } = require("../../utils/constants/cookie");


exports.register = async(req, res, next) => {
	const { username, password, email } = res.locals;

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
			expires: new Date(Date.now() + COOKIE_EXPIRE_TIME),
			domain: COOKIE_DOMAIN,
			sameSite: "None"
		});

		return res.json({
			status: "success",
			message: "Account successfully created",
			user: {
				username: user.username,
				email: user.email,
			}
		});
	});
}


exports.login = async(req, res, next) => {
	const { email, password } = res.locals;

	const user = await db.User.findOne({ where: { email }});

	if (!user)
		return next(new error.HttpNotFound("Wrong email or password"));

	bcrypt.compare(password, user.password, async(err, result) => {
		if (err) throw err;

		if (!result) 
			return next(new error.HttpUnauthorized("Wrong email or password"));
			
		if (user.token !== null) {
			const tokenCreated = new Date(user.token_created);
			const tokenExpires = new Date(tokenCreated.getTime() + COOKIE_EXPIRE_TIME);
			
			if (tokenExpires > Date.now()) {
				// Not Expired
				
				res.cookie("access_token", user.token, {
					expires: new Date(Date.now() + COOKIE_EXPIRE_TIME),
					domain: COOKIE_DOMAIN,
					sameSite: "None"
				});

				return res.json({
					status: "success",
					message: "Successfully logged in",
				});
			}
		}
		const token = createToken();
		const tokenCreated = new Date();

		await dbUtils.updateUserToken(user.email, token, tokenCreated);

		res.cookie("access_token", token, {
			expires: new Date(Date.now() + COOKIE_EXPIRE_TIME),
			domain: COOKIE_DOMAIN,
			sameSite: "None"
		});

		return res.json({
			status: "success",
			message: "Successfully logged in",
		});
	});
}


exports.logout = async(req, res, next) => {
	const { user } = res.locals;

	user.update({ token: null, token_created: null });

	res.clearCookie("access_token");

	return res.json({
		status: "success",
		message: "Successfully logged out",
	});
}


exports.getUser = async(req, res, next) => {
	const { username, email, name, bio, picture } = res.locals.user;

	const userData = { username, email, name, bio, picture };

	return res.json({
		status: "success",
		message: "Successfully fetched user data",
		data: userData,
	});
}


exports.updateUserProfile = async(req, res, next) => {
	const { user, name, bio } = res.locals;

	if (req.file) {
		fs.readFile(req.file.path, (err, data) => {
			if (err) {
				console.error(err);
				return next(new error.InternalServerError("An error has occurred while trying to read the profile picture"));
			}
			
			const base64String = data.toString("base64");
			user.update({ picture: base64String });
		});
	}

	user.update({ name, bio });
	
	return res.json({
		status: "success",
		message: "Successfully updated profile settings",
	});
}


exports.updateUserAccount = async(req, res, next) => {
	const { user, username } = res.locals;
	
	const checkUser = await db.User.findOne({ where: { username }});

	if (checkUser) 
		return next(new error.HttpConflict("The username is already taken"));

	user.update({ username });

	return res.json({
		status: "success",
		message: "Successfully updated account settings",
		data: { username }
	});
}
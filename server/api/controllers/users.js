const { HOST } = require("../../config/server.json");
const { createToken } = require("../generateString");
const db = require("../../models");
const dbUtils = require("../database");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const error = require("../../errors");
const fs = require("fs");
const constants = require("../../utils/constants/data");

const cookieExpires = 7 * 24 * 3600000; // 7 days


const checkUsername = (username, next) => {
	if (!username || username.length < constants.USER_USERNAME_MIN || username.length > constants.USER_USERNAME_MAX) 
		return next(new error.HttpBadRequest(`The username must have between ${constants.USER_USERNAME_MIN} and ${constants.USER_USERNAME_MAX} characters`));
}

const checkPassword = (password, next) => {
	if (!password || password.length < constants.USER_PASSWORD_MIN || password.length > constants.USER_PASSWORD_MAX) 
		return next(new error.HttpBadRequest(`The password must have between ${constants.USER_PASSWORD_MIN} and ${constants.USER_PASSWORD_MAX} characters`));
}

const checkEmail = (email, next) => {
	if (!email || email.length < constants.USER_EMAIL_MIN || email.length > constants.USER_EMAIL_MAX) 
		return next(new error.HttpBadRequest(`The email must have between ${constants.USER_EMAIL_MIN} and ${constants.USER_EMAIL_MAX} characters`));
}

const checkName = (name, next) => {
	if (name.length > constants.USER_NAME_MAX) 
		return next(new error.HttpBadRequest(`The name can have a maximum of ${constants.USER_NAME_MAX} characters`));
}

const checkBio = (bio, next) => {
	if (bio.length > constants.USER_BIO_MAX)
		return next(new error.HttpBadRequest(`The bio can have a maximum of ${constants.USER_BIO_MAX} characters`));
}


exports.register = async(req, res, next) => {
	const { username, password, email } = req.body;

	checkUsername(username, next);
	checkPassword(password, next);
	checkEmail(email, next);

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
			expires: new Date(Date.now() + cookieExpires),
			domain: HOST,
			sameSite: "None"
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

	checkPassword(password, next);
	checkEmail(email, next);

	const user = await db.User.findOne({ where: { email }});

	if (!user)
		return next(new error.HttpNotFound("Wrong email or password"));

	bcrypt.compare(password, user.password, async(err, result) => {
		if (err) throw err;

		if (!result) 
			return next(new error.HttpUnauthorized("Wrong email or password"));
			
		if (user.token !== null) {
			const tokenCreated = new Date(user.token_created);
			const tokenExpires = new Date(tokenCreated.getTime() + cookieExpires);
			
			if (tokenExpires > Date.now()) {
				// Not Expired
				
				res.cookie("access_token", user.token, {
					expires: new Date(Date.now() + cookieExpires),
					domain: HOST,
					sameSite: "None"
				});

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
			expires: new Date(Date.now() + cookieExpires),
			domain: HOST,
			sameSite: "None"
		});

		return res.json({
			status: "ok",
			message: "Successfully logged in",
		});
	});
}


exports.logout = async(req, res, next) => {
	const { user } = res.locals;

	user.update({ token: null, token_created: null });

	res.clearCookie("access_token");

	return res.json({
		status: "ok",
		message: "Successfully logged out",
	});
}


exports.getUser = async(req, res, next) => {
	const { username, email, name, bio, picture } = res.locals.user;

	const userData = { username, email, name, bio, picture };

	return res.json({
		status: "ok",
		message: "Successfully fetched user data",
		data: userData,
	});
}


exports.updateUserProfile = async(req, res, next) => {
	const { user } = res.locals;
	const { name, bio } = req.body;

	checkName(name, next);
	checkBio(bio, next);

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
		status: "ok",
		message: "Successfully updated profile settings",
	});
}


exports.updateUserAccount = async(req, res, next) => {
	const { user } = res.locals;
	const { username } = req.body;

	checkUsername(username, next);

	const checkUser = await db.User.findOne({ where: { username }});

	if (checkUser) 
		return next(new error.HttpConflict("The username is already taken"));

	user.update({ username });

	return res.json({
		status: "ok",
		message: "Successfully updated account settings",
		data: { username }
	});
}
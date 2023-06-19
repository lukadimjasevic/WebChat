const error = require("../../errors");
const constants = require("../../utils/constants/data");


/* Middleware for checking if the username meets the requirements */
exports.checkUsername = (req, res, next) => {
	const { username } = req.body;

	if (!username || username.length < constants.USER_USERNAME_MIN || username.length > constants.USER_USERNAME_MAX) 
		return next(new error.HttpBadRequest(`The username must have between ${constants.USER_USERNAME_MIN} and ${constants.USER_USERNAME_MAX} characters`));

	res.locals.username = username;
	next();
}


/* Middleware for checking if the password meets the requirements */
exports.checkPassword = (req, res, next) => {
	const { password } = req.body;

	if (!password || password.length < constants.USER_PASSWORD_MIN || password.length > constants.USER_PASSWORD_MAX) 
		return next(new error.HttpBadRequest(`The password must have between ${constants.USER_PASSWORD_MIN} and ${constants.USER_PASSWORD_MAX} characters`));

	res.locals.password = password;
	next();
}


/* Middleware for checking if the email meets the requirements */
exports.checkEmail = (req, res, next) => {
	const { email } = req.body;

	if (!email || email.length < constants.USER_EMAIL_MIN || email.length > constants.USER_EMAIL_MAX) 
		return next(new error.HttpBadRequest(`The email must have between ${constants.USER_EMAIL_MIN} and ${constants.USER_EMAIL_MAX} characters`));

	res.locals.email = email;
	next();
}


/* Middleware for checking if the name meets the requirements */
exports.checkName = (req, res, next) => {
	const { name } = req.body;

	if (name.length > constants.USER_NAME_MAX) 
		return next(new error.HttpBadRequest(`The name can have a maximum of ${constants.USER_NAME_MAX} characters`));

	res.locals.name = name;
	next();
}


/* Middleware for checking if the bio meets the requirements */
exports.checkBio = (req, res, next) => {
	const { bio } = req.body;

	if (bio.length > constants.USER_BIO_MAX)
		return next(new error.HttpBadRequest(`The bio can have a maximum of ${constants.USER_BIO_MAX} characters`));

	res.locals.bio = bio;
	next();
}
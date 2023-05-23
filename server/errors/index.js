const statusCodes = require("./statusCodes");


class HttpBadRequest {

	constructor (message) {
		this.status = "error";
		this.error = "BadRequest";
		this.statusCode = statusCodes.BAD_REQUEST;
		this.message = message;
	}
}


class HttpUnauthorized {

	constructor (message) {
		this.status = "error";
		this.error = "Unauthorized";
		this.statusCode = statusCodes.UNAUTHORIZED;
		this.message = message;
	}
}


class HttpNotFound {

	constructor (message) {
		this.status = "error";
		this.error = "NotFound";
		this.statusCode = statusCodes.NOT_FOUND;
		this.message = message;
	}
}


class HttpConflict {

	constructor (message) {
		this.status = "error";
		this.error = "Conflict";
		this.statusCode = statusCodes.CONFLICT;
		this.message = message;
	}
}


class InternalServerError {

	constructor () {
		this.status = "error";
		this.error = "InternalServerError";
		this.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
		this.message = "Something went wrong";
	}
}


module.exports = {
	HttpBadRequest,
	HttpUnauthorized,
	HttpNotFound,
	HttpConflict,
	InternalServerError
}
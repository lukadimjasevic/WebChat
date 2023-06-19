const { HOST } = require("../../config/server.json");

/* Constants for cookie data */

module.exports = {
	COOKIE_EXPIRE_TIME: 7 * 24 * 3600000, // 7 days
	COOKIE_DOMAIN: HOST,
}
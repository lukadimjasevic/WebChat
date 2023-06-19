const { MULTER_DEST } = require("../config/server.json");
const multer = require("multer");

const upload = multer({ dest: MULTER_DEST });

module.exports = { upload };
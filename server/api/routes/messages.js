const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages");
const { checkToken } = require("../middlewares/checkToken");
const { use } = require("../middlewares/use");

router.post("/", use(checkToken), use(messagesController.createMessage));

module.exports = router;
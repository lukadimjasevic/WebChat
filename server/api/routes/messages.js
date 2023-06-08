const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages");
const { checkToken } = require("../middlewares/checkToken");
const { checkUserGroup } = require("../middlewares/checkUserGroup");
const { use } = require("../middlewares/use");

router.post("/:groupId", use(checkToken), use(checkUserGroup), use(messagesController.createMessage));

router.get("/:groupId", use(checkToken), use(checkUserGroup), use(messagesController.getMessages));

module.exports = router;
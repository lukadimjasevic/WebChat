const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages");
const { use } = require("../middlewares/use");
const { checkToken } = require("../middlewares/checkToken");
const { checkMessage } = require("../middlewares/messages");
const { checkUserGroup } = require("../middlewares/groups");


router.post("/:groupId", use(checkToken), use(checkUserGroup), use(checkMessage), use(messagesController.createMessage));

router.get("/:groupId", use(checkToken), use(checkUserGroup), use(messagesController.getMessages));


module.exports = router;
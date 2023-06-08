const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groups");
const { checkToken } = require("../middlewares/checkToken");
const { use } = require("../middlewares/use");

router.post("/", use(checkToken), use(groupsController.createGroup));
router.post("/join", use(checkToken), use(groupsController.joinGroup));

router.get("/", use(checkToken), use(groupsController.getUserGroups));
router.get("/:groupId", use(checkToken), use(groupsController.getGroup));

module.exports = router;
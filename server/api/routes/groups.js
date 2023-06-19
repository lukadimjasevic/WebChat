const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groups");
const { use } = require("../middlewares/use");
const { checkToken } = require("../middlewares/checkToken");
const { checkName, checkUserGroup } = require("../middlewares/groups");


router.post("/create", use(checkToken), use(checkName), use(groupsController.createGroup));
router.post("/join", use(checkToken), use(groupsController.joinGroup));

router.get("/", use(checkToken), use(groupsController.getUserGroups));
router.get("/:groupId", use(checkToken), use(checkUserGroup), use(groupsController.getGroup));

router.delete("/:groupId", use(checkToken), use(checkUserGroup), use(groupsController.deleteUserFromGroup));


module.exports = router;
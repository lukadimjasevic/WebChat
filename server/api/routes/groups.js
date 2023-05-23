const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groups");
const { checkToken } = require("../middlewares/checkToken");
const { use } = require("../middlewares/use");

router.post("/", use(checkToken), use(groupsController.createGroup));
router.post("/join", use(checkToken), use(groupsController.joinGroup));

router.get("/:groupCode", use(groupsController.getGroupUsers));

module.exports = router;
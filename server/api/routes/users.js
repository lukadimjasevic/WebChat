const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { checkToken } = require("../middlewares/checkToken");
const { use } = require("../middlewares/use");

router.post("/register", use(usersController.register));
router.post("/login", use(usersController.login));
router.post("/logout", use(checkToken), use(usersController.logout));

router.get("/", use(checkToken), use(usersController.getUser));

module.exports = router;
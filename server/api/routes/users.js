const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { checkToken } = require("../middlewares/checkToken");
const { use } = require("../middlewares/use");
const { upload } = require("../../utils/multer");

router.post("/register", use(usersController.register));
router.post("/login", use(usersController.login));
router.post("/logout", use(checkToken), use(usersController.logout));

router.get("/", use(checkToken), use(usersController.getUser));

router.put("/profile", use(checkToken), upload.single("picture"), use(usersController.updateUserProfile));
router.put("/account", use(checkToken), use(usersController.updateUserAccount));

module.exports = router;
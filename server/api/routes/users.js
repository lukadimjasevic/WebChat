const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { use } = require("../middlewares/use");
const { checkToken } = require("../middlewares/checkToken");
const { checkUsername, checkPassword, checkEmail, checkName, checkBio } = require("../middlewares/users");
const { upload } = require("../../utils/multer");


router.post("/register", use(checkUsername), use(checkPassword), use(checkEmail), use(usersController.register));
router.post("/login", use(checkPassword), use(checkEmail), use(usersController.login));
router.post("/logout", use(checkToken), use(usersController.logout));

router.get("/", use(checkToken), use(usersController.getUser));

router.put("/profile", use(checkToken), upload.single("picture"), use(checkName), use(checkBio), use(usersController.updateUserProfile));
router.put("/account", use(checkToken), use(checkUsername), use(usersController.updateUserAccount));


module.exports = router;
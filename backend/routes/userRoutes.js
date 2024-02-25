const express = require("express");
const { registerUser, authUser } = require("../controller/userControllers");

const router = express.Router();

//route for registration
router.route("/").post(registerUser);

//route for login
router.route("/login").post(authUser);

module.exports = router;

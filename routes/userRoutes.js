const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

// @route POST - /register
router.route("/register").post(userControllers.registerNewUser);

// @route POST - /login
router.route("/login").post(userControllers.loginUser);

// @route POST - /logout
router.route("/logout").get(userControllers.logoutUser);

module.exports = router;

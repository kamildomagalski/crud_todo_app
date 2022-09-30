const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

// @route POST - /refreshToken
router.route("/refresh-token").post(authControllers.refreshToken);

module.exports = router;

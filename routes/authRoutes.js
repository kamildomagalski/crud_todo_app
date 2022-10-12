const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

// @route GET - /refreshToken
router.route("/refresh-token").get(authControllers.refreshToken);

module.exports = router;

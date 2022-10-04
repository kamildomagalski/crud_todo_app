const User = require("../models/User");
const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.registerNewUser = async (req, res, next) => {
  const { login, password } = req.body.newUser;
  if (!login || !password) {
    return res.status(418).send({ message: "No login or password provided" });
  }
  try {
    let newUser = new User(login, password);
    const [result] = await newUser.save();
    console.log(result);
    res.status(200).send({ message: "User added!" });
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { login, password } = req.body.credentials;
  try {
    const [result, _] = await User.login(login, password);
    if (result.length === 0) {
      return res.status(401).send({ message: "Wrong login or password." }); //unauthorized- wrong login/pass
    }
    // to nie działa:
    // if (!result) {
    //   return res.status(401).send({ message: "Wrong credentials used." }); //unauthorized- wrong login/pass
    // }
    const user = result[0];

    const payload = user;

    const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "20s" });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "3d" });

    const [isTokenSaved] = await Auth.addRefreshToken(refreshToken);
    if (!isTokenSaved) {
      return res
        .status(401)
        .send({ message: "Could not generate auth token, please try again." }); //problem with creating refresh token
    }

    res.status(200).send({ token, refreshToken, message: "User logged in!" });
  } catch (err) {
    console.log(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const [isTokenRemoved] = await User.logout(refreshToken);
    if (!isTokenRemoved.affectedRows) {
      return res
        .status(404)
        .send({ message: "Unable to logout user: no token found." });
    }
    res.status(200).send({ message: "User successfully logged out." });
  } catch (err) {
    console.log(err);
  }
};

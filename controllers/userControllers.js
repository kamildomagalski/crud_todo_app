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

    const user = result[0];
    const payload = {
      login: user.login,
      role: user.role,
    };

    const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "10s" });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "1h" });

    const [isTokenSaved] = await Auth.addRefreshToken(refreshToken);
    if (!isTokenSaved) {
      return res
        .status(401)
        .send({ message: "Could not generate auth token, please try again." }); //problem with creating refresh token
    }
    res
      .status(200)
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      })
      .send({ login, token, message: "User logged in!" });
  } catch (err) {
    console.log(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).send({
      message: "Refresh token not provided in request. Could not log out.",
    });

  const refreshToken = cookies.jwt;
  try {
    const [isTokenRemoved] = await User.logout(refreshToken);
    if (!isTokenRemoved.affectedRows) {
      return res
        .status(403)
        .clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" })
        .send({ message: "Unable to logout user: no token found." });
    }
    res
      .status(200)
      .clearCookie("jwt", { httpOnly: true, secure: true })
      .send({ message: "User successfully logged out." });
  } catch (err) {
    console.log(err);
  }
};

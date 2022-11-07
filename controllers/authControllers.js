const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");
const { authLogger } = require("../middlewares/logEvents");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    authLogger("unknown", "refresh-token", "failure", "no token in header");
    return res.status(401).send({
      message: "Refresh token not provided in request. Log in again.",
    });
  }

  const refreshToken = cookies.jwt;

  try {
    const [isRefreshTokenValid] = await Auth.refreshToken(refreshToken);
    if (!isRefreshTokenValid) {
      const user = jwt.decode(refreshToken).login;

      authLogger(
        user,
        "refresh-token",
        "failure",
        "could not match a refresh token"
      );
      return res.status(403).send({
        message: "Unauthorized user- could not match a refresh token",
      }); //session expired
    }

    jwt.verify(refreshToken, REFRESH_TOKEN, (err, data) => {
      if (err) {
        authLogger(
          payload.login,
          "refresh-token",
          "failure",
          "unauthorized user"
        );

        return res.status(403).send({ message: "Unauthorized user." });
      }
      const payload = {
        login: data.login,
        role: data.role,
      };

      const newAccessToken = jwt.sign(payload, ACCESS_TOKEN, {
        expiresIn: "20s",
      });

      authLogger(payload.login, "refresh-token", "success");

      return res.status(200).send({
        ...payload,
        newAccessToken,
        message: "New access token created",
      });
    });
  } catch (err) {
    console.log(err);
  }
};

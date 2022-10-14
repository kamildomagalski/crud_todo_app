const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).send({
      message: "Refresh token not provided in request. Log in again.",
    });

  const refreshToken = cookies.jwt;

  try {
    const [isRefreshTokenValid] = await Auth.refreshToken(refreshToken);
    if (!isRefreshTokenValid) {
      return res.status(403).send({
        message: "Unauthorized user- could not match a refresh token",
      }); //session expired
    }

    jwt.verify(refreshToken, REFRESH_TOKEN, (err, data) => {
      if (err) {
        return res.status(403).send({ message: "Unauthorized user." });
      }
      const payload = {
        login: data.login,
        role: data.role,
      };

      const newAccessToken = jwt.sign(payload, ACCESS_TOKEN, {
        expiresIn: "20s",
      });

      res
        .status(200)
        .send({
          ...payload,
          newAccessToken,
          message: "New access token created",
        });
    });
  } catch (err) {
    console.log(err);
  }
};

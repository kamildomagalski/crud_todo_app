const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unable to authorize user." });
  }

  jwt.verify(token, ACCESS_TOKEN, (err, data) => {
    if (err) {
      return res.status(403).send({ message: "Unauthorized user." });
    }

    req.user = data;
    next();
  });
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const [isRefreshTokenValid] = await Auth.refreshToken(refreshToken);
    if (!isRefreshTokenValid) {
      return res
        .status(401)
        .send({ message: "Could not refresh session, please log in again." }); //session expired
    }
    const token = isRefreshTokenValid[0]?.refresh_token;

    jwt.verify(token, REFRESH_TOKEN, (err, data) => {
      if (err) {
        return res.status(403).send({ message: "Unauthorized user." });
      }
      const payload = {
        login: data.login,
        role: data.role,
      };

      const newToken = jwt.sign(payload, ACCESS_TOKEN, {
        expiresIn: "20s",
      });

      res.status(200).send({ newToken, message: "New token created" });
    });
  } catch (err) {
    console.log(err);
  }
};

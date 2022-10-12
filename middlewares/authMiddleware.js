const jwt = require("jsonwebtoken");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

authMiddleware = (req, res, next) => {
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

module.exports = authMiddleware;

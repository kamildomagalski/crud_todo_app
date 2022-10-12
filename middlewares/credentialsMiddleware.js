const whiteslist = require("../config/whitelist");

const credentialsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (whiteslist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
};

module.exports = credentialsMiddleware;

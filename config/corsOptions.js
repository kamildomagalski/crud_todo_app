const whitelist = require("./whitelist");

const corsOptions = {
  origin: (origin, callback) => {
    //origin === undefined only for POSTMAN usage
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("Domain not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

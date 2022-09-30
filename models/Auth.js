const db = require("../config/db");
class Auth {
  constructor() {}

  static addRefreshToken(token) {
    const sql = "INSERT INTO refreshtokens (refresh_token) VALUES (?)";
    return db.execute(sql, [token]);
  }

  static refreshToken(token) {
    const sql =
      "SELECT refresh_token FROM refreshTokens WHERE refresh_token = ?";
    return db.execute(sql, [token]);
  }
}

module.exports = Auth;

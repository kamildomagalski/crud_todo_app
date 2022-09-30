const db = require("../config/db");

class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }

  save() {
    const sql = `INSERT INTO users (login, password) VALUES (?, ?)`;
    const values = [`${this.login}`, `${this.password}`];
    return db.execute(sql, values);
  }

  static login(login, password) {
    const sql = "SELECT * FROM users WHERE login = ? AND password = ?";
    const values = [`${login}`, `${password}`];
    return db.execute(sql, values);
  }

  static logout(token) {
    const sql = "DELETE FROM refreshtokens WHERE refresh_token = ?";
    return db.execute(sql, [token]);
  }
}

module.exports = User;

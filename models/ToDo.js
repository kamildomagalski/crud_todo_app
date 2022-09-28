const db = require("../config/db");

class ToDo {
  constructor(title, description = "", due_date, priority = 1) {
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.priority = priority;
  }

  save() {
    const sql = `INSERT INTO todos (title, description, due_date, priority) VALUES (?, ?, ?, ?)`;
    const values = [
      `${this.title}`,
      `${this.description}`,
      `${this.due_date}`,
      `${this.priority}`,
    ];
    return db.execute(sql, values);
  }

  static findAll() {
    const sql = "SELECT * FROM todos";
    return db.execute(sql);
  }

  static findById(id) {
    const sql = "SELECT * FROM todos WHERE id_todo = ?";
    return db.execute(sql, [id]);
  }

  static delete(id) {
    const sql = "DELETE from todos WHERE id_todo = ?";
    return db.execute(sql, [id]);
  }

  static update(id, title, description, due_date, priority) {
    const sql =
      "UPDATE todos SET title = ?, description = ? , due_date = ?, priority = ? WHERE id_todo = ?";
    const values = [
      `${title}`,
      `${description}`,
      `${due_date}`,
      `${priority}`,
      `${id}`,
    ];
    return db.execute(sql, values);
  }
}

module.exports = ToDo;

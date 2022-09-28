const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
})

//mysql2 let us use promis wrapper to use async/await in our files
module.exports = db.promise();

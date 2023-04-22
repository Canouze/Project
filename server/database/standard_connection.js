var mysql = require('mysql2');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "go_db"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Successfully connected to database");
});

module.exports = db;

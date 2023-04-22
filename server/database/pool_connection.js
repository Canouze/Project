var mysql = require('mysql2');

var db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "go_db"
});

module.exports = db;

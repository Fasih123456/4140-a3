const mysql = require("mysql2");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fasih123",
  database: "4140A3",
});

module.exports = db.promise();

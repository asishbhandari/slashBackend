const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: `${process.env.MYSQL_USER}`,
  database: "slash",
  password: `${process.env.MYSQL_PASSWORD}`,
});

module.exports = db;

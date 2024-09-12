const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if username already exists
    db.query(
      "SELECT username FROM users WHERE username = ?",
      [username],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          return res.status(409).json({ message: "Username already exists" });
        }

        bcrypt.hash(password, 10).then((hash) => {
          db.query(
            "INSERT INTO users (username, pass) VALUES (?,?)",
            [username, hash],
            (err, result) => {
              if (err) throw err;
              return res.json({ message: "User registered successfully" });
            }
          );
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    db.query(
      "SELECT pass FROM users WHERE username =?",
      [username],
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        bcrypt.compare(password, result[0].pass).then((isMatch) => {
          if (isMatch) {
            const { pass, ...user } = result[0];
            const token = jwt.sign({ user: result[0].username }, "Asish@");
            return res.status(200).json({ token: token, user: user });
          }
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = { register, login };

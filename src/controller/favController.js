const db = require("../db/dbConfig");

const getAll = async (req, res) => {
  try {
    const { userId } = req.query;
    db.query(
      "SELECT * FROM favourite WHERE userId = ?",
      [userId],
      (err, result) => {
        if (err) throw err;
        return res.json(result);
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const addUni = async (req, res) => {
  try {
    const { userId, universityname, state, webpage } = req.body;

    db.query(
      "INSERT INTO favourite (userId, universityname, state,webpage) VALUES (?, ?, ?,?)",
      [userId, universityname, state, webpage],
      (err, result) => {
        if (err) throw err;
        res
          .status(201)
          .json({ message: "University added to favourites", result });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeUni = async (req, res) => {
  try {
    const { userId, universityname, state, webpage } = req.body;

    db.query(
      "DELETE FROM favourite WHERE userId = ? AND universityname =?",
      [userId, universityname],
      (err, result) => {
        if (err) throw err;
        res
          .status(201)
          .json({ message: "University remmoved to favourites", result });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { removeUni, addUni, getAll };

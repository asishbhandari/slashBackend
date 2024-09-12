const express = require("express");
const { removeUni, addUni, getAll } = require("../controller/favController");

const favRouter = express.Router();
favRouter.get("/all", getAll);
favRouter.post("/add", addUni);
favRouter.delete("/remove", removeUni);

module.exports = favRouter;

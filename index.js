const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./src/routes/user.js");
const favRouter = require("./src/routes/favourite.js");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/fav", favRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

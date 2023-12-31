const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const followersRouter = require("./routes/Followers");
app.use("/followings", followersRouter);

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Server running on port 3002");
  });
});

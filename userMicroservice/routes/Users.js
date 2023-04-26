const express = require("express");
const router = express.Router();
const { Users, Passwords } = require("../models");
const crypto = require("crypto");
const secret = "oSeRxVnEwc0e1DaHtzw7xvddolbDu08u"; //32 char secret
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// encryption handlers
const encrypt = (password) => {
  const iv = crypto.randomBytes(16); // random initVector

  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);

  let encryptedPassword = cipher.update(password, "utf-8", "hex");
  encryptedPassword += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString(),
  };
};

const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secret),
    Buffer.from(encryption.iv, "hex")
  );
  let decryptedPassword = decipher.update(encryption.password, "hex", "utf-8");
  decryptedPassword += decipher.final("utf8");

  return decryptedPassword.toString();
};

router.post("/createUser", async (req, res) => {
  const { username, email } = req.body;
  const emailCount = await Users.count({ where: { email: email } });
  const usernameCount = await Users.count({ where: { username: username } });
  if (usernameCount == 0 && emailCount == 0) {
    await Users.create({
      username: username,
      email: email,
    });
    res.json("Success, user created");
  } else if (usernameCount > 0) {
    res.json({
      error: "Failure to create user, username already in use, try another",
    });
  } else if (emailCount > 0) {
    res.json({
      error: "Failure to create user, user with this email already exists",
    });
  } else {
    res.json({ error: "Failure to create user" });
  }
});

router.post("/addPassword", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = encrypt(password);
  const user = await Users.findOne({ where: { username: username } });

  await Passwords.create({
    password: hashedPassword.password,
    iv: hashedPassword.iv,
    UserId: user.id,
  });
  res.json("Success");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userByUsername = await Users.count({ where: { username: username } });
  const userByEmail = await Users.count({ where: { email: username } });
  let accessToken;
  let userID = "";
  let user;

  if (userByUsername > 0) {
    userID = userByUsername.id;
    user = await Users.findOne({ where: { username: username } });
  } else if (userByEmail > 0) {
    userID = userByEmail.id;
    user = await Users.findOne({ where: { email: username } });
  } else {
    res.json({ error: "User does not exist" });
  }

  const passwords = await Passwords.findAll({ where: { UserId: user.id } });
  passwords.length > 0 &&
    passwords.forEach((pwd) => {
      // console.log(pwd);
      // console.log(accessToken);
      const decryptedPassword = decrypt({
        password: pwd.password,
        iv: pwd.iv,
      });
      if (decryptedPassword == password) {
        accessToken = sign({ username: user.username, id: user.id }, secret);
        res.json({ accessToken: accessToken, userID: user.id });
      }
    });
  if (accessToken == null) {
    res.json({ error: "Wrong username and password combination" });
  }
});

router.post("/getUser", validateToken, async (req, res) => {
  const { userID } = req.body;
  const user = await Users.findOne({ where: { id: userID } });
  if (user != null) {
    res.json(user);
  } else {
    res.json({ error: "404: User not found" });
  }
});

router.post("/changeUsername", validateToken, async (req, res) => {
  const { userID, username } = req.body;
  const user = await Users.findOne({ where: { id: userID } });
  const checkUsername = await Users.count({ where: { username: username } });
  if (checkUsername == 0) {
    if (user != null) {
      await Users.update(
        {
          username: username,
        },
        {
          where: { id: userID },
        }
      );
      res.json("Successfully updated username");
    } else {
      res.json({ error: "404: User not found" });
    }
  } else {
    res.json({ error: "Username already in use" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//router.get("/getDecryptedPassword/:id")

Users.associate = (models) => {
  Users.hasMany(models.Posts, {
    onDelete: "cascade",
  });
};

module.exports = router;

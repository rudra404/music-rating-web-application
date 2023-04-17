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
  const userCount = await Users.count({ where: { email: email } });
  console.log(userCount);
  if (userCount == 0) {
    await Users.create({
      username: username,
      email: email,
    });
    res.json("Success, user created");
  } else {
    res.json({ error: "Failure to create user, username already exists" });
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
  const user = await Users.findOne({ where: { username: username } });
  let accessToken;
  let userID = user.id;
  if (user == null) {
    // res.json({ error: "User does not exist" });
  } else {
    const passwords = await Passwords.findAll({ where: { UserId: user.id } });
    passwords.length > 0 &&
      passwords.forEach((pwd) => {
        console.log(pwd);
        console.log(accessToken);
        const decryptedPassword = decrypt({
          password: pwd.password,
          iv: pwd.iv,
        });
        if (decryptedPassword == password) {
          accessToken = sign({ username: user.username, id: user.id }, secret);
          res.json({ accessToken: accessToken, userID: userID });
        }
      });
    if (accessToken == null) {
      res.json({ error: "Wrong username and password combination" });
    }
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

const express = require("express");
const router = express.Router();
const { Users, Followers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/follow", validateToken, async (req, res) => {
  const { user, follower } = req.body;
  const mainUser = await Users.findOne({ where: { username: user } });
  const followerUser = await Users.findOne({ where: { username: follower } });
  if (followerUser == null || mainUser == null) {
    res.json({ error: "User or users does not exist" });
  } else {
    await Followers.create({
      user: mainUser.id,
      follower: follower.id,
    });
    res.json("Success, followers added");
  }
});

router.post("/unfollow", validateToken, async (req, res) => {
  const { follower, followee } = req.body;
  const followerUser = await Users.findOne({ where: { username: follower } });
  const followeeUser = await Users.findOne({ where: { username: followee } });
  if (followerUser == null || followeeUser == null) {
    res.json({ error: "User does not exist" });
  } else {
    await Followers.create({
      follower: followerUser.id,
      followee: followeeUser.id,
    });
    res.json("Success, followers added");
  }
});

// router.get("/followings", validateToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;

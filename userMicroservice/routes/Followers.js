const express = require("express");
const router = express.Router();
const { Users, Followers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/follow", validateToken, async (req, res) => {
  const { user, follower } = req.body;
  const userCount = await Users.count({ where: { username: user } });
  const followerCount = await Users.count({ where: { username: follower } });
  if (userCount == 0 || followerCount == 0) {
    res.json({ error: "User or users does not exist" });
  } else {
    const mainUser = await Users.findOne({ where: { username: user } });
    const followerUser = await Users.findOne({ where: { username: follower } });
    const following = await Followers.count({
      where: { user: `${mainUser.id}`, follower: `${followerUser.id}` },
    });
    if (following == 0) {
      await Followers.create({
        user: mainUser.id,
        follower: followerUser.id,
      });
      res.json("Success, follower added");
    } else {
      res.json("You are already following this user");
    }
  }
});

router.post("/unfollow", validateToken, async (req, res) => {
  const { user, follower } = req.body;
  const mainUser = await Users.findOne({ where: { username: user } });
  const followerUser = await Users.findOne({ where: { username: follower } });
  if (followerUser == null || mainUser == null) {
    res.json({ error: "User or users do not exist" });
  } else {
    await Followers.create({
      user: mainUser.id,
      follower: follower.id,
    });
    res.json("Success, follower removed");
  }
});

// router.get("/followings", validateToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;

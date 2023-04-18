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
  const userCount = await Users.count({ where: { username: user } });
  const followerCount = await Users.count({ where: { username: follower } });
  if (userCount == 0 || followerCount == 0) {
    res.json({ error: "User or users does not exist" });
  } else {
    const mainUser = await Users.findOne({ where: { username: user } });
    const followerUser = await Users.findOne({ where: { username: follower } });
    const following = await Followers.findOne({
      where: { user: `${mainUser.id}`, follower: `${followerUser.id}` },
    });
    if (following != null) {
      await Followers.destroy({
        where: { id: following.id },
      });
      res.json("Successfully unfollowed");
    } else {
      res.json("No such following exists");
    }
  }
});

router.post("/getFollowings", validateToken, async (req, res) => {
  const { username } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (user == null) {
    res.json({ error: "User or users does not exist" });
  } else {
    if (followers != null) {
      const followers = await Followers.findAll({
        where: { user: `${user.id}` },
      });
      res.json(followers);
    } else {
      res.json({ error: "No followers" });
    }
  }
});

module.exports = router;

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
    if (mainUser.id == followerUser.id) {
      res.json({ error: "Cannot follow yourself" });
    } else if (following == 0) {
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
  const { userID } = req.body;
  const user = await Users.findOne({ where: { id: userID } });
  if (user != null) {
    const followers = await Followers.findAll({
      where: { user: `${user.id}` },
    });
    res.json(followers);
  } else {
    res.json({ error: "User or users does not exist" });
  }
});

module.exports = router;

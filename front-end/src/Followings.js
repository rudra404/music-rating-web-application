import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import Widgets from "./Widgets";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Followers.css";

export default function Followings() {
  const navigate = useNavigate();
  const { userID, authState } = useContext(AuthContext);
  const [followings, setFollowings] = useState([]);
  const [numOfFolowings, setNumOfFolowings] = useState([]);

  async function getFollowers() {
    const data = { userID: userID };
    await axios
      .post("http://localhost:3002/followings/getFollowings", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //   setFollowers(response.data);

          response.data.forEach((follower) => {
            getUser(follower.userID);
          });
          //   console.log(response.data);
          setNumOfFolowings(response.data.length);
        }
      });
  }

  async function getUser(userID) {
    const data = { userID: userID };
    await axios
      .post("http://localhost:3002/auth/getUser", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFollowings((current) => [...current, response.data]);
        }
      });
  }

  function userFollower(users) {
    let content = [];
    for (let user of users) {
      content.push(
        <div
          className="search-result-links"
          key={user.id}
          onClick={() => navigate(`user/${user.id}`)}
        >
          <div className="followerUser">{user.username}</div>
        </div>
      );
    }
    return content;
  }

  // useEffect(() => {
  //   getFollowers();
  // }, []);

  useEffect(() => {
    getFollowers();
  }, [authState]);

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>Followers</h2>
          <h4>{numOfFolowings}</h4>
        </div>

        <div className="followersList">{userFollower(followings)}</div>
      </div>

      <Widgets className="widgets" />
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import Widgets from "./Widgets";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Followers.css";
import { Link } from "react-router-dom";

export default function Followers() {
  const navigate = useNavigate();
  const { userID, authState } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [numOfFolowers, setNumOfFolowers] = useState([]);

  async function getFollowers() {
    const data = { userID: userID };
    await axios
      .post("http://localhost:3002/followings/getFollowers", data, {
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
            getUser(follower.followerID);
          });
          //   console.log(response.data);
          setNumOfFolowers(response.data.length);
        }
      });
  }

  async function getUser(followerID) {
    const data = { userID: followerID };
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
          setFollowers((current) => [...current, response.data]);
        }
      });
  }

  function userFollower(users) {
    let content = [];
    for (let user of users) {
      content.push(
        <Link to={`/user/${user.id}`} className="search-result-links">
          <div className="followerUser">{user.username}</div>
        </Link>
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
          <h4>{numOfFolowers}</h4>
        </div>

        <div className="followersList">{userFollower(followers)}</div>
      </div>

      <Widgets className="widgets" />
    </div>
  );
}

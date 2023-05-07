import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import ProfileCard from "./ProfileCard";
import Widgets from "./Widgets";

const userMicroserviceUrl = process.env.USERMICROSERVICE_URL || "http://localhost:3002";

function Profile() {
  const { userID } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [user, setUser] = useState();

  async function getFollowers() {
    const data = { userID: userID };
    axios
      .post(`${userMicroserviceUrl}/followings/getFollowers`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFollowers(response.data);
          console.log(response.data);
        }
      });
  }

  async function getFollowings() {
    const data = { userID: userID };
    axios
      .post(`${userMicroserviceUrl}/followings/getFollowings`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFollowings(response.data);
          console.log(response.data);
        }
      });
  }

  async function changeUsername() {
    const data = { userID: userID, username: "newUsername" };
    axios
      .post(`${userMicroserviceUrl}/auth/changeUsername`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
        }
      });
  }

  async function getUser() {
    const data = { userID: userID };
    axios
      .post(`${userMicroserviceUrl}/auth/getUser`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response);
          setUser(response.data);
        }
      });
  }

  useEffect(() => {
    getFollowings();
    getFollowers();
    getUser();
  }, [userID]);

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>My profile</h2>
        </div>
        <ProfileCard
          user={user}
          followers={followers}
          followings={followings}
          functional={true}
        />
      </div>

      <Widgets className="widgets" />
    </div>
  );
}

export default Profile;

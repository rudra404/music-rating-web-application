import React, { useEffect, useState, useContext } from "react";
import "./User.css";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Widgets from "./Widgets";

function Profile() {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [user, setUser] = useState();
  const [allRatings, setAllRatings] = useState({ ratings: [] });

  function getUser() {
    const data = { userID: id };
    axios
      .post("http://localhost:3002/auth/getUser", data, {
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
  function getFollowers() {
    const data = { userID: id };
    axios
      .post("http://localhost:3002/followings/getFollowers", data, {
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
  async function getRatings() {
    const response = await axios.get(
      `http://localhost:5050/all_ratings/?userID=${id}`
    );
    const ratings = response.data || [];
    const updatedRatings = [];
    for (let i = 0; i < ratings.length; i++) {
      const id = ratings[i][0];
      const rating = ratings[i][1];
      const songInfoResponse = await axios.get(
        `http://localhost:5050/search_id/${id}`
      );
      const songInfo = songInfoResponse.data[0];
      updatedRatings.push([
        songInfo[0],
        songInfo[1],
        songInfo[2],
        songInfo[3],
        rating,
      ]);
    }
    setAllRatings({
      ratings: updatedRatings,
    });
  }
  useEffect(() => {
    getUser();
    getFollowers();
    getRatings();
  }, [id]);

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>Profile</h2>
        </div>
        <ProfileCard user={user} followers={followers} />
      </div>

      <Widgets className="widgets" />
    </div>
  );
}

export default Profile;

import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import ProfileCard from "./ProfileCard";

function Profile() {
  const { userID } = useContext(AuthContext);
  const [allRatings, setAllRatings] = useState({ ratings: [] });
  const [followers, setFollowers] = useState([]);

  async function getRatings() {
    const response = await axios.get(
      `http://localhost:5000/all_ratings/?userID=${userID}`
    );
    const ratings = response.data || [];
    const updatedRatings = [];
    for (let i = 0; i < ratings.length; i++) {
      const id = ratings[i][0];
      const rating = ratings[i][1];
      const songInfoResponse = await axios.get(
        `http://localhost:5000/search_id/${id}`
      );
      const songInfo = songInfoResponse.data[0];
      updatedRatings.push([songInfo[1], songInfo[2], songInfo[3], rating]);
    }
    setAllRatings({
      ratings: updatedRatings,
    });
  }

  async function getFollowers() {
    const data = { userID: userID };
    axios
      .post("http://localhost:3002/followings/getFollowings", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response);
        }
      });
  }

  useEffect(() => {
    getRatings();
    getFollowers();
  });

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>Profile</h2>
        </div>

        <ProfileCard username={"tamim1"} followers={followers} />

        <div className="profile__ratings">
          <h3>Ratings:</h3>
          <ul>
            {allRatings.ratings.map((rating, index) => (
              <li key={index}>
                {rating[0]} - {rating[1]} - {rating[2]} | Rating: {rating[3]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;

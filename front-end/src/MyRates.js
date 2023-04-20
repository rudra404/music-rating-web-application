import React, { useEffect, useState, useContext } from "react";
import "./MyRates.css";
import "./Home.css";
import Widgets from "./Widgets";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import Header from './Header';

function MyRates() {
  const { userID } = useContext(AuthContext);
  const [allRatings, setAllRatings] = useState({ ratings: [] });

  async function getRatings() {
    const response = await axios.get(
      `http://localhost:5050/all_ratings/?userID=${userID}`
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
      updatedRatings.push([songInfo[1], songInfo[2], songInfo[3], rating]);
    }
    setAllRatings({
      ratings: updatedRatings,
    });
  }
  useEffect(() => {
    getRatings();
  },[userID]);
  
  return (
    <div className="home">
      <Header className="main_header" />
      <div className="profile">
        <div className="profile__header">
          <h2>Profile</h2>
        </div>
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
      <Widgets className="widgets" />
    </div>
  );
}

export default MyRates;
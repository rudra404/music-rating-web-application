import React, { useEffect, useState, useContext } from "react";
import "./MyRates.css";
import "./Home.css";
import Widgets from "./Widgets";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import { Link } from "react-router-dom";

const musicMicroserviceUrl = process.env.MUSICMICROSERVICE_URL || "http://localhost:5050";

function MyRates() {
  const { userID } = useContext(AuthContext);
  const [allRatings, setAllRatings] = useState({ ratings: [] });

  async function getRatings() {
    const response = await axios.get(
      `${musicMicroserviceUrl}/all_ratings/?userID=${userID}`
    );
    const ratings = response.data || [];
    const updatedRatings = [];
    for (let i = 0; i < ratings.length; i++) {
      const id = ratings[i][0];
      const rating = ratings[i][1];
      const songInfoResponse = await axios.get(
        `${musicMicroserviceUrl}/search_id/${id}`
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
    getRatings();
  }, [userID]);

  function ListSong({ result }) {
    return (
      <>
        <div className="songtitle">
          <h4>{result[1]}</h4>
        </div>
        <div className="artist">By {result[2]}</div>
        <div className="album">{result[3]}</div>
      </>
    );
  }

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>My rates</h2>
        </div>
        <div className="myRatings">
          <div className="ratingHeadings">
            <h3>Songs</h3>
            <h3>Ratings</h3>
          </div>

          {allRatings.ratings.map((rating, index) => (
            <div className="listRatings">
              <Link
                to={`/song/${rating[0]}`}
                key={index}
                className="search-result-links"
              >
                <ListSong result={rating} />
                {/* <SearchResultItem
                        result={song}
                        className="search-result-items"
                      /> */}
              </Link>
              <div className="rating">{rating[4]}</div>
            </div>
            // <li key={index}>
            //   {rating[0]} - {rating[1]} - {rating[2]} | Rating: {rating[3]}
            // </li>
          ))}
        </div>
      </div>
      <Widgets className="widgets" />
    </div>
  );
}

export default MyRates;

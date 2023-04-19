import React, { useEffect, useState, useContext } from "react";
import "./Song.css";
import "./Home.css";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";

function Song() {
  const { id } = useParams();
  const [searchResults, setSearchResults] = useState({
    title: [],
    artist: [],
    album: [],
    genre: [],
  });
  const [ratingResult, setRatingResult] = useState({ rating: [] });
  const [UserRatingResult, setUserRatingResult] = useState({ rating: [] });

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);
  const { authState, userID } = useContext(AuthContext);
  console.log(userID);
  function getSongInfo(id) {
    axios.get(`http://localhost:5050/search_id/${id}`).then((response) => {
      setSearchResults({
        title: response.data[0][1] || [],
        artist: response.data[0][2] || [],
        album: response.data[0][3] || [],
        genre: JSON.parse(response.data[0][4].replace(/'/g, '"')) || [],
      });
    });
  }

  function getSongRating(id) {
    axios.get(`http://localhost:5050/av_rating/${id}`).then((response) => {
      setRatingResult({
        rating: response.data || [],
      });
    });
  }

  function checkUserRating() {
    if (authState === false) {
      // Check user is logged in
      setUserRatingResult({
        rating: "Not logged in",
      });
    } else {
      axios
        .get(
          `http://localhost:5050/check_rating/?songID=${id}&userID=${userID}`
        )
        .then((response) => {
          setUserRatingResult({
            rating: response.data || [],
          });
        });
    }
  }

  function sendRating() {
    if (authState === false) {
      // Check user is logged in
      alert("You must log in or register before you can rate songs");
    } else {
      axios
        .get(
          `http://localhost:5050/add_rating?songID=${id}&rating=${rating}&userID=${userID}`
        )
        .then((response) => {
          setSubmitClicked(true);
        });
    }
  }
  async function button() {
    sendRating();
    getSongRating(id);
    checkUserRating(userID);
  }

  useEffect(() => {
    getSongInfo(id);
  }, [id]);

  useEffect(() => {
    getSongRating(id);
  }, [id]);

  useEffect(
    (userID) => {
      checkUserRating(userID);
    },
    [userID]
  );

  return (
    <div className="home">
      <div className="song__header">
        <h2>Song</h2>
        <div className="song">
          <p> _____ </p>
          <p>Title: {searchResults.title}</p>
          <p>Artist: {searchResults.artist}</p>
          <p>Album: {searchResults.album}</p>
          <p>Genres: {searchResults.genre.join(", ")}</p>
          <p> ______ </p>
          <p>Average rating: {ratingResult.rating}</p>
          {authState && <p>Your rating: {UserRatingResult.rating}</p>}

          {authState && (
            <>
              <p> ______ </p>
              <p> Rate it: </p>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (hover || rating) ? "on" : "off"}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <button className="submit-button" type="submit" onClick={button}>
                Submit Rating
              </button>
            </>
          )}
        </div>
      </div>
      <Widgets className="widgets" />
    </div>
  );
}

export default Song;

import React, { useEffect, useState, useContext } from "react";
import "./Song.css";
import "./Home.css";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";

function Song() {
  const { id } = useParams();
  const [searchResults, setSearchResults] = useState({ title: [], artist: [], album: [], genre: [] });
  const [ratingResult, setRatingResult] = useState({ rating: []});
  const [UserRatingResult, setUserRatingResult] = useState({ rating: []});
  const {authState, setAuthState, setUserID } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);
  
  console.log(authState);
  function getSongInfo(id) {
      axios
        .get(`http://localhost:5000/search_id/${id}`)
        .then((response) => {
          setSearchResults({
            title: response.data[0][1] || [],
            artist: response.data[0][2] || [],
            album: response.data[0][3] || [],
            genre: JSON.parse(response.data[0][4].replace(/'/g, '"')) || []
          });
        });
    }

  function getSongRating(id) {
      axios
        .get(`http://localhost:5000/av_rating/${id}`)
        .then((response) => {
          setRatingResult({
            rating: response.data || [],
          });
        });
    }

    function checkUserRating(id) {

      if (authState === false) { // Check user is logged in
        setUserRatingResult({
          rating: "Not logged in",
        });
      } else { 
        axios
        .get(`http://localhost:5000/check_rating/?songID=${id}&userID=${authState.UserID}`)
        .then((response) => {
          setUserRatingResult({
            rating: response.data || [],
          });
        });
      }
      
    }
  
    function sendRating(id, rating, authState) {
      axios
        .get(`http://localhost:5000/add_rating?songID=${id}&rating=${rating}&userID=${authState.UserID}`)
        .then((response) => {
          setSubmitClicked(true);
        });
    }

    useEffect(() => {
      getSongInfo(id)
      ;
    }, [id]);

    useEffect(() => {
      getSongRating(id)
      ;
    }, [id]);

    useEffect(() => {
      checkUserRating(id)
      ;
    }, [id]);


  return (
    <div className="home">
        <div className="song__header">
        <h2>Song</h2>
        <div className="song">
        <p> _____  </p>
        <p>Title: {searchResults.title}</p>
        <p>Artist: {searchResults.artist}</p>
        <p>Album: {searchResults.album}</p>
        <p>Genres: {searchResults.genre.join(', ')}</p>
        <p> ______  </p>
        <p>Average rating: {ratingResult.rating}</p>
        <p>Your rating: {UserRatingResult.rating}</p>

        <p> ______  </p>
        <p> Rate it:  </p>
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
        <button className="submit-button" type="submit" onClick={sendRating}>
            Submit Rating
          </button>
        </div>
      </div>
        <Widgets className="widgets" />
      </div>
  );
}

export default Song;
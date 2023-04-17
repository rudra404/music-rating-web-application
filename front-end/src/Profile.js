import React from 'react'
import "./Profile.css";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";


function Profile() {
  const { authState, userID, setAuthState, setUserID } = useContext(AuthContext);
  const [allRatings, setAllRatings] = useState({ ratings: [] });
  const [searchResults, setSearchResults] = useState({
    title: "",
    artist: "",
    album: "",
    genre: [],
  });

  useEffect(() => {
    getRatings(userID);
  }, []);

  function getSongInfo(id) {
    axios.get(`http://localhost:5000/search_id/${id}`).then((response) => {
      setSearchResults({
        title: response.data[0][1] || "",
        artist: response.data[0][2] || "",
        album: response.data[0][3] || "",
        genre: JSON.parse(response.data[0][4].replace(/'/g, '"')) || [],
      });
    });
  }

  function getRatings(userID) {
    axios.get(`http://localhost:5000/all_ratings/?userID=${userID}`).then((response) => {
      setAllRatings({
        ratings: response.data || [],
      });
    });
  }

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>Profile</h2>
        </div>
        <div className="profile__ratings">
          {allRatings.ratings.map((rating) => (
            <div className="profile__rating" key={rating[0]}>
              <div className="profile__song-info">
                <h3>{searchResults.title}</h3>
                <p>{searchResults.artist}</p>
                <p>{searchResults.album}</p>
                <p>{searchResults.genre.join(", ")}</p>
              </div>
              <div className="profile__rating-score">{rating[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import "./Song.css";
import "./Home.css";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import axios from "axios";
function Song() {
  const { id } = useParams();
  const [searchResults, setSearchResults] = useState({ title: [], artist: [], album: [], genre: [] });
  
  function getSongInfo(id) {
      axios
        .get(`http://localhost:5000/search_id/${id}`)
        .then((response) => {
          setSearchResults({
            title: response.data[0][1] || [],
            artist: response.data[0][2] || [],
            album: response.data[0][3] || [],
            genre: response.data[0][4] || []
          });
        });
    }
    useEffect(() => {
      getSongInfo(id);
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
        <p>Genres: {searchResults.genre}  </p>
        <p> ______  </p>
        </div>
      </div>
        <Widgets className="widgets" />
      </div>
  )
}

export default Song
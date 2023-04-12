import React, { useEffect, useState } from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

function Widgets() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({ songs: [], artists: [], albums: [] });

  function search(searchValue) {
    setSearchValue(searchValue);
    axios
      .get(`http://localhost:5000/search2/?search=${searchValue}`)
      .then((response) => {
        setSearchResults({
          songs: response.data[0] || [],
          artists: response.data[1] || [],
          albums: response.data[2] || []
        });
      });
  }

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input
          value={searchValue}
          onChange={(event) => search(event.target.value)}
          placeholder=""
          type="text"
        />
      </div>
      <div className="widgets__widgetContainer">
      <h2>Songs</h2>
        <ul>
          {searchResults.songs.map((song, index) => (
            <li key={index}>{JSON.stringify(song)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Artists</h2>
        <ul>
          {searchResults.artists.map((artist, index) => (
            <li key={index}>{JSON.stringify(artist)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Albums</h2>
        <ul>
          {searchResults.albums.map((album, index) => (
            <li key={index}>{JSON.stringify(album)}</li>
          ))}
        </ul>
    </div>
    </div>
  );
  
}

export default Widgets;

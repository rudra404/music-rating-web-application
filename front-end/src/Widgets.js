import React, { useState } from "react";
import "./Widgets.css";
// import {
//   TwitterTimelineEmbed,
//   TwitterShareButton,
//   TwitterTweetEmbed,
// } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Link } from "react-router-dom";
function Widgets() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: [],
    albums: [],
  });

  function search(searchValue) {
    setSearchValue(searchValue);
    if (searchValue.trim().length > 1) {
      // Check if searchValue is not blank
      axios
        .get(`http://localhost:5050/search2/?search=${searchValue}`)
        .then((response) => {
          setSearchResults({
            songs: response.data[0] || [],
            artists: response.data[1] || [],
            albums: response.data[2] || [],
          });
        });
    } else {
      // If searchValue is blank, clear the search results
      setSearchResults({ songs: [], artists: [], albums: [] });
    }
  }
  function SearchResultItem({ result }) {
    return (
      <div>
        <p>
          {result[1]}, {result[2]}, {result[3]}
        </p>
        {/* Add any other fields you want to display here */}
      </div>
    );
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

      {(searchResults.songs.length > 0 ||
        searchResults.artists.length > 0 ||
        searchResults.albums.length > 0) && (
        <div className="widgets__widgetContainer">
          {searchResults.songs.length > 0 && (
            <>
              <h2>Songs</h2>
              {console.log(searchResults)}
              <ul>
                {searchResults.songs.map((song, index) => (
                  <Link to={`/song/${song[0]}`} key={index}>
                    <SearchResultItem result={song} />
                  </Link>
                ))}
              </ul>
            </>
          )}

          {searchResults.artists.length > 0 && (
            <>
              <h2>Artists</h2>
              <ul>
                {searchResults.artists.map((artist, index) => (
                  <Link to={`/song/${artist[0]}`} key={index}>
                    <SearchResultItem result={artist} />
                  </Link>
                ))}
              </ul>
            </>
          )}

          {searchResults.albums.length > 0 && (
            <>
              <h2>Albums</h2>
              <ul>
                {searchResults.albums.map((album, index) => (
                  <Link to={`/song/${album[0]}`} key={index}>
                    <SearchResultItem result={album} />
                  </Link>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Widgets;

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
  const [searchResults, setSearchResults] = useState([]);

  function search(searchValue) {
    setSearchValue(searchValue);
    axios
      .get(`http://localhost:5000/search2/?search=${searchValue}`)
      .then((response) => {
        console.log(response);
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

      {/* <div className="widgets__widgetContainer"> */}
      {/* <h2>What's happening</h2>

        <TwitterTweetEmbed tweetId={"858551177860055040"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="cleverqazi"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://facebook.com/cleverprogrammer"}
          options={{ text: "#reactjs is awesome", via: "cleverqazi" }}
        /> */}
    </div>
    // </div>
  );
}

export default Widgets;

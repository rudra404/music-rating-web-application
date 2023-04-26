import React, { useState, useEffect, useContext } from "react";
import "./Feed.css";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function Feed() {
  const { userID, authState } = useContext(AuthContext);
  const [feedData, setFeedData] = useState([]);

  function getFeedData() {
    if (authState == true) {
      axios
        .get(`http://localhost:5051/getFeed?userID=${userID}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            console.log(response.data);
            setFeedData(response.data);
          }
        });
    } else {
      axios.get(`http://localhost:5051/getFeedGeneric`).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          setFeedData(response.data);
        }
      });
    }
  }

  useEffect(() => {
    getFeedData();
  }, []);

  useEffect(() => {
    getFeedData();
  }, [authState]);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

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

  function ListPost({ result }) {
    return (
      <>
        {/* <h4>{result[0]}</h4> */}
        <ListSong result={result[0]} />

        <div className="userRating">
          <div className="profilecard userPostProfile">
            <div data-initials={result[3].charAt(0).toUpperCase()}></div>
            <div className="postUser">{result[3]}</div>
          </div>

          <div className="postUser">Rated</div>
          <div className="postRating" data-initials={result[1]}></div>
        </div>

        <div className="postDate">{timeSince(Date.parse(result[2]))} ago</div>
      </>
    );
  }

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <div className="feedContainer">
        {feedData &&
          feedData.map((post) => {
            return (
              <div className="search-result-links">
                <ListPost result={post} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Feed;

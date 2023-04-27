import React, { useState, useEffect, useContext } from "react";
import "./Feed.css";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Feed() {
  const { userID, authState } = useContext(AuthContext);
  const [feedData, setFeedData] = useState([]);
  const [notified, setNotified] = useState(false);

  async function getFeed() {
    setNotified(false);
    await axios
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
  }

  async function getGenericFeed() {
    await axios.get(`http://localhost:5051/getFeedGeneric`).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        setFeedData(response.data);
      }
    });
  }

  async function generateFeedData() {
    if (authState) {
      await getFeed(); // logged in
      // if logged in and have no feed
      console.log(feedData.length);
    } else {
      await getGenericFeed(); // not logged in
    }
  }

  useEffect(() => {
    if (feedData.length === 0 && authState && notified === false) {
      setNotified(true);
      notify();
      getGenericFeed();
    }
  }, [feedData]);

  useEffect(() => {
    generateFeedData();
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
            <div
              data-initials={result[3] && result[3].charAt(0).toUpperCase()}
            ></div>
            <div className="postUser">{result[3]}</div>
          </div>

          <div className="postUser">Rated</div>
          <div className="postRating" data-initials={result[1]}></div>
        </div>

        <div className="postDate">{timeSince(Date.parse(result[2]))} ago</div>
      </>
    );
  }

  function GenericPost({ result }) {
    return (
      <>
        {/* <h4>{result[0]}</h4> */}
        <ListSong result={result[0]} />

        <div className="userRating">
          <div className="postUser">Rated by listeners</div>
          <div className="postRating" data-initials={result[1]}></div>
        </div>
      </>
    );
  }

  const notify = () => {
    toast("You are not following anyone!");
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      {/* {feedData.length === 0 && <div>You are not following anyone</div>} */}

      <div className="feedContainer">
        {feedData &&
          feedData.map((post) => {
            return (
              <div className="search-result-links">
                {authState == true ? (
                  <>
                    {notified ? (
                      <GenericPost result={post} />
                    ) : (
                      <ListPost result={post} />
                    )}
                  </>
                ) : (
                  <GenericPost result={post} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Feed;

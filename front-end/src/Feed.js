import React, { useState, useEffect, useContext } from "react";
import "./Feed.css";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function Feed() {
  const { userID, authState } = useContext(AuthContext);
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
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
  }, [authState]);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <div className="feedContainer">
        {feedData &&
          feedData.map((post) => {
            return (
              <div>
                {post[0]}
                <br />
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Feed;

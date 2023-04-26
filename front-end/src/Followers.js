import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import Widgets from "./Widgets";
import axios from "axios";

export default function Followers() {
  const { userID, authState } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [numOfFolowers, setNumOfFolowers] = useState([]);

  async function getFollowers() {
    const data = { userID: userID };
    await axios
      .post("http://localhost:3002/followings/getFollowers", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFollowers(response.data);
          console.log(response.data);
          setNumOfFolowers(response.data.size);
        }
      });
  }

  useEffect(() => {
    getFollowers();
  }, [authState]);

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>Followers</h2>
          <>{numOfFolowers}</>
        </div>

        {followers &&
          followers.map((follower) => {
            <div>{follower}</div>;
          })}
      </div>

      <Widgets className="widgets" />
    </div>
  );
}

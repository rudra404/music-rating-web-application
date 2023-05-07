import React, { useEffect, useState, useContext } from "react";
import "./User.css";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Widgets from "./Widgets";
import { Link } from "react-router-dom";

const userMicroserviceUrl = process.env.USERMICROSERVICE_URL || "http://localhost:3002";
const musicMicroserviceUrl = process.env.MUSICMICROSERVICE_URL || "http://localhost:5050";

export default function User() {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [user, setUser] = useState();
  const [allRatings, setAllRatings] = useState({ ratings: [] });
  const { userID } = useContext(AuthContext);
  function getUser() {
    const data = { userID: id };
    axios
      .post(`${userMicroserviceUrl}/auth/getUser`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          response.data.email = [];
          setUser(response.data);
        }
      });
  }

  function getFollowers() {
    const data = { userID: id };
    axios
      .post(`${userMicroserviceUrl}/followings/getFollowers`, data, {
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
        }
      });
  }

  async function getFollowings() {
    const data = { userID: id };
    axios
      .post(`${userMicroserviceUrl}/followings/getFollowings`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFollowings(response.data);
          console.log(response.data);
        }
      });
  }

  async function getRatings() {
    const response = await axios.get(
      `${musicMicroserviceUrl}/all_ratings/?userID=${id}`
    );
    const ratings = response.data || [];
    const updatedRatings = [];
    for (let i = 0; i < ratings.length; i++) {
      const id = ratings[i][0];
      const rating = ratings[i][1];
      const songInfoResponse = await axios.get(
        `${musicMicroserviceUrl}/search_id/${id}`
      );
      const songInfo = songInfoResponse.data[0];
      updatedRatings.push([
        songInfo[0],
        songInfo[1],
        songInfo[2],
        songInfo[3],
        rating,
      ]);
    }
    setAllRatings({
      ratings: updatedRatings,
    });
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
  async function followUser() {
    const userData = { userID: userID };
    var follower = []
    await axios
      .post(`${userMicroserviceUrl}/auth/getUser`, userData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          follower = response.data.username;
        }
      });
    const data = {user: user.username, follower: follower}
    await axios
      .post(`${userMicroserviceUrl}/followings/follow`, data, {
       headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    alert("User followed!");
  }

  useEffect(() => {
    getUser();
    getFollowings();
    getFollowers();
    getRatings();
  }, [id]);

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__header">
          <h2>Profile</h2>
        </div>
        <ProfileCard
          user={user}
          followers={followers}
          followings={followings}
          functional={false}
        />
         <button className="bubble-button" onClick={followUser}>Follow User</button>
        <h2>Their ratings:</h2>
        <div className="myRatings">
          <div className="ratingHeadings">
            <h3>Songs</h3>
            <h3>Ratings</h3>
          </div>

          {allRatings.ratings.map((rating, index) => (
            <div className="listRatings">
              <Link
                to={`/song/${rating[0]}`}
                key={index}
                className="search-result-links"
              >
                <ListSong result={rating} />
                {/* <SearchResultItem
                        result={song}
                        className="search-result-items"
                      /> */}
              </Link>
              <div className="rating">{rating[4]}</div>
            </div>
          ))}
        </div>
      </div>

      <Widgets className="widgets" />
    </div>
  );
}

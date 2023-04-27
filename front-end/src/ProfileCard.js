import React, { useState } from "react";
import "./ProfileCard.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";

export default function ProfileCard(props) {
  const navigate = useNavigate();
  const numOfFolowers = props.followers && props.followers.length;
  const numOfFolowings = props.followings && props.followings.length;
  const user = props.user;
  return (
    <div className="container">
      <div className="profilecard">
        <div
          data-initials={user && user.username.charAt(0).toUpperCase()}
        ></div>
        <div>
          <h3>{user && user.username}</h3>
          <div className="email">{user && user.email}</div>
          <div className="userFollowList">
            <div className="followList">
              <div
                className="followers"
                onClick={
                  props.functional ? () => navigate("/followers") : undefined
                }
              >
                {numOfFolowers}
              </div>
              <div>Followers</div>
            </div>

            <div className="followList">
              <div
                className="followers"
                onClick={
                  props.functional ? () => navigate("/followings") : undefined
                }
              >
                {numOfFolowings}
              </div>
              <div>Following</div>
            </div>
          </div>
        </div>
      </div>
      {/* <Button
        variant="outlined"
        className="bestButtonLight"
        fullWidth
        input
        type="submit"
      >
        Change username
      </Button> */}
    </div>
  );
}

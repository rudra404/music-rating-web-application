import React, { useState } from "react";
import "./ProfileCard.css";

export default function ProfileCard(props) {
  const numOfFolowers = props.followers.length;
  const user = props.user;
  console.log(props);
  return (
    <div className="container">
      <div className="profilecard">
        <div
          data-initials={user && user.username.charAt(0).toUpperCase()}
        ></div>
        <div>
          <h3>{user && user.username}</h3>
          <div className="email">{user && user.email}</div>
          <div className="followers">{numOfFolowers}</div>
          <div>Followers</div>
        </div>
      </div>
    </div>
  );
}

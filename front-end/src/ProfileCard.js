import React, { useState } from "react";
import "./ProfileCard.css";

export default function ProfileCard(props) {
  const numOfFolowers = props.followers.length;
  const user = props.user;
  console.log(props);
  return (
    <>
      {user.username}
      <br />
      {user.email}
      <br />
      Followers: {numOfFolowers}
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./Home.css";
import { AuthContext } from "./helpers/AuthContext";

function Home() {
  const { userID } = useContext(AuthContext);

  useEffect(() => {}, [userID]);

  return (
    <div className="home">
      <Feed className="feed" />
      <Widgets className="widgets" />
    </div>
  );
}

export default Home;

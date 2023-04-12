import React from "react";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Feed className="feed" />
      <Widgets className="widgets" />
    </div>
  );
}

export default Home;

import React from "react";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./Home.css";
import Header from './Header';

function Home() {
  return (
    <div className="home">
      <Header className="main_header" />
      <Feed className="feed" />
      <Widgets className="widgets" />
    </div>
  );
}

export default Home;

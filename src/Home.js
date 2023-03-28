import React from "react";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Home() {
  return (
    <div className="app">
      <Feed />
      <Widgets />
    </div>
  );
}

export default Home;

import React from 'react'
import "./Song.css";
import "./Home.css";
import Widgets from "./Widgets";

function Song() {
  return (
    <div className="home">
            <div className="song__header">
        <h2>Song</h2>
        <div className="song"> 
        </div>
      </div>
        <Widgets className="widgets" />
      </div>
  )
}

export default Song
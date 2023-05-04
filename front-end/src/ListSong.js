import React from "react";
import "./ListSong.css";

export default function ListSong(props) {
  return (
    <div className="list-song">
      <div className="songtitle">
        <h3>{props.result[1]}</h3>
      </div>
      <div className="artist">{props.result[2]}</div>
      <div className="album">{props.result[3]}</div>
    </div>
  );
}

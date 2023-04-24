import React from "react";
import "./ListSong.css";

function ListSong(props) {
  return (
    <div className="list-song">
      <div className="songtitle">
        <h3>{props.result[1]}</h3>
      </div>
      <div className="artist">{props.result[2]}</div>
      <div className="album">{props.result[3]}</div>
      {/* {props.result[1]}, {props.result[2]}, {props.result[3]} */}
    </div>
  );
}

export default ListSong;

import React, { useContext, useEffect, useState } from "react";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./Home.css";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { userID, authState } = useContext(AuthContext);
  const [feed, setFeed] = useState([]);

  useEffect(() => {}, [userID]);

  return (
    <div className="home">
      <Feed className="feed" />
      <Widgets className="widgets" />
    </div>
  );
}

export default Home;

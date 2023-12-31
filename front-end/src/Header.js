import React, { useContext } from "react";
import "./Header.css";
import logo from "./logo.png";
import { Button } from "@material-ui/core";
import { AuthContext } from "./helpers/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="main_header">
      <div className="header_content" onClick={() => navigate("/")}>
        <img className="logo" src={logo} alt="BestListens logo" />
        <h1>BestListens</h1>
      </div>

      {authState ? (
        <Button
          variant="outlined"
          className="login__button"
          onClick={handleLogout}
          fullWidth
        >
          Log out
        </Button>
      ) : (
        <Button
          href="/login"
          variant="outlined"
          className="login__button"
          fullWidth
        >
          Log in
        </Button>
      )}
    </div>
  );
}


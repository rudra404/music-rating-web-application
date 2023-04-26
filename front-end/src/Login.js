import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./Login.css";
import "./Home.css";

function Login() {
  const navigate = useNavigate();

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const { authState, setAuthState, setUserID } = useContext(AuthContext);

  const login = (username, password) => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3002/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("userID", response.data.userID);
        setAuthState(true);
        setUserID(response.data.userID);
        setIsSubmitted(true);
        navigate("/");
      }
    });
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    login(uname.value, pass.value);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="uname"
            // value={username}
            // onChange={(event) => setUsername(event.target.value)}
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            // value={password}
            // onChange={(event) => setPassword(event.target.value)}
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <Button
          variant="outlined"
          className="bestButton"
          fullWidth
          input
          type="submit"
        >
          Log in
        </Button>
        <div class="container signin">
          <p>
            Don't have an account? <a href="/register">Register</a>.
          </p>
        </div>
        {/* <div className="button-container">
          <input type="submit" />
        </div> */}
      </form>
    </div>
  );
  return (
    <div className="home">
      {authState ? (
        navigate("/")
      ) : (
        <div className="login">
          <div className="login__header">
            <h2>Login</h2>

            <div className="apps">
              <div className="login-form">
                <div className="title">Log In</div>
                {isSubmitted ? (
                  <div>User is successfully logged in</div>
                ) : (
                  renderForm
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

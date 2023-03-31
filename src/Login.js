import React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import "./Home.css";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
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
          <input type="email" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <Button
          variant="outlined"
          className="sidebar__tweet"
          fullWidth
          input
          type="submit"
        >
          Log in
        </Button>
        <p>
          Please register <a href="/register">here</a>
        </p>
        {/* <div className="button-container">
          <input type="submit" />
        </div> */}
      </form>
    </div>
  );
  return (
    <div className="home">
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
    </div>
  );
}

export default Login;

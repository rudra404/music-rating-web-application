import React, { useState } from "react";
import "./Register.css";
import "./Home.css";
import { Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    username: "", //email
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8)
      .max(25)
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const validateUsername = (username) => {
    console.log(username.replace(/ /g, ""));
    return username.replace(/ /g, "");
  };

  const onSubmit = (data) => {
    let uname = validateUsername(data.username);
    let addInitialPass = { username: uname, password: data.password };

    addUser(addInitialPass);
  };

  async function addUser(data) {
    await axios
      .post("http://localhost:3002/auth/createUser", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response);
          console.log("User added");
          addPassword(data.username, data.password);
          console.log("Registration Complete");
          navigate("/login");
        }
      });
  }

  async function addPassword(username, password) {
    let userPassword = { username: username, password: password };
    await axios
      .post("http://localhost:3002/auth/addPassword", userPassword)
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="home">
      <div className="register">
        <div className="register__header">
          <h2>Register</h2>
          <p>Please fill in this form to create an account.</p>
          <br />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="formContainer">
              <label for="email">
                <b>Email</b>
              </label>
              <br />
              <ErrorMessage name="username" component="span" />
              {/* <label>Email: </label> */}
              <Field
                autoComplete="off"
                id="email"
                name="username"
                type="email"
                placeholder="me@example.com"
              />
              <label for="password">
                <b>Password</b>
              </label>
              <br />
              <ErrorMessage name="password" component="span" />
              <Field
                autoComplete="off"
                type="password"
                id="psw"
                name="password"
                placeholder="********"
              />
              <label for="passwordConfirm">
                <b>Confirm Password</b>
              </label>
              <br />
              <ErrorMessage name="passwordConfirm" component="span" />
              <Field
                autoComplete="off"
                type="password"
                id="psw"
                name="passwordConfirm"
                placeholder="********"
              />
              <Button
                variant="outlined"
                className="sidebar__tweet"
                fullWidth
                input
                type="submit"
              >
                Register
              </Button>
            </Form>
          </Formik>

          <div class="container signin">
            <p>
              Already have an account? <a href="/login">Sign in</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

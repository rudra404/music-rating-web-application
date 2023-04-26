import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import Home from "./Home";
import Messages from "./Messages";
import MyRates from "./MyRates";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import Song from "./Song";
import Header from "./Header";
function App() {
  const [authState, setAuthState] = useState(false);
  const [userID, setUserID] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
      setUserID(localStorage.getItem("userID"));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    setAuthState(false);
    setUserID("");
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/myRates" element={<MyRates />} />
        <Route path="/myProfile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/song/:id" element={<Song />} />
      </Route>
    )
  );

  return (
    // BEM
    <div className="app">
      <AuthContext.Provider
        value={{ authState, setAuthState, logout, userID, setUserID }}
      >
        <RouterProvider router={router} />
        {console.log(authState)}
      </AuthContext.Provider>
      {/* <Sidebar /> */}
      {/* <Feed />
      <Widgets /> */}
    </div>
  );
}

const Root = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default App;

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
import User from "./User";
import Login from "./Login";
import Register from "./Register";
import Song from "./Song";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Followers from "./Followers";
import Followings from "./Followings";

const userMicroserviceUrl = process.env.USERMICROSERVICE_URL || "http://localhost:3002";

function App() {
  const [authState, setAuthState] = useState(false);
  const [userID, setUserID] = useState(false);

  useEffect(() => {
    axios
      .get(`${userMicroserviceUrl}/auth/auth`, {
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
        <Route path="/followers" element={<Followers />} />
        <Route path="/followings" element={<Followings />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/user/:id" element={<User />} />
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
      <ToastContainer />
    </>
  );
};

export default App;

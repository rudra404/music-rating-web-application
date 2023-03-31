import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
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

function App() {
  const [authState, setAuthState] = useState(false);

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
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/myrates" element={<MyRates />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return (
    // BEM
    <div className="app">
      <AuthContext.Provider value={{ authState, setAuthState, logout }}>
        <RouterProvider router={router} />
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
      <div>
        <Sidebar />
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;

import React from "react";
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
import Home from "./Home";
import Messages from "./Messages";
import MyRates from "./MyRates";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/myrates" element={<MyRates />} />
      </Route>
    )
  );

  return (
    // BEM
    <div className="app">
      <RouterProvider router={router} />
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

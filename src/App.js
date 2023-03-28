import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import Home from "./Home";
import Messages from "./Messages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path= "/" element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path= "/messages" element={<Messages/>}/>
      </Route>
    )
  )
  
  return (
    // BEM
    <div className="app">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;

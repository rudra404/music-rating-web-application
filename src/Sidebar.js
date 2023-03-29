import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

function Sidebar() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <div className="sidebar">
      {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
      <SidebarOption active Icon={HomeIcon} link="/" text="Home" />
      <SidebarOption Icon={MailOutlineIcon} link="/messages" text="Messages" />
      <SidebarOption
        Icon={BookmarkBorderIcon}
        text="My rates"
        link="/myrates"
      />
      <SidebarOption Icon={PermIdentityIcon} link="profile" text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />
      {/* <SidebarOption Icon={ListAltIcon} text="Lists" /> */}
      {/* <SidebarOption Icon={SearchIcon} text="Explore" /> */}
      {/* <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" /> */}

      {/* Button -> Tweet */}
      <Button href= "/login" variant="outlined" className="sidebar__tweet" fullWidth>
        Log in
      </Button>
    </div>
  );
}

export default Sidebar;

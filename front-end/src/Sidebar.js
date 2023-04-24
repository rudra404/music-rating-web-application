import React, { useContext } from "react";
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
import { AuthContext } from "./helpers/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const pathname = window.location.pathname; //returns the current url minus the domain name
  const { authState, logout } = useContext(AuthContext);
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div className="sidebar">
      {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
      <SidebarOption
        active={pathname == "/"}
        Icon={HomeIcon}
        link="/"
        text="Home"
      />
      {/* <SidebarOption Icon={MailOutlineIcon} link="/messages" text="Messages" /> */}
      {authState && (
        <>
          <SidebarOption
            active={pathname == "/myRates"}
            Icon={BookmarkBorderIcon}
            text="My rates"
            link="/myRates"
          />
          <SidebarOption
            active={pathname == "/myProfile"}
            Icon={PermIdentityIcon}
            link="/myProfile"
            text="My profile"
          />
        </>
      )}
      {/* <SidebarOption Icon={MoreHorizIcon} text="More" /> */}
      {/* <SidebarOption Icon={ListAltIcon} text="Lists" /> */}
      {/* <SidebarOption Icon={SearchIcon} text="Explore" /> */}
      {/* <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" /> */}

      {/* Button -> Tweet */}
      {/* {authState ? (
        <Button
          // href="/login"
          variant="outlined"
          className="bestButton"
          onClick={handleLogout}
          fullWidth
        >
          Log out
        </Button>
      ) : (
        <Button
          href="/login"
          variant="outlined"
          className="bestButton"
          fullWidth
        >
          Log in
        </Button>
      )} */}
    </div>
  );
}

export default Sidebar;

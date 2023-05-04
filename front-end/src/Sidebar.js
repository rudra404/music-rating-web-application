import React, { useContext } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { AuthContext } from "./helpers/AuthContext";

export default function Sidebar() {
  const pathname = window.location.pathname; //returns the current url minus the domain name
  const { authState } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <SidebarOption
        active={pathname === "/"}
        Icon={HomeIcon}
        link="/"
        text="Home"
      />
      {authState && (
        <>
          <SidebarOption
            active={pathname === "/myRates"}
            Icon={BookmarkBorderIcon}
            text="My rates"
            link="/myRates"
          />
          <SidebarOption
            active={pathname === "/myProfile"}
            Icon={PermIdentityIcon}
            link="/myProfile"
            text="My profile"
          />
        </>
      )}
    </div>
  );
}


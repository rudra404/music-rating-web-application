import React from "react";
import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";

function SidebarOption({ active, text, Icon, link }) {
  const navigate = useNavigate();
  function handleClick() {
    if (link) {
      window.location.href = link;
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`sidebarOption ${active && "sidebarOption--active"}`}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;

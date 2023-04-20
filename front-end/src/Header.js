import React from 'react';
import './Header.css';
import logo from './logo.png';


function Header() {
  return (
    <div className="main_header">
      <div className="header_content">
        <img src={logo} alt="BestListens logo" />
        <h1>BestListens</h1>
      </div>
      <div>Other header content here</div>
    </div>
  );
}


export default Header;

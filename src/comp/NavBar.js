import React, { useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">SymptoScan</div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/account">Account</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

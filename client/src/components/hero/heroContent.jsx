import React from "react";
import "./heroContent.css";
import logo from "../../assets/homePage/logo.png";
import { NavLink } from "react-router-dom";

function heroContent() {
  return (
    <>
      <div className="top-hero-header">
        <div className="logo">
        <img src={logo} className="hero-logo" alt="Logo" />
        </div>
        <nav className="hero-nav">
          <NavLink to="/" end>HOME</NavLink>
          <NavLink to="/marketplace">MARKETPLACE</NavLink>
          <NavLink to="/farms">FARMS</NavLink>
          <NavLink to="/about">ABOUT US</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
        </nav>
        {/* <div className="hero-search">
          <input type="text" placeholder="Search for products" />
        </div> */}
      </div>
    </>
  );
}

export default heroContent;

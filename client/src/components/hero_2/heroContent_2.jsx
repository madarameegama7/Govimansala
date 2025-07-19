import React from "react";
import "./heroContent_2.css";
import logo from "../../assets/homePage/logo.png";
import { NavLink, useLocation } from "react-router-dom";

function HeroContent() {
  const location = useLocation();
  const isMarketplaceSection = ['/marketplace', '/vegetables', '/fruits'].includes(location.pathname);

  return (
    <>
      <div className="top-hero-header">
        <div className="logo">
        <img src={logo} className="hero-logo" alt="Logo" />
        </div>
        <nav className="hero-nav">
          <NavLink to="/" end>HOME</NavLink>
          <NavLink 
            to="/marketplace" 
            className={({ isActive }) => isActive || isMarketplaceSection ? 'active' : ''}
          >
            MARKETPLACE
          </NavLink>
          <NavLink to="/farms">FARMS</NavLink>
          <NavLink to="/orders">ORDERS</NavLink>
          <NavLink to="/BuyerAnalytics">ANALYTICS</NavLink>
        </nav>
      </div>
    </>
  );
}

export default HeroContent;

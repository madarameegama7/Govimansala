import React from "react";
import "./buyerHeroContent.css";
import logo from "./logo.png";
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
          <NavLink to="/buyer/Home" end>HOME</NavLink>
          <NavLink 
            to="/buyer/Marketplace" 
            className={({ isActive }) => isActive || isMarketplaceSection ? 'active' : ''}
          >
            MARKETPLACE
          </NavLink>
          <NavLink to="/buyer/Farms">FARMS</NavLink>
          <NavLink to="/buyer/Orders">ORDERS</NavLink>
          <NavLink to="/buyer/BuyerAnalytics">ANALYTICS</NavLink>
          <NavLink to="/buyer/Cart">CART</NavLink>
        </nav>
      </div>
    </>
  );
}

export default HeroContent;

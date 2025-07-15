import React from "react";
import "./vendorHeroContent.css";
import logo from "../../../assets/homePage/logo.png";
import { NavLink, useLocation } from "react-router-dom";

function VendorHeroContent() {
  const location = useLocation();
  const isMarketplaceSection = ['/marketplace', '/vegetables', '/fruits'].includes(location.pathname);

  return (
    <>
      <div className="top-hero-header">
        <div className="logo">
        <img src={logo} className="hero-logo" alt="Logo" />
        </div>
        <nav className="hero-nav">
          <NavLink to="/vendor/home" end>HOME</NavLink>
          <NavLink 
            to="/vendor/marketplace" 
            className={({ isActive }) => isActive || isMarketplaceSection ? 'active' : ''}
          >
            MARKETPLACE
          </NavLink>
          <NavLink to="/vendor/order">MY ORDERS</NavLink>
          <NavLink to="/vendor/about">ABOUT US</NavLink>
          <NavLink to="/vendor/contact">CONTACT</NavLink>
        </nav>
      </div>
    </>
  );
}

export default VendorHeroContent;

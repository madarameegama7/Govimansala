import React from "react";
import VendorHero from "../components/hero/vendor-hero/vendorHeroContent";
import HeaderContent from "../components/header/headerContent";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <>
      <HeaderContent />
      <VendorHero />
      <Outlet />
      <Footer />
    </>
  );
};

export default VendorLayout;

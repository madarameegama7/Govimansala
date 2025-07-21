import React from "react";
import HeroContent from "../components/hero/buyer-hero/buyerHeroContent";
import HeaderContent from "../components/header/headerContent";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <>
      <HeaderContent />
      <HeroContent />
      <Outlet />
      <Footer />
    </>
  );
};

export default BuyerLayout;

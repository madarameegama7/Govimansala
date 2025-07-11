import React from "react";
import HeaderContent from "../components/header/headerContent";
import HeroContent from "../components/hero/heroContent";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <HeaderContent />
      <HeroContent />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;

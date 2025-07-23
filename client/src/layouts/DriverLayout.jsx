import React from "react";
import HeaderContent from "../components/header/headerContent";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const DriverLayout = () => {
  return (
    <>
      <HeaderContent />
      <Outlet />
      <Footer />
    </>
  );
};

export default DriverLayout;

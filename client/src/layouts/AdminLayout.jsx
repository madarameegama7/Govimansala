import React from "react";

import AdminHeroContent from "../components/hero/admin-hero/AdminHeroContent";
import HeaderContent from "../components/header/headerContent";
import AdminFooter from "../components/footer/AdminFooter";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <HeaderContent />
      <AdminHeroContent />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
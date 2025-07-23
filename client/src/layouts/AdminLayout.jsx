import React from "react";

import AdminHeroContent from "../components/hero/admin-hero/AdminHeroContent";
import AdminFooter from "../components/footer/AdminFooter";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminHeroContent />
      <Outlet />
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
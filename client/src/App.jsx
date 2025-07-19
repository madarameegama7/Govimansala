import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Components
import PrivateRoute from "./components/privateRoute";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import VendorLayout from "./layouts/VendorLayout";

// Pages
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Marketplace from "./pages/Marketplace";
import Vegetables from "./pages/vegetables";
import Fruits from "./pages/fruits";
import MoreDetails from "./pages/MoreDetails";
import Home from "./pages/Home";
import NewHome from "./pages/DefaultHomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Buyer from "./pages/Buyer/Buyer";
import Admin from "./pages/Admin/Admin";
import Vendor from "./pages/Vendor/Vendor";
import Driver from "./pages/Driver/Driver";
import Farms from "./pages/Farms";
import FarmPage from "./pages/FarmPage";
import VendorOrder from "./pages/Vendor/VendorOrder";
import VendorMarket from "./pages/Vendor/VendorMarketPlace";
import BuyerAnalytics from "./pages/analytics";
import Orders from "./pages/orders";
import EditProfile from "./pages/editProfile"; 
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<NewHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/defaultHome" element={<NewHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/moreDetails" element={<MoreDetails />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/FarmPage" element={<FarmPage />} />
          <Route path="/BuyerAnalytics" element={<BuyerAnalytics />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* VENDOR ROUTES */}
        <Route
          element={
            <PrivateRoute allowedRoles={["VENDOR"]}>
              <VendorLayout />
            </PrivateRoute>
          }
        >
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendor/home" element={<NewHome />} />
          <Route path="/vendor/marketplace" element={<VendorMarket />} />
          <Route path="/vendor/order" element={<VendorOrder />} />
          <Route path="/vendor/about" element={<AboutUs />} />
          <Route path="/vendor/contact" element={<Contact />} />
          {/* Add more vendor-only routes here */}
        </Route>

        {/* BUYER ROUTE */}
        <Route
          path="/buyer"
          element={
            <PrivateRoute allowedRoles={["BUYER"]}>
              <PublicLayout />
              <Buyer />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <PublicLayout />
              <Admin />
            </PrivateRoute>
          }
        />

        {/* DRIVER ROUTE */}
        <Route
          path="/driver"
          element={
            <PrivateRoute allowedRoles={["DRIVER"]}>
              <PublicLayout />
              <Driver />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

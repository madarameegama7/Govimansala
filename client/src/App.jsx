import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Components
import PrivateRoute from "./components/privateRoute";
import { DriverLocationProvider } from "./contexts/DriverLocationContext";

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
import Driver from "./pages/Driver/DriverHome";
import DriverProfile from "./pages/Driver/DriverProfile";
import OrderDashboard from "./pages/Driver/OrderDashboard";
import NavigationPage from "./pages/Driver/NavigationPageTest";
import Farms from "./pages/Farms";
import FarmPage from "./pages/FarmPage";
import VendorOrder from "./pages/Vendor/VendorOrder";
import VendorMarket from "./pages/Vendor/VendorMarketPlace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<NewHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/defaultHome" element={<NewHome />} />
          <Route path="/driverhome" element={
            <DriverLocationProvider>
              <Driver />
            </DriverLocationProvider>
          } />
          <Route path="/orderdashboard" element={
            <DriverLocationProvider>
              <OrderDashboard />
            </DriverLocationProvider>
          } />
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
        
        {/* DRIVER HOME ROUTE */}
        <Route
          path="/driverhome"
          element={
            <PrivateRoute allowedRoles={["DRIVER"]}>
              <DriverLocationProvider>
                <Driver />
              </DriverLocationProvider>
            </PrivateRoute>
          }
        />
        
        {/* DRIVER PROFILE ROUTE */}
        <Route
          path="/driver/profile"
          element={
            <PrivateRoute allowedRoles={["DRIVER"]}>
              <DriverProfile />
            </PrivateRoute>
          }
        />
        
        {/* ORDER DASHBOARD ROUTE */}
        <Route
          path="/order-dashboard"
          element={
            <PrivateRoute allowedRoles={["DRIVER"]}>
              <DriverLocationProvider>
                <OrderDashboard />
              </DriverLocationProvider>
            </PrivateRoute>
          }
        />
        
        {/* NAVIGATION PAGE ROUTE */}
        <Route
          path="/driver-navigation"
          element={
            <PrivateRoute allowedRoles={["DRIVER"]}>
              <DriverLocationProvider>
                <NavigationPage />
              </DriverLocationProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

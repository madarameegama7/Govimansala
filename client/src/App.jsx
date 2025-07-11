import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderContent from "./components/header/headerContent";
import HeroContent from "./components/hero/heroContent";
import Footer from "./components/footer/footer";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Marketplace from "./pages/Marketplace";
import Vegetables from "./pages/vegetables";
import Fruits from "./pages/fruits";
import MoreDetails from "./pages/MoreDetails";
import Home from "./pages/Home";
import NewHome from "./pages/DefaultHomePage";
import "../index.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PrivateRoute from "./components/privateRoute";
import Buyer from "./pages/Buyer/Buyer";
import Admin from "./pages/Admin/Admin";
import Vendor from "./pages/Vendor/Vendor";
import Driver from "./pages/Driver/Driver";
import Farms from "./pages/Farms";
import FarmPage from "./pages/FarmPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <NewHome />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/defaultHome"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <NewHome />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/marketplace"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Marketplace />
              <Footer />
            </>
          }
        />
        <Route
          path="/vegetables"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Vegetables />
              <Footer />
            </>
          }
        />
        <Route
          path="/fruits"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Fruits />
              <Footer />
            </>
          }
        />
        <Route
          path="/moreDetails"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <MoreDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <SignUp />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/farms"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <Farms />
              <Footer />
            </>
          }
        />
        <Route
          path="/FarmPage"
          element={
            <>
              <HeaderContent />
              <HeroContent />
              <FarmPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/buyer"
          element={
            <PrivateRoute allowedRoles={["BUYER"]}>
              <HeaderContent />
              <HeroContent />
              <Buyer />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendor"
          element={
            <PrivateRoute allowedRoles={["VENDOR"]}>
              <HeaderContent />
              <HeroContent />
              <Vendor />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <HeaderContent />
              <HeroContent />
              <Admin />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/driver"
          element={
            <PrivateRoute allowedRoles={["DRIVER"]}>
              <HeaderContent />
              <HeroContent />
              <Driver />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

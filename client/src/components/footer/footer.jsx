import React from "react";
import './footer.css';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and Description */}
        <div className="footer-col">
          <h2 className="footer-logo">
            Govi <span>Mansala</span>
          </h2>
          <p>
            Bringing the Best of the <br />
            Fields Directly to Your <br />
            Wholesale Business.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="footer-col">
          <h3>Quick Links</h3>
          <NavLink to={"/about"}>About Us</NavLink> <br />
          <NavLink to={"/contact"}>Contact</NavLink> <br />
          <NavLink to={"/marketplace"}>Marketplace</NavLink> <br />
          <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
        </nav>

        {/* Products */}
        <nav className="footer-col">
          <h3>Products</h3>
          <NavLink to={"/marketplace"}>Fruits</NavLink> <br />
          <NavLink to={"/marketplace"}>Vegetables</NavLink>
        </nav>

        {/* Social Media */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        <p>© 2025 Govi-Mansala. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
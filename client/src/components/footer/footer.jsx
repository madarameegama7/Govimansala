import React from "react";
import './footer.css';

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
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="../pages/AboutUs.jsx">About US</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Products */}
        <div className="footer-col">
          <h3>Products</h3>
          <ul>
            <li><a href="#">Vegetables</a></li>
            <li><a href="#">Organic Products</a></li>
          </ul>
        </div>

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
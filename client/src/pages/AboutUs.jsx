import React, { useEffect, useState } from 'react';
import '../pages/styles/AboutUs.css';
import { FaSeedling, FaTruck, FaUsers, FaLeaf, FaHandshake } from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll reveal
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section, .about-hero-content');
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          section.classList.add('visible');
        }
      });
    };

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Govi Mansala</h1>
          <p>Empowering farmers, connecting buyers, and revolutionizing Sri Lanka’s fresh produce industry.</p>
          <div className="about-hero-badge">100% Farmer-First Platform</div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="section">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          We aim to eliminate middlemen, ensure fair prices for farmers, and provide a consistent, quality supply chain for wholesale buyers across Sri Lanka.
        </p>

        <div className="features">
          <div className="feature-card">
            <FaSeedling className="feature-icon" size={36} />
            <div className="feature-title">Empower Farmers</div>
            <div className="feature-description">Connect directly to markets, reducing exploitation and increasing profitability.</div>
          </div>

          <div className="feature-card">
            <FaTruck className="feature-icon" size={36} />
            <div className="feature-title">Streamlined Logistics</div>
            <div className="feature-description">Efficient delivery from farms to markets with traceability and freshness guaranteed.</div>
          </div>

          <div className="feature-card">
            <FaUsers className="feature-icon" size={36} />
            <div className="feature-title">Community Focused</div>
            <div className="feature-description">We serve supermarkets, restaurants, and retailers with reliability and transparency.</div>
          </div>
        </div>
      </div>

      {/* Why Govi Mansala */}
      <div className="why-section">
        <div className="why-section-content">
          <div>
            <h2 className="why-title">Why Govi Mansala?</h2>
            <p className="why-text">
              We are transforming how agricultural products move in Sri Lanka — focusing on fairness, quality, and digital empowerment.
            </p>
            <div className="commitment-card">
              <FaLeaf className="commitment-icon" />
              <div>
                <div className="commitment-title">Sustainability First</div>
                <div className="commitment-description">Support for GAP and eco-friendly farming practices.</div>
              </div>
            </div>
            <div className="commitment-card">
              <FaHandshake className="commitment-icon" />
              <div>
                <div className="commitment-title">Direct Connection</div>
                <div className="commitment-description">Transparent platform linking farmers and bulk buyers directly.</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="src\assets\Marketplace\happyFarmer.jpg"
              alt="Farmer success"
              style={{ borderRadius: '20px', width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-box">
          <div className="cta-icon">
            <MdPhoneIphone size={36} />
          </div>
          <h2 className="cta-title">Partner With Us</h2>
          <p className="cta-text">Whether you're a supermarket, supplier, or logistics partner — Govi Mansala is your digital ally for fresh produce distribution.</p>
          <p className="cta-subtext">Let’s create a smarter, fairer food supply together!</p>
          <button className="cta-button">Join Now</button>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;


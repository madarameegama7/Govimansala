import React from 'react';
import '../pages/styles/AboutUs.css';
import logoImg from '../assets/homePage/logo.png'; 

function AboutUs() {
  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Home &gt; About Us</p>
      </div>

      {/* Content Sections */}
      <div className="about-content">

  {/* Who We Are */}
  <div className="about-card who-we-are">
    <h2 className="section-title large-title">Who We Are</h2>
    <div className="who-container">
      <div className="who-left">
        <p>
          Welcome to Govi Mansala, your trusted digital bridge between Sri Lanka’s hardworking farmers and wholesale buyers across the country.
        </p>
        <p>
          Our goal is to make fresh farm produce easily accessible, fairly priced, and efficiently delivered from fields to wholesale markets.
        </p>
      </div>
      <div className="who-right">
        <img src={logoImg} alt="Govi Mansala Logo" className="about-logo-large" />
      </div>
    </div>
  </div>

  {/* Our Mission */}
  <div className="about-card">
    <h2 className="section-title">Our Mission</h2>
    <div className="card-content">
      <p>
        Our mission is to empower farmers with technology and provide wholesale buyers with a transparent, direct, and dependable source of fresh produce.
      </p>
      <p>We aim to:</p>
      <ul>
        <li>Reduce middlemen and unfair price gaps</li>
        <li>Ensure consistent supply and timely delivery</li>
        <li>Promote GAP (Good Agricultural Practices)</li>
        <li>Digitize traditional market processes for better efficiency</li>
      </ul>
    </div>
  </div>

  {/* Why Govi Mansala */}
  <div className="about-card">
    <h2 className="section-title">Why Govi Mansala</h2>
    <div className="card-content">
      <p>
        In Sri Lanka, thousands of farmers struggle to find stable markets, while buyers often deal with inconsistent supply. FreshChain was built to change that. By using technology, we connect both ends of the chain directly, saving time, reducing waste, and ensuring both sides benefit fairly.
      </p>
      <p>We are committed to:</p>
      <ul>
        <li>Transparency in pricing and sourcing</li>
        <li>Reliability in orders and delivery</li>
        <li>Sustainability in operations and partnerships</li>
      </ul>
    </div>
  </div>

  {/* Join Us */}
  <div className="about-card">
    <h2 className="section-title">Join Us !</h2>
    <div className="card-content">
      <p>
        Whether you’re a supermarket, restaurant supplier, or retail chain — FreshChain is your trusted partner for sourcing fresh, quality products at scale.
      </p>
      <p>
        Together, let’s build a smarter, fairer, and more connected future for Sri Lanka’s food system.
      </p>
    </div>
  </div>
</div>
</div>
  );
}

export default AboutUs;

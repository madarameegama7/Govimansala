import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/DefaultHome.css";
import heroImage from "../assets/homePage/hero-image1.png";
import fruitsImage from "../assets/homePage/fruits.jpg";
import vegetablesImage from "../assets/homePage/vegetables.jpg";

function DefaultHome() {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const userTypes = [
    {
      id: "farmer",
      title: "Farmer",
      subtitle: "Grow & Sell Fresh Produce",
      icon: "🌾",
      bgColor: "#4CAF50",
      features: [
        "List your fresh produce directly to buyers",
        "Set competitive prices for your crops",
        "Track orders and manage inventory",
        "Connect with local vendors and retailers",
        "Access market insights and demand analytics"
      ],
      buttonText: "Start Farming Journey",
      role: "FARMER"
    },
    {
      id: "buyer",
      title: "Buyer",
      subtitle: "Source Quality Produce",
      icon: "🛒",
      bgColor: "#2196F3",
      features: [
        "Browse fresh produce from local farmers",
        "Compare prices and quality ratings",
        "Place bulk orders with wholesale pricing",
        "Schedule regular deliveries",
        "Build relationships with trusted suppliers"
      ],
      buttonText: "Start Shopping",
      role: "BUYER"
    },
    {
      id: "vendor",
      title: "Vendor",
      subtitle: "Retail Fresh Products",
      icon: "🏪",
      bgColor: "#FF9800",
      features: [
        "Source products from multiple farmers",
        "Manage your retail inventory",
        "Offer products to end consumers",
        "Track sales and profit margins",
        "Build customer loyalty programs"
      ],
      buttonText: "Open Your Store",
      role: "VENDOR"
    },
    {
      id: "driver",
      title: "Driver",
      subtitle: "Deliver Fresh Produce",
      icon: "🚚",
      bgColor: "#9C27B0",
      features: [
        "Accept delivery requests in your area",
        "Optimize routes for maximum efficiency",
        "Handle fresh produce with care",
        "Earn competitive delivery fees",
        "Build reputation with quality service"
      ],
      buttonText: "Start Delivering",
      role: "DRIVER"
    },
    {
      id: "admin",
      title: "Admin",
      subtitle: "Manage Platform",
      icon: "⚙️",
      bgColor: "#607D8B",
      features: [
        "Monitor platform activities and transactions",
        "Manage user accounts and permissions",
        "Analyze market trends and data",
        "Resolve disputes and issues",
        "Maintain system quality and standards"
      ],
      buttonText: "Access Dashboard",
      role: "ADMIN"
    }
  ];

  const handleUserTypeClick = (userType) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedUserType(selectedUserType === userType.id ? null : userType.id);
      setIsAnimating(false);
    }, 150);
  };

  const handleGetStarted = (role) => {
    navigate(`/signup?role=${role}`);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="default-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-name">Govimansala</span>
            </h1>
            <p className="hero-description">
              The ultimate platform connecting farmers, buyers, vendors, and drivers 
              in Sri Lanka's agricultural ecosystem. Fresh produce, fair prices, efficient delivery.
            </p>
            <div className="hero-actions">
              <button className="cta-button primary" onClick={() => navigate("/marketplace")}>
                Explore Marketplace
              </button>
              <button className="cta-button secondary" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Fresh produce from farm to table" />
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="user-types-section">
        <div className="section-header">
          <h2>Choose Your Role</h2>
          <p>Discover how Govimansala empowers each member of our agricultural community</p>
        </div>

        <div className="user-types-grid">
          {userTypes.map((userType) => (
            <div
              key={userType.id}
              className={`user-type-card ${selectedUserType === userType.id ? 'expanded' : ''} ${isAnimating ? 'animating' : ''}`}
              onClick={() => handleUserTypeClick(userType)}
              style={{ '--user-color': userType.bgColor }}
            >
              <div className="card-header">
                <div className="user-icon">{userType.icon}</div>
                <div className="user-info">
                  <h3>{userType.title}</h3>
                  <p>{userType.subtitle}</p>
                </div>
                <div className="expand-icon">
                  {selectedUserType === userType.id ? '−' : '+'}
                </div>
              </div>
              
              {selectedUserType === userType.id && (
                <div className="card-details">
                  <div className="features-list">
                    <h4>What you can do:</h4>
                    <ul>
                      {userType.features.map((feature, index) => (
                        <li key={index}>
                          <span className="feature-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className="get-started-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetStarted(userType.role);
                    }}
                  >
                    {userType.buttonText}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="benefits-section">
        <h2>Why Choose Govimansala?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🌱</div>
            <h3>Fresh & Local</h3>
            <p>Direct from farmers, ensuring the freshest produce with minimal transportation time</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Fair Pricing</h3>
            <p>Transparent pricing that benefits both farmers and buyers, eliminating middleman markups</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Efficient Delivery</h3>
            <p>Smart logistics network ensuring timely delivery of fresh produce to your doorstep</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h3>Community Driven</h3>
            <p>Building stronger relationships between farmers, vendors, and consumers</p>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="categories-preview">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          <div className="category-card" onClick={() => navigate("/marketplace")}>
            <img src={fruitsImage} alt="Fresh Fruits" />
            <div className="category-overlay">
              <h3>Fresh Fruits</h3>
              <p>Seasonal & Tropical</p>
            </div>
          </div>
          <div className="category-card" onClick={() => navigate("/vegetables")}>
            <img src={vegetablesImage} alt="Fresh Vegetables" />
            <div className="category-overlay">
              <h3>Fresh Vegetables</h3>
              <p>Organic & Conventional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Transform Agriculture?</h2>
          <p>Join thousands of farmers, buyers, vendors, and drivers who are already part of the Govimansala community</p>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={() => navigate("/signup")}>
              Join Now
            </button>
            <button className="cta-button outline" onClick={() => navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DefaultHome;

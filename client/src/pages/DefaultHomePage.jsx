import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/DefaultHome.css";
import heroImage from "../assets/homePage/hero-image1.png";
import securityImg from "../assets/Marketplace/security.png";
import analyticsImg from "../assets/Marketplace/analytics.jpg";
import pricingImg from "../assets/Marketplace/pricing.png";
import easyImg from "../assets/Marketplace/easy.png";
import organicImage from "../assets/Marketplace/organic.png";
import farmerImage from "../assets/Marketplace/farmer.jpg"; 
import buyerImage from "../assets/Marketplace/buyer.jpg"; 
import vendorImage from "../assets/Marketplace/vendor.jpg"; 
import driverImage from "../assets/Marketplace/driver.jpg"; 
import welcomeVideo from "../assets/Marketplace/welcome.mp4"; 

function NewHome() {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        console.log('Video loaded successfully');
      };

      const handleError = (e) => {
        console.error('Video failed to load:', e);
        setIsVideoLoaded(false);
        setVideoError(true);
      };

      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        console.log('Video can play');
      };

      const handleVideoEnded = () => {
        setIsPlaying(false);
        setShowWelcome(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('ended', handleVideoEnded);

      // Force load the video
      video.load();

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, []);

  const handleGetStarted = (role) => {
    navigate(`/signup?role=${role}`);
  };

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        setIsPlaying(true);
        setShowWelcome(false);
        
        // Unmute the video for sound
        videoRef.current.muted = false;
        
        // Play the video
        await videoRef.current.play();
        console.log('Video started playing');
      } catch (error) {
        console.error('Error playing video:', error);
        // If there's an error, fall back to muted playback
        videoRef.current.muted = true;
        try {
          await videoRef.current.play();
        } catch (fallbackError) {
          console.error('Fallback muted playback failed:', fallbackError);
          setVideoError(true);
        }
      }
    }
  };

  return (
    <div className="new-home">
      {/* Hero Section with Video */}
      <section className="hero-video-section">
        <div className="video-container">
          {!videoError ? (
            <video
              ref={videoRef}
              muted={!isPlaying}
              loop
              playsInline
              preload="metadata"
              className={`hero-video ${isVideoLoaded ? 'loaded' : ''}`}
              poster={heroImage}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: isPlaying ? 'block' : 'none'
              }}
            >
              <source src={welcomeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div 
              className="hero-video-fallback"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}
          <div className={`video-overlay ${isPlaying ? 'hidden' : ''}`}></div>
          
          {/* Welcome Content and Play Button Overlay */}
          {!isPlaying && !videoError && showWelcome && (
            <div className="play-button-overlay" onClick={handlePlayVideo}>
              <div className="welcome-content-wrapper">
                <h1 className="hero-title">
                  Welcome to <span className="brand-highlight">Govimansala</span>
                </h1>
                <p className="hero-subtitle">
                  Sri Lanka's Premier Agricultural Marketplace
                </p>
                <p className="hero-description">
                  Connecting farmers, buyers, vendors, and drivers in a sustainable ecosystem 
                  that brings fresh produce from farm to table efficiently and profitably.
                </p>
              </div>
              <div className="play-button-section">
                <div className="play-button">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="rgba(227, 255, 229, 0.9)" />
                    <path d="M32 25L55 40L32 55V25Z" fill="#2E7D32" />
                  </svg>
                </div>
                <p className="play-button-text">Click to play welcome video</p>
              </div>
            </div>
          )}
          
          {/* Video Controls when playing */}
          {isPlaying && !videoError && (
            <div className="video-controls-overlay">
              <button 
                className="video-control-btn pause-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                    setShowWelcome(true);
                  }
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="10" width="4" height="20" fill="#2E7D32" />
                  <rect x="24" y="10" width="4" height="20" fill="#2E7D32" />
                </svg>
              </button>
              <p className="pause-btn-text">Click to pause video</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Farmers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Buyers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Trusted Vendors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Reliable Drivers</div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="user-roles" className="user-roles-section">
        <div className="container">
          <div className="section-header">
            <h2>Empowering Every Role in Agriculture</h2>
            <p>Discover how Govimansala transforms each step of the agricultural supply chain</p>
          </div>

          <div className="roles-horizontal">
            {/* Farmer Role */}
            <div className="role-item farmer-role">
              <div className="role-content">
                <div className="role-text">
                  <h3>For Farmers</h3>
                  <p>
                    Transform your agricultural business by selling directly to buyers without middlemen. 
                    Set your own prices, manage inventory efficiently, and access real-time market insights. 
                    Our platform connects you with wholesale buyers, retailers, and vendors who value 
                    quality produce. Track your sales, build customer relationships, and grow your 
                    farming enterprise with tools designed specifically for Sri Lankan farmers.
                  </p>
                  <button 
                    className="role-cta-btn"
                    onClick={() => handleGetStarted('FARMER')}
                  >
                    Become a Farmer
                  </button>
                </div>
                <div className="role-image">
                  <img src={farmerImage} alt="Farmer working in field" />
                </div>
              </div>
            </div>

            {/* Buyer Role */}
            <div className="role-item buyer-role">
              <div className="role-content">
                <div className="role-text">
                  <h3>For Buyers</h3>
                  <p>
                    Source the freshest produce directly from verified local farmers at competitive prices. 
                    Browse through extensive catalogs, compare quality ratings, and place bulk orders 
                    with flexible payment terms. Enjoy wholesale pricing, scheduled deliveries, and 
                    build lasting relationships with trusted suppliers. Our platform ensures you get 
                    the best quality produce while supporting local agricultural communities.
                  </p>
                  <button 
                    className="role-cta-btn"
                    onClick={() => handleGetStarted('BUYER')}
                  >
                    Become a Buyer
                  </button>
                </div>
                <div className="role-image">
                  <img src={buyerImage} alt="Buyer selecting fresh produce" />
                </div>
              </div>
            </div>

            {/* Vendor Role */}
            <div className="role-item vendor-role">
              <div className="role-content">
                <div className="role-text">
                  <h3>For Vendors</h3>
                  <p>
                    Bridge the gap between farmers and consumers by creating a thriving retail business. 
                    Source diverse products from multiple farmers, manage your inventory with smart tools, 
                    and serve your local community with fresh produce. Track profit margins, analyze 
                    sales trends, and build customer loyalty through quality service. Perfect for shop 
                    owners, market vendors, and retail entrepreneurs.
                  </p>
                  <button 
                    className="role-cta-btn"
                    onClick={() => handleGetStarted('VENDOR')}
                  >
                    Become a Vendor
                  </button>
                </div>
                <div className="role-image">
                  <img src={vendorImage} alt="Vendor at market stall" />
                </div>
              </div>
            </div>

            {/* Driver Role */}
            <div className="role-item driver-role">
              <div className="role-content">
                <div className="role-text">
                  <h3>For Drivers</h3>
                  <p>
                    Join our logistics network and earn competitive income delivering fresh produce 
                    across Sri Lanka. Accept delivery requests in your area, optimize routes for 
                    maximum efficiency, and build a reputation for reliable service. Our platform 
                    provides flexible working hours, fair compensation, and opportunities for bonuses. 
                    Help connect farms to tables while building your own transportation business.
                  </p>
                  <button 
                    className="role-cta-btn"
                    onClick={() => handleGetStarted('DRIVER')}
                  >
                    Become a Driver
                  </button>
                </div>
                <div className="role-image">
                  <img src={driverImage} alt="Driver delivering fresh produce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why we Choose Govimansala?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <img src={organicImage} alt="Fresh & Local" />
              </div>
              <h4>Fresh & Local</h4>
              <p>Direct sourcing from local farmers ensures maximum freshness and supports communities</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src={pricingImg} alt="Fair Pricing" />
              </div>
              <h4>Fair Pricing</h4>
              <p>Transparent pricing that benefits everyone in the supply chain</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src={driverImage} alt="Fast Delivery" />
              </div>
              <h4>Fast Delivery</h4>
              <p>Efficient logistics network ensuring quick delivery of fresh produce</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src={easyImg} alt="Easy to Use" />
              </div>
              <h4>Easy to Use</h4>
              <p>User-friendly platform designed for all levels of tech experience</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src={securityImg} alt="Secure Payments" />
              </div>
              <h4>Secure Payments</h4>
              <p>Safe and secure payment processing for all transactions</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <img src={analyticsImg} alt="Smart Analytics" />
              </div>
              <h4>Smart Analytics</h4>
              <p>Data-driven insights to help optimize your agricultural business</p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Community Says</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Govimansala has revolutionized how I sell my produce. Direct access to buyers means better prices and less waste."</p>
              </div>
              <div className="testimonial-author">
                <strong>Sunil Perera</strong>
                <span>Farmer from Kandy</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The freshest produce at the best prices. Govimansala has become our primary supplier for our restaurant chain."</p>
              </div>
              <div className="testimonial-author">
                <strong>Priya Fernando</strong>
                <span>Restaurant Owner</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Flexible working hours and good earnings. Perfect for supplementing my income while helping the community."</p>
              </div>
              <div className="testimonial-author">
                <strong>Nimal Silva</strong>
                <span>Delivery Driver</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Agriculture Together?</h2>
            <p>Join thousands of farmers, buyers, vendors, and drivers who are building a better agricultural future</p>
            <div className="cta-buttons">
              <button 
                className="cta-button primary large"
                onClick={() => navigate("/signup")}
              >
                Get Started Today
              </button>
              <button 
                className="cta-button outline large"
                onClick={() => navigate("/about")}
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewHome;

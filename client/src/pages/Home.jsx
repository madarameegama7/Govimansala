import React from "react";
import "./Home.css";
import heroImage from "../assets/homePage/hero-image1.png";
import fruitsImage from "../assets/homePage/fruits.jpg";
import vegetablesImage from "../assets/homePage/vegetables.jpg";
import carrotImage from "../assets/homePage/carrots.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>
            <span className="hero-heading1">Fresh from Farm to Your Shop</span>
          </h1>
          <p className="hero-desc">
            Connect directly with local farmers and get the freshest produce and
            organic products delivered to your doorstep.
          </p>
        </div>
        <div className="hero-img">
          <img src={heroImage} alt="Hero" />
        </div>
      </div>

      <button onClick={() => navigate("/signup?role=RIDER")}>
        Sign Up as Rider
      </button>
      <button onClick={() => navigate("/signup?role=BUYER")}>
        Sign Up as Buyer
      </button>
      <button onClick={() => navigate("/signup?role=VENDOR")}>
        Sign Up as Vendor
      </button>

      {/* Shop By Category */}
      <div className="shop-by-category">
        <h1>Shop by Category</h1>
        <div className="category-cards">
          <div className="category-card">
            <img src={fruitsImage} alt="Fruits" />
            <p>Fruits</p>
          </div>
          <div className="category-card">
            <img src={vegetablesImage} alt="Vegetables" />
            <p>Vegetables</p>
          </div>
        </div>
      </div>

      {/* Best Deals */}
      <div className="best-deals">
        <h2>Best Deals</h2>
        <div className="deal-cards">
          {[1, 2, 3].map((item, index) => (
            <div className="deal-card" key={index}>
              <img src={carrotImage} alt="Carrot Organic" />
              <div className="deal-info">
                <p className="product-type">Organic</p>
                <p className="product-name">Carrot Organic</p>
                <div className="badge-row">
                  <span className="price">Rs. 230.00</span>
                  <span className="badge">
                    {index === 1 ? "Hot Deals" : "Limited Time"}
                  </span>
                </div>
                <p className="discount">20%</p>
                <div className="quantity-row">
                  <label htmlFor={`qty-${index}`}>Qty:</label>
                  <select id={`qty-${index}`}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <button className="add-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <p className="how-subtitle">
          Three simple steps to start sourcing fresh farm products for your
          business
        </p>
        <div className="steps">
          <div className="step">
            <i className="fas fa-user-plus"></i>
            <h4>1. Register</h4>
            <p>
              Create your wholesale buyer account to access pricing and place
              orders
            </p>
          </div>
          <div className="step">
            <i className="fas fa-search"></i>
            <h4>2. Browse</h4>
            <p>
              Explore our marketplace to find fresh, local produce from trusted
              farmers
            </p>
          </div>
          <div className="step">
            <i className="fas fa-shopping-basket"></i>
            <h4>3. Order</h4>
            <p>
              Place your order and get fresh produce delivered directly to your
              business
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

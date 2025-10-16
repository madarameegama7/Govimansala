// src/pages/FarmPage.jsx
import React, { useState } from "react";
import "../pages/styles/FarmPage.css";

const products = [
  // vegetables
  { name: "Red Onion", image: "/src/assets/Marketplace/Vegetables/RedOnion.jpg", category: "vegetable", type: "organic" },
  { name: "Potato", image: "/src/assets/Marketplace/Vegetables/Potatoes.jpg", category: "vegetable", type: "conventional" },
  { name: "Tomato", image: "/src/assets/Marketplace/Vegetables/tomatoes.jpg", category: "vegetable", type: "organic" },
  { name: "Bombay Onion", image: "/src/assets/Marketplace/Vegetables/RedOnion.jpg", category: "vegetable", type: "conventional" },
  { name: "Carrot", image: "/src/assets/Marketplace/Vegetables/carrot.jpg", category: "vegetable", type: "organic" },
  { name: "Brinjal", image: "/src/assets/Marketplace/Vegetables/Brinjal.jpg", category: "vegetable", type: "conventional" },

  // fruits
  { name: "Avocado", image: "/src/assets/Marketplace/Fruits/avacado.jpg", category: "fruit", type: "organic" },
  { name: "Guava", image: "/src/assets/Marketplace/Fruits/guava.jpg", category: "fruit", type: "conventional" },
  { name: "Papaya", image: "/src/assets/Marketplace/Fruits/papaya.jpeg", category: "fruit", type: "organic" },
  { name: "Watermelon", image: "/src/assets/Marketplace/Fruits/watermelon.jpg", category: "fruit", type: "conventional" },
  { name: "Banana", image: "/src/assets/Marketplace/Fruits/banana.jpg", category: "fruit", type: "organic" },
  { name: "Pineapple", image: "/src/assets/Marketplace/Fruits/pineapple.jpeg", category: "fruit", type: "conventional" },
  { name: "Mango", image: "/src/assets/Marketplace/Fruits/mango.jpeg", category: "fruit", type: "organic" },
];

const FarmPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVegFilter, setSelectedVegFilter] = useState("all");
  const [selectedFruitFilter, setSelectedFruitFilter] = useState("all");

  const filteredVegetables = products.filter(
    (p) => p.category === "vegetable" && (selectedVegFilter === "all" || p.type === selectedVegFilter)
  );

  const filteredFruits = products.filter(
    (p) => p.category === "fruit" && (selectedFruitFilter === "all" || p.type === selectedFruitFilter)
  );

  return (
    <>
      <div className="farms-hero">
        <h1>Farms</h1>
        <p>Home &gt; Farms &gt; Green Valley Farm</p>
      </div>

      <div className="top-bar">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "×" : "≡"}
        </button>

        <div className="search-bar-container">
          <input className="search-input" type="text" placeholder="Search for products..." />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="farm-page">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <h3>Filter Products</h3>

          {/* Vegetables */}
          <div className="filter-section">
            <h4>Vegetables</h4>
            <div className="type-filters">
              {["all", "organic", "conventional"].map((type) => (
                <div key={type} className="type-filter">
                  <input
                    type="radio"
                    id={`veg-${type}`}
                    name="vegetables"
                    checked={selectedVegFilter === type}
                    onChange={() => setSelectedVegFilter(type)}
                  />
                  <label htmlFor={`veg-${type}`}>
                    {type === "all" ? "All Vegetables" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Fruits */}
          <div className="filter-section">
            <h4>Fruits</h4>
            <div className="type-filters">
              {["all", "organic", "conventional"].map((type) => (
                <div key={type} className="type-filter">
                  <input
                    type="radio"
                    id={`fruit-${type}`}
                    name="fruits"
                    checked={selectedFruitFilter === type}
                    onChange={() => setSelectedFruitFilter(type)}
                  />
                  <label htmlFor={`fruit-${type}`}>
                    {type === "all" ? "All Fruits" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <h1>Green Valley Farm</h1>

          {/* Vegetable Section */}
          {filteredVegetables.length > 0 && (
            <>
              <h2 className="category-title">Vegetables</h2>
              <div className="product-grid">
                {filteredVegetables.map((product, idx) => (
                  <div key={`veg-${idx}`} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <div className="product-actions">
                      <label htmlFor={`qty-veg-${idx}`}>Qty:</label>
                      <select id={`qty-veg-${idx}`}>
                        {[...Array(100)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      <button className="add-button">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Fruit Section */}
          {filteredFruits.length > 0 && (
            <>
              <h2 className="category-title">Fruits</h2>
              <div className="product-grid">
                {filteredFruits.map((product, idx) => (
                  <div key={`fruit-${idx}`} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <div className="product-actions">
                      <label htmlFor={`qty-fruit-${idx}`}>Qty:</label>
                      <select id={`qty-fruit-${idx}`}>
                        {[...Array(100)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      <button className="add-button">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FarmPage;

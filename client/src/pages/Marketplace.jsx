import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/Marketplace.css';
import SimpleSearchBar from '../components/search/SearchBar';

// Import images
import watermelonImg from '../assets/Marketplace/Fruits/watermelon.jpg';
import pineappleImg from '../assets/Marketplace/Fruits/pineapple.jpeg';
import papayaImg from '../assets/Marketplace/Fruits/papaya.jpeg';
import mangoImg from '../assets/Marketplace/Fruits/mango.jpeg';
import bananaImg from '../assets/Marketplace/Fruits/banana.jpg';

import BrinjalImg from '../assets/Marketplace/Vegetables/Brinjal.jpg';
import carrotImg from '../assets/Marketplace/Vegetables/carrot.jpg';
import potatoesImg from '../assets/Marketplace/Vegetables/Potatoes.jpg';
import redOnionImg from '../assets/Marketplace/Vegetables/RedOnion.jpg';
import tomatoesImg from '../assets/Marketplace/Vegetables/tomatoes.jpg';

import organicIcon from '../assets/Marketplace/organic.png';
import nonOrganicIcon from '../assets/Marketplace/non-organic.jpg';

const API_BASE_URL = 'http://localhost:8080/api/product/buyer_product';

const productImageMap = {
  // Vegetables (try multiple variations)
  'Carrots': carrotImg,
  
  'Brinjal': BrinjalImg,
  
  'Potatoes': potatoesImg,
  
  'Red Onion': redOnionImg,
  
  'tomatoes': tomatoesImg,


  // Fruits
  'Watermelon': watermelonImg,
  'watermelon': watermelonImg,
  
  'Pineapple': pineappleImg,
  'pineapple': pineappleImg,
  
  'Papaya': papayaImg,
  'papaya': papayaImg,
  
  'Mango': mangoImg,
  'mango': mangoImg,
  'Mangoes': mangoImg,
  'mangoes': mangoImg,
  
  'Bananas': bananaImg,
  'banana': bananaImg,
  'Banana': bananaImg,
  'bananas': bananaImg
};

const getLocalImage = (productName) => {
  if (!productName) {
    return 'https://via.placeholder.com/300x200?text=No+Image';
  }
  
  // Try exact match first
  if (productImageMap[productName]) {
    return productImageMap[productName];
  }
  
  // Try lowercase
  if (productImageMap[productName.toLowerCase()]) {
    return productImageMap[productName.toLowerCase()];
  }
  
  // Try to find partial match
  const productNameLower = productName.toLowerCase();
  const matchedKey = Object.keys(productImageMap).find(key => 
    key.toLowerCase().includes(productNameLower) || 
    productNameLower.includes(key.toLowerCase())
  );
  
  if (matchedKey) {
    return productImageMap[matchedKey];
  }
  
  // Fallback to placeholder
  console.warn(`No image found for product: ${productName}`);
  return 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(productName);
};

function Marketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVegFilter, setSelectedVegFilter] = useState('all');
  const [selectedFruitFilter, setSelectedFruitFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [veggiesResponse, fruitsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/Vegetable`),
        fetch(`${API_BASE_URL}/Fruit`)
      ]);

      if (!veggiesResponse.ok || !fruitsResponse.ok) {
        throw new Error('Failed to fetch products');
      }

      const veggiesData = await veggiesResponse.json();
      const fruitsData = await fruitsResponse.json();
      
      console.log('Vegetables:', veggiesData); // Debug log
      console.log('Fruits:', fruitsData); // Debug log
      
      setVegetables(veggiesData);
      setFruits(fruitsData);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally { 
      setLoading(false); 
    }
  };

  const fetchFilteredVegetables = async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Vegetable/${type}`);
      if (!response.ok) throw new Error('Failed to fetch filtered vegetables');
      setVegetables(await response.json());
    } catch (err) { 
      console.error(err); 
    }
  };

  const fetchFilteredFruits = async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Fruit/${type}`);
      if (!response.ok) throw new Error('Failed to fetch filtered fruits');
      setFruits(await response.json());
    } catch (err) { 
      console.error(err); 
    }
  };

  useEffect(() => {
    if (selectedVegFilter !== 'all') {
      fetchFilteredVegetables(selectedVegFilter);
    } else {
      fetchCategoryProducts('Vegetable', setVegetables);
    }
  }, [selectedVegFilter]);

  useEffect(() => {
    if (selectedFruitFilter !== 'all') {
      fetchFilteredFruits(selectedFruitFilter);
    } else {
      fetchCategoryProducts('Fruit', setFruits);
    }
  }, [selectedFruitFilter]);

  const fetchCategoryProducts = async (category, setter) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${category}`);
      if (!response.ok) throw new Error(`Failed to fetch ${category}`);
      setter(await response.json());
    } catch (err) { 
      console.error(err); 
    }
  };

  const filterBySearch = (products) => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.productType && product.productType.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleSearch = (term) => setSearchTerm(term);

  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const renderProductCard = (product) => {
    const isOrganic = product.isOrganic;
    
    console.log('Rendering product:', product.name, 'Image:', getLocalImage(product.name)); // Debug log

    return (
      <div key={product.productId} className="product-card">
        <div className="product-image">
          <img 
            src={getLocalImage(product.name)} 
            alt={product.name}
            onError={(e) => {
              console.error('Image load error for:', product.name);
              e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(product.name);
            }}
          />
        </div>

        <div className="product-info">
          <h3 className="product-name">
            <span>{product.name}</span>
            <img
              src={isOrganic ? organicIcon : nonOrganicIcon}
              alt={isOrganic ? 'Organic' : 'Conventional'}
              className="organic-icon"
            />
          </h3>

          <span className={`product-type ${isOrganic ? 'organic' : 'conventional'}`}>
            {isOrganic ? 'Organic' : 'Conventional'}
          </span>

          <p className="product-description">
            {product.description || `Fresh ${product.name.toLowerCase()}`}
          </p>

          <div className="product-details">
            <p className="product-price">Rs. {product.unitPrice}/kg</p>
            <p className="product-quantity">
              <span className="quantity-label">Available:</span> {product.quantity} kg
            </p>
            <p className="product-location">
              <span className="location-icon">📍 {product.location}
            </span></p>
          </div>

          <button 
            className="add-to-cart-btn" 
            onClick={() => navigate(`/product/${product.productId}`)}
          >
            View More Details
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="marketplace">
        <div className="loading-container">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="marketplace">
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={fetchProducts}>Retry</button>
        </div>
      </div>
    );
  }

  const filteredVegetables = filterBySearch(vegetables);
  const filteredFruits = filterBySearch(fruits);

  const allProductNames = [
    ...vegetables.map(v => v.name),
    ...fruits.map(f => f.name),
    'Organic', 'Conventional', 'Fresh'
  ];

  return (
    <div className="marketplace">
      <button 
        className="sidebar-toggle-below-logo" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '×' : '≡'}
      </button>

      <div className="marketplace-container">
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <h3>Filter Products</h3>

          <div className="filter-section">
            <h4>Vegetables</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="veg-all"
                  name="vegetables" 
                  checked={selectedVegFilter === 'all'} 
                  onChange={() => setSelectedVegFilter('all')} 
                />
                <label htmlFor="veg-all">All Vegetables</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="veg-organic"
                  name="vegetables" 
                  checked={selectedVegFilter === 'organic'} 
                  onChange={() => setSelectedVegFilter('organic')} 
                />
                <label htmlFor="veg-organic">Organic</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="veg-conventional"
                  name="vegetables" 
                  checked={selectedVegFilter === 'conventional'} 
                  onChange={() => setSelectedVegFilter('conventional')} 
                />
                <label htmlFor="veg-conventional">Conventional</label>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4>Fruits</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="fruit-all"
                  name="fruits" 
                  checked={selectedFruitFilter === 'all'} 
                  onChange={() => setSelectedFruitFilter('all')} 
                />
                <label htmlFor="fruit-all">All Fruits</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="fruit-organic"
                  name="fruits" 
                  checked={selectedFruitFilter === 'organic'} 
                  onChange={() => setSelectedFruitFilter('organic')} 
                />
                <label htmlFor="fruit-organic">Organic</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="fruit-conventional"
                  name="fruits" 
                  checked={selectedFruitFilter === 'conventional'} 
                  onChange={() => setSelectedFruitFilter('conventional')} 
                />
                <label htmlFor="fruit-conventional">Conventional</label>
              </div>
            </div>
          </div>
        </div>

        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="marketplace-search-container">
            <SimpleSearchBar 
              placeholder="Search fruits, vegetables..." 
              onSearch={handleSearch} 
              data={allProductNames} 
            />
          </div>

          <div className="marketplace-header">
            <h1>Fresh Marketplace</h1>
            <p>Discover fresh, quality produce from local farmers</p>
          </div>

          {/* Vegetables Section */}
          <div className="section vegetables-section">
            <div className="section-header">
              <h2 className="section-title" onClick={() => navigate('/vegetables')}>
                Vegetables
                <span className="section-subtitle">Fresh from local farms</span>
              </h2>
              <div className="scroll-controls">
                <button 
                  className="scroll-btn"
                  onClick={() => scrollLeft('vegetables-container')}
                >
                  ←
                </button>
                <button 
                  className="scroll-btn"
                  onClick={() => scrollRight('vegetables-container')}
                >
                  →
                </button>
              </div>
            </div>
            <div className="products-scroll" id="vegetables-container">
              {filteredVegetables.length > 0 ? (
                filteredVegetables.map(renderProductCard)
              ) : (
                <p className="no-products">No vegetables found</p>
              )}
            </div>
          </div>

          {/* Fruits Section */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title" onClick={() => navigate('/fruits')}>
                Fruits
                <span className="section-subtitle">Sweet and fresh</span>
              </h2>
              <div className="scroll-controls">
                <button 
                  className="scroll-btn"
                  onClick={() => scrollLeft('fruits-container')}
                >
                  ←
                </button>
                <button 
                  className="scroll-btn"
                  onClick={() => scrollRight('fruits-container')}
                >
                  →
                </button>
              </div>
            </div>
            <div className="products-scroll" id="fruits-container">
              {filteredFruits.length > 0 ? (
                filteredFruits.map(renderProductCard)
              ) : (
                <p className="no-products">No fruits found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
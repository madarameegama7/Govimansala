import React, { useState } from 'react'
import './vegetables.css'
// Import vegetable images
import carrotImg from '../assets/Marketplace/Vegetables/carrot.jpg'
import brinjal from '../assets/Marketplace/Vegetables/Brinjal.jpg'
import potatoes from '../assets/Marketplace/Vegetables/Potatoes.jpg'
import redOnion from '../assets/Marketplace/Vegetables/RedOnion.jpg'
import tomatoes from '../assets/Marketplace/Vegetables/tomatoes.jpg'
// Import organic and non-organic icons
import organicIcon from '../assets/Marketplace/organic.png'
import nonOrganicIcon from '../assets/Marketplace/non-organic.jpg'

function Vegetables() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="marketplace">
      {/* Sidebar Toggle Button - positioned below logo */}
      <button 
        className="sidebar-toggle-below-logo"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '×' : '≡'}
      </button>
      
      <div className="marketplace-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <h3>Filter Products</h3>
          
          {/* Vegetables Filter Section */}
          <div className="filter-section">
            <h4>Vegetables</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input type="radio" id="veg-all" name="vegetables" defaultChecked />
                <label htmlFor="veg-all">All Vegetables</label>
              </div>
              <div className="type-filter">
                <input type="radio" id="veg-organic" name="vegetables" />
                <label htmlFor="veg-organic">Organic</label>
              </div>
              <div className="type-filter">
                <input type="radio" id="veg-conventional" name="vegetables" />
                <label htmlFor="veg-conventional">Conventional</label>
              </div>
            </div>
          </div>

        
        </div>

        {/* Main Content */}
        <div className={`vegetables-main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          {/* Header */}
          <div className="vegetables-header">
            <h1>Fresh Vegetables</h1>
            <p>Discover fresh, quality vegetables from local farmers</p>
          </div>

          {/* Vegetables Section */}
          <div className="vegetables-section">
            <div className="vegetables-section-header">
              <h2>Available Vegetables</h2>
            </div>
            
            <div className="vegetables-products-grid">
              {/* Vegetable Products */}
              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={carrotImg} alt="Fresh Carrots" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Fresh Carrots</span>
                    <img src={organicIcon} alt="Organic" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type organic">Organic</span>
                  <p className="vegetables-product-description">Fresh organic carrots, perfect for salads and cooking.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={brinjal} alt="Fresh Brinjal" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Fresh Brinjal</span>
                    <img src={organicIcon} alt="Organic" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type organic">Organic</span>
                  <p className="vegetables-product-description">Fresh organic brinjal, perfect for curries.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={potatoes} alt="Organic Potatoes" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Organic Potatoes</span>
                    <img src={organicIcon} alt="Organic" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type organic">Organic</span>
                  <p className="vegetables-product-description">Organic potatoes, great for mashing or roasting.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={redOnion} alt="Red Onions" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Red Onions</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type conventional">Conventional</span>
                  <p className="vegetables-product-description">Fresh red onions, essential for cooking.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={tomatoes} alt="Fresh Tomatoes" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Fresh Tomatoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type conventional">Conventional</span>
                  <p className="vegetables-product-description">Ripe tomatoes, perfect for sauces and salads.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={tomatoes} alt="Organic Tomatoes" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Organic Tomatoes</span>
                    <img src={organicIcon} alt="Organic" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type organic">Organic</span>
                  <p className="vegetables-product-description">Organic ripe tomatoes, perfect for healthy meals.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={carrotImg} alt="Baby Carrots" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Baby Carrots</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type conventional">Conventional</span>
                  <p className="vegetables-product-description">Tender baby carrots, convenient and ready to eat.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={potatoes} alt="Sweet Potatoes" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Sweet Potatoes</span>
                    <img src={organicIcon} alt="Organic" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type organic">Organic</span>
                  <p className="vegetables-product-description">Organic sweet potatoes, naturally sweet and nutritious.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={redOnion} alt="White Onions" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>White Onions</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type conventional">Conventional</span>
                  <p className="vegetables-product-description">Fresh white onions, milder flavor than red onions.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={brinjal} alt="Purple Brinjal" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Purple Brinjal</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type conventional">Conventional</span>
                  <p className="vegetables-product-description">Fresh purple brinjal, great for traditional recipes.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={tomatoes} alt="Cherry Tomatoes" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Cherry Tomatoes</span>
                    <img src={organicIcon} alt="Organic" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type organic">Organic</span>
                  <p className="vegetables-product-description">Sweet organic cherry tomatoes, perfect for snacking.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="vegetables-product-card">
                <div className="vegetables-product-image">
                  <img src={potatoes} alt="Russet Potatoes" />
                </div>
                <div className="vegetables-product-info">
                  <h3 className="vegetables-product-name">
                    <span>Russet Potatoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="vegetables-organic-icon" />
                  </h3>
                  <span className="vegetables-product-type conventional">Conventional</span>
                  <p className="vegetables-product-description">Perfect baking potatoes with fluffy texture.</p>
                  <button className="vegetables-add-to-cart-btn">View More Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vegetables
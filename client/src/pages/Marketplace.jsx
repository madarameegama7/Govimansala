import React, { useState } from 'react'
import './Marketplace.css'
// Import vegetable images
import carrotImg from '../assets/Marketplace/Vegetables/carrot.jpg'
import brinjal from '../assets/Marketplace/Vegetables/Brinjal.jpg'
import potatoes from '../assets/Marketplace/Vegetables/Potatoes.jpg'
import redOnion from '../assets/Marketplace/Vegetables/RedOnion.jpg'
import tomatoes from '../assets/Marketplace/Vegetables/tomatoes.jpg'
// Import fruit images
import avocadoImg from '../assets/Marketplace/Fruits/avacado.jpg'
import bananaImg from '../assets/Marketplace/Fruits/banana.jpg'
import guavaImg from '../assets/Marketplace/Fruits/guava.jpg'
import mangoImg from '../assets/Marketplace/Fruits/mango.jpeg'
import papayaImg from '../assets/Marketplace/Fruits/papaya.jpeg'
import watermelonImg from '../assets/Marketplace/Fruits/watermelon.jpg'
import pineappleImg from '../assets/Marketplace/Fruits/pineapple.jpeg'
// Import organic and non-organic icons
import organicIcon from '../assets/Marketplace/organic.png'
import nonOrganicIcon from '../assets/Marketplace/non-organic.jpg'

function Marketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId)
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId)
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

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
            <h4> Vegetables</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input type="radio" id="veg-all" name="vegetables" defaultChecked />
                <label htmlFor="veg-all">All Vegetables</label>
              </div>
              <div className="type-filter">
                <input type="radio" id="veg-organic" name="vegetables" />
                <label htmlFor="veg-organic"> Organic</label>
              </div>
              <div className="type-filter">
                <input type="radio" id="veg-conventional" name="vegetables" />
                <label htmlFor="veg-conventional"> Conventional</label>
              </div>
            </div>
          </div>

          {/* Fruits Filter Section */}
          <div className="filter-section">
            <h4> Fruits</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input type="radio" id="fruit-all" name="fruits" defaultChecked />
                <label htmlFor="fruit-all">All Fruits</label>
              </div>
              <div className="type-filter">
                <input type="radio" id="fruit-organic" name="fruits" />
                <label htmlFor="fruit-organic">Organic</label>
              </div>
              <div className="type-filter">
                <input type="radio" id="fruit-conventional" name="fruits" />
                <label htmlFor="fruit-conventional"> Conventional</label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          {/* Header */}
          <div className="marketplace-header">
            <h1>Fresh Marketplace</h1>
            <p>Discover fresh, quality produce from local farmers</p>
          </div>

          {/* Vegetables Section */}
          <div className="section">
            <div className="section-header">
              <h2>Vegetables</h2>
              <div className="scroll-controls">
                <button 
                  className="scroll-btn scroll-left"
                  onClick={() => scrollLeft('vegetables-container')}
                >
                  ←
                </button>
                <button 
                  className="scroll-btn scroll-right"
                  onClick={() => scrollRight('vegetables-container')}
                >
                  →
                </button>
              </div>
            </div>
            
            <div className="products-scroll" id="vegetables-container">
              {/* Vegetable Products */}
              <div className="product-card">
                <div className="product-image">
                  <img src={carrotImg} alt="Fresh Carrots" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Fresh Carrots</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Fresh organic carrots, perfect for salads and cooking.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={brinjal} alt="Fresh Brinjal" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Fresh Brinjal</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Fresh organic brinjal, perfect for curries.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={potatoes} alt="Organic Potatoes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Organic Potatoes</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Organic potatoes, great for mashing or roasting.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={redOnion} alt="Red Onions" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Red Onions</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Fresh red onions, essential for cooking.</p>
                <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={tomatoes} alt="Tomatoes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Tomatoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Ripe tomatoes, perfect for sauces and salads.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>
                <div className="product-card">
                <div className="product-image">
                  <img src={tomatoes} alt="Tomatoes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Tomatoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Ripe tomatoes, perfect for sauces and salads.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={tomatoes} alt="Tomatoes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Tomatoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Ripe tomatoes, perfect for sauces and salads.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={tomatoes} alt="Tomatoes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Tomatoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Ripe tomatoes, perfect for sauces and salads.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>
            </div>
          </div>

          {/* Fruits Section */}
          <div className="section">
            <div className="section-header">
              <h2>Fruits</h2>
              <div className="scroll-controls">
                <button 
                  className="scroll-btn scroll-left"
                  onClick={() => scrollLeft('fruits-container')}
                >
                  ←
                </button>
                <button 
                  className="scroll-btn scroll-right"
                  onClick={() => scrollRight('fruits-container')}
                >
                  →
                </button>
              </div>
            </div>
            
            <div className="products-scroll" id="fruits-container">
              {/* Fruit Products */}
              <div className="product-card">
                <div className="product-image">
                  <img src={pineappleImg} alt="Pineapple" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Organic Apples</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Crisp organic apples, perfect for snacking.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={bananaImg} alt="Fresh Bananas" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Fresh Bananas</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Sweet bananas, rich in potassium.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={avocadoImg} alt="Organic Oranges" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Organic Oranges</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Juicy organic oranges, high in vitamin C.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={watermelonImg} alt="Watermelon" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Watermelon</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Sweet watermelon, perfect for desserts.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={guavaImg} alt="Organic Grapes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Organic Guava</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Organic guava, great for snacking.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={papayaImg} alt="Pineapple" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Papaya</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Tropical Papaya, sweet and tangy.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={avocadoImg} alt="Organic Blueberries" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Organic Avacado</span>
                    <img src={organicIcon} alt="Organic" className="organic-icon" />
                  </h3>
                  <span className="product-type organic">Organic</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Fresh organic avacado, packed with antioxidants.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src={mangoImg} alt="Mangoes" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <span>Mangoes</span>
                    <img src={nonOrganicIcon} alt="Conventional" className="organic-icon" />
                  </h3>
                  <span className="product-type conventional">Conventional</span>
                  <div className="product-price">LKR 100/kg</div>
                  <p className="product-description">Sweet tropical mangoes, rich in vitamins.</p>
                  <button className="add-to-cart-btn">View More Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marketplace

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/styles/Vegetables.css'
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
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Helper function to check if vegetable should be shown based on filter
  const shouldShowVegetable = (type, name) => {
    const matchesFilter = selectedFilter === 'all' || selectedFilter === type
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  }

  // Function to handle navigation to more details page
  const handleNavigateToDetails = (vegetableData) => {
    navigate('/moreDetails', { state: { vegetable: vegetableData } })
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
          
          {/* Search Section */}
          <div className="filter-section">
            <h4>Search</h4>
            <input
              type="text"
              placeholder="Search vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Vegetables Filter Section */}
          <div className="filter-section">
            <h4>Type Filter</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="veg-all" 
                  name="vegetables" 
                  checked={selectedFilter === 'all'}
                  onChange={() => setSelectedFilter('all')}
                />
                <label htmlFor="veg-all">All Vegetables</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="veg-organic" 
                  name="vegetables" 
                  checked={selectedFilter === 'organic'}
                  onChange={() => setSelectedFilter('organic')}
                />
                <label htmlFor="veg-organic">Organic</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="veg-conventional" 
                  name="vegetables" 
                  checked={selectedFilter === 'conventional'}
                  onChange={() => setSelectedFilter('conventional')}
                />
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
              {/* Fresh Carrots - Organic */}
              {shouldShowVegetable('organic', 'Fresh Carrots') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Carrots',
                    type: 'organic',
                    image: carrotImg,
                    description: 'Fresh organic carrots, perfect for salads and cooking.',
                    icon: organicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={carrotImg} alt="Fresh Carrots" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Carrots</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Fresh organic carrots, perfect for salads and cooking.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Carrots',
                          type: 'organic',
                          image: carrotImg,
                          description: 'Fresh organic carrots, perfect for salads and cooking.',
                          icon: organicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Fresh Brinjal - Organic */}
              {shouldShowVegetable('organic', 'Fresh Brinjal') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Brinjal',
                    type: 'organic',
                    image: brinjal,
                    description: 'Fresh organic brinjal, perfect for curries.',
                    icon: organicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={brinjal} alt="Fresh Brinjal" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Brinjal</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Fresh organic brinjal, perfect for curries.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Brinjal',
                          type: 'organic',
                          image: brinjal,
                          description: 'Fresh organic brinjal, perfect for curries.',
                          icon: organicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Organic Potatoes - Organic */}
              {shouldShowVegetable('organic', 'Organic Potatoes') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Potatoes',
                    type: 'organic',
                    image: potatoes,
                    description: 'Organic potatoes, great for mashing or roasting.',
                    icon: organicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={potatoes} alt="Organic Potatoes" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Potatoes</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Organic potatoes, great for mashing or roasting.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Potatoes',
                          type: 'organic',
                          image: potatoes,
                          description: 'Organic potatoes, great for mashing or roasting.',
                          icon: organicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Red Onions - Conventional */}
              {shouldShowVegetable('conventional', 'Red Onions') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Red Onions',
                    type: 'conventional',
                    image: redOnion,
                    description: 'Fresh red onions, essential for cooking.',
                    icon: nonOrganicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={redOnion} alt="Red Onions" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Red Onions</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Fresh red onions, essential for cooking.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Red Onions',
                          type: 'conventional',
                          image: redOnion,
                          description: 'Fresh red onions, essential for cooking.',
                          icon: nonOrganicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Tomatoes - Conventional */}
              {shouldShowVegetable('conventional', 'Tomatoes') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Tomatoes',
                    type: 'conventional',
                    image: tomatoes,
                    description: 'Ripe tomatoes, perfect for sauces and salads.',
                    icon: nonOrganicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={tomatoes} alt="Tomatoes" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Tomatoes</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Ripe tomatoes, perfect for sauces and salads.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Tomatoes',
                          type: 'conventional',
                          image: tomatoes,
                          description: 'Ripe tomatoes, perfect for sauces and salads.',
                          icon: nonOrganicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Organic Carrots - Organic */}
              {shouldShowVegetable('organic', 'Organic Carrots') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Carrots',
                    type: 'organic',
                    image: carrotImg,
                    description: 'Premium organic carrots, sweet and crunchy.',
                    icon: organicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={carrotImg} alt="Organic Carrots" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Carrots</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Premium organic carrots, sweet and crunchy.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Carrots',
                          type: 'organic',
                          image: carrotImg,
                          description: 'Premium organic carrots, sweet and crunchy.',
                          icon: organicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Fresh Potatoes - Conventional */}
              {shouldShowVegetable('conventional', 'Fresh Potatoes') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Potatoes',
                    type: 'conventional',
                    image: potatoes,
                    description: 'Fresh potatoes, perfect for any meal.',
                    icon: nonOrganicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={potatoes} alt="Fresh Potatoes" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Potatoes</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Fresh potatoes, perfect for any meal.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Potatoes',
                          type: 'conventional',
                          image: potatoes,
                          description: 'Fresh potatoes, perfect for any meal.',
                          icon: nonOrganicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Organic Brinjal - Organic */}
              {shouldShowVegetable('organic', 'Organic Brinjal') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Brinjal',
                    type: 'organic',
                    image: brinjal,
                    description: 'Premium organic brinjal, naturally grown.',
                    icon: organicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={brinjal} alt="Organic Brinjal" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Brinjal</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Premium organic brinjal, naturally grown.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Brinjal',
                          type: 'organic',
                          image: brinjal,
                          description: 'Premium organic brinjal, naturally grown.',
                          icon: organicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Fresh Red Onions - Conventional */}
              {shouldShowVegetable('conventional', 'Fresh Red Onions') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Red Onions',
                    type: 'conventional',
                    image: redOnion,
                    description: 'Fresh red onions, adds flavor to any dish.',
                    icon: nonOrganicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={redOnion} alt="Fresh Red Onions" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Red Onions</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Fresh red onions, adds flavor to any dish.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Red Onions',
                          type: 'conventional',
                          image: redOnion,
                          description: 'Fresh red onions, adds flavor to any dish.',
                          icon: nonOrganicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {/* Cherry Tomatoes - Organic */}
              {shouldShowVegetable('organic', 'Cherry Tomatoes') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Cherry Tomatoes',
                    type: 'organic',
                    image: tomatoes,
                    description: 'Sweet cherry tomatoes, perfect for snacking.',
                    icon: organicIcon
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={tomatoes} alt="Cherry Tomatoes" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Cherry Tomatoes</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Sweet cherry tomatoes, perfect for snacking.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Cherry Tomatoes',
                          type: 'organic',
                          image: tomatoes,
                          description: 'Sweet cherry tomatoes, perfect for snacking.',
                          icon: organicIcon
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vegetables
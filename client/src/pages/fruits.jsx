import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/styles/Vegetables.css'
import SimpleSearchBar from '../components/search/SearchBar'
import avocadoImg from '../assets/Marketplace/Fruits/avacado.jpg'
import bananaImg from '../assets/Marketplace/Fruits/banana.jpg'
import guavaImg from '../assets/Marketplace/Fruits/guava.jpg'
import mangoImg from '../assets/Marketplace/Fruits/mango.jpeg'
import papayaImg from '../assets/Marketplace/Fruits/papaya.jpeg'
import watermelonImg from '../assets/Marketplace/Fruits/watermelon.jpg'
import pineappleImg from '../assets/Marketplace/Fruits/pineapple.jpeg'
import organicIcon from '../assets/Marketplace/organic.png'
import nonOrganicIcon from '../assets/Marketplace/non-organic.jpg'

function Fruits() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()


  const allFruitNames = [
    'Avocado', 'Bananas', 'Guava', 'Mango', 'Papaya', 'Watermelon', 'Pineapple',
    'Organic', 'Conventional', 'Fresh'
  ]

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const shouldShowFruit = (type, name) => {
    const matchesFilter = selectedFilter === 'all' || selectedFilter === type
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  }

  const handleNavigateToDetails = (fruitData) => {
    navigate('/moreDetails', { state: { fruit: fruitData } })
  }

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
            <h4>Type Filter</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="fruit-all" 
                  name="fruits" 
                  checked={selectedFilter === 'all'}
                  onChange={() => setSelectedFilter('all')}
                />
                <label htmlFor="fruit-all">All Fruits</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="fruit-organic" 
                  name="fruits" 
                  checked={selectedFilter === 'organic'}
                  onChange={() => setSelectedFilter('organic')}
                />
                <label htmlFor="fruit-organic">Organic</label>
              </div>
              <div className="type-filter">
                <input 
                  type="radio" 
                  id="fruit-conventional" 
                  name="fruits" 
                  checked={selectedFilter === 'conventional'}
                  onChange={() => setSelectedFilter('conventional')}
                />
                <label htmlFor="fruit-conventional">Conventional</label>
              </div>
            </div>
          </div>
        </div>

   
        <div className={`vegetables-main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
     
          <div className="vegetables-search-container">
            <SimpleSearchBar 
              placeholder="Search fruits..."
              onSearch={handleSearch}
              data={allFruitNames}
            />
          </div>

      
          <div className="vegetables-header">
            <h1>Fresh Fruits</h1>
            <p>Discover fresh, quality fruits from local farmers</p>
          </div>

     
          <div className="vegetables-section">
            <div className="vegetables-section-header">
              <h2>Available Fruits</h2>
            </div>
            
            <div className="vegetables-products-grid">
        
              {shouldShowFruit('organic', 'Organic Avocado') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Avocado',
                    type: 'organic',
                    image: avocadoImg,
                    description: 'Fresh organic avocado, rich in healthy fats and nutrients.',
                    icon: organicIcon,
                    farmers: [
                      { name: 'Sunil Fernando', location: 'Kandy', rating: 4.8, price: 'Rs. 450/kg' },
                      { name: 'Kumari Silva', location: 'Matale', rating: 4.6, price: 'Rs. 425/kg' },
                      { name: 'Ravi Perera', location: 'Nuwara Eliya', rating: 4.9, price: 'Rs. 480/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={avocadoImg} alt="Organic Avocado" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Avocado</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Fresh organic avocado, rich in healthy fats and nutrients.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Avocado',
                          type: 'organic',
                          image: avocadoImg,
                          description: 'Fresh organic avocado, rich in healthy fats and nutrients.',
                          icon: organicIcon,
                          farmers: [
                            { name: 'Sunil Fernando', location: 'Kandy', rating: 4.8, price: 'Rs. 450/kg' },
                            { name: 'Kumari Silva', location: 'Matale', rating: 4.6, price: 'Rs. 425/kg' },
                            { name: 'Ravi Perera', location: 'Nuwara Eliya', rating: 4.9, price: 'Rs. 480/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('conventional', 'Fresh Bananas') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Bananas',
                    type: 'conventional',
                    image: bananaImg,
                    description: 'Sweet fresh bananas, rich in potassium and energy.',
                    icon: nonOrganicIcon,
                    farmers: [
                      { name: 'Mahinda Rajapaksa', location: 'Hambantota', rating: 4.7, price: 'Rs. 200/kg' },
                      { name: 'Nimal Wijesinghe', location: 'Kurunegala', rating: 4.5, price: 'Rs. 180/kg' },
                      { name: 'Priya Bandara', location: 'Kegalle', rating: 4.8, price: 'Rs. 220/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={bananaImg} alt="Fresh Bananas" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Bananas</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Sweet fresh bananas, rich in potassium and energy.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Bananas',
                          type: 'conventional',
                          image: bananaImg,
                          description: 'Sweet fresh bananas, rich in potassium and energy.',
                          icon: nonOrganicIcon,
                          farmers: [
                            { name: 'Mahinda Rajapaksa', location: 'Hambantota', rating: 4.7, price: 'Rs. 200/kg' },
                            { name: 'Nimal Wijesinghe', location: 'Kurunegala', rating: 4.5, price: 'Rs. 180/kg' },
                            { name: 'Priya Bandara', location: 'Kegalle', rating: 4.8, price: 'Rs. 220/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('organic', 'Organic Guava') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Guava',
                    type: 'organic',
                    image: guavaImg,
                    description: 'Fresh organic guava, high in vitamin C and antioxidants.',
                    icon: organicIcon,
                    farmers: [
                      { name: 'Chamara Weerasinghe', location: 'Anuradhapura', rating: 4.9, price: 'Rs. 350/kg' },
                      { name: 'Sanduni Perera', location: 'Polonnaruwa', rating: 4.7, price: 'Rs. 320/kg' },
                      { name: 'Kamal Silva', location: 'Dambulla', rating: 4.8, price: 'Rs. 380/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={guavaImg} alt="Organic Guava" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Guava</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Fresh organic guava, high in vitamin C and antioxidants.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Guava',
                          type: 'organic',
                          image: guavaImg,
                          description: 'Fresh organic guava, high in vitamin C and antioxidants.',
                          icon: organicIcon,
                          farmers: [
                            { name: 'Chamara Weerasinghe', location: 'Anuradhapura', rating: 4.9, price: 'Rs. 350/kg' },
                            { name: 'Sanduni Perera', location: 'Polonnaruwa', rating: 4.7, price: 'Rs. 320/kg' },
                            { name: 'Kamal Silva', location: 'Dambulla', rating: 4.8, price: 'Rs. 380/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('conventional', 'Fresh Mango') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Mango',
                    type: 'conventional',
                    image: mangoImg,
                    description: 'Sweet tropical mangoes, perfect for desserts and snacking.',
                    icon: nonOrganicIcon,
                    farmers: [
                      { name: 'Lakmal Perera', location: 'Kurunegala', rating: 4.6, price: 'Rs. 280/kg' },
                      { name: 'Ranjani Fernando', location: 'Puttalam', rating: 4.8, price: 'Rs. 300/kg' },
                      { name: 'Jagath Silva', location: 'Chilaw', rating: 4.7, price: 'Rs. 260/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={mangoImg} alt="Fresh Mango" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Mango</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Sweet tropical mangoes, perfect for desserts and snacking.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Mango',
                          type: 'conventional',
                          image: mangoImg,
                          description: 'Sweet tropical mangoes, perfect for desserts and snacking.',
                          icon: nonOrganicIcon,
                          farmers: [
                            { name: 'Lakmal Perera', location: 'Kurunegala', rating: 4.6, price: 'Rs. 280/kg' },
                            { name: 'Ranjani Fernando', location: 'Puttalam', rating: 4.8, price: 'Rs. 300/kg' },
                            { name: 'Jagath Silva', location: 'Chilaw', rating: 4.7, price: 'Rs. 260/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('organic', 'Organic Papaya') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Papaya',
                    type: 'organic',
                    image: papayaImg,
                    description: 'Fresh organic papaya, rich in digestive enzymes and vitamins.',
                    icon: organicIcon,
                    farmers: [
                      { name: 'Tharaka Bandara', location: 'Matara', rating: 4.8, price: 'Rs. 320/kg' },
                      { name: 'Dilini Rajapaksa', location: 'Galle', rating: 4.9, price: 'Rs. 350/kg' },
                      { name: 'Upul Jayasinghe', location: 'Hambantota', rating: 4.7, price: 'Rs. 300/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={papayaImg} alt="Organic Papaya" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Papaya</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Fresh organic papaya, rich in digestive enzymes and vitamins.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Papaya',
                          type: 'organic',
                          image: papayaImg,
                          description: 'Fresh organic papaya, rich in digestive enzymes and vitamins.',
                          icon: organicIcon,
                          farmers: [
                            { name: 'Tharaka Bandara', location: 'Matara', rating: 4.8, price: 'Rs. 320/kg' },
                            { name: 'Dilini Rajapaksa', location: 'Galle', rating: 4.9, price: 'Rs. 350/kg' },
                            { name: 'Upul Jayasinghe', location: 'Hambantota', rating: 4.7, price: 'Rs. 300/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('conventional', 'Fresh Watermelon') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Watermelon',
                    type: 'conventional',
                    image: watermelonImg,
                    description: 'Juicy watermelon, perfect for hot summer days.',
                    icon: nonOrganicIcon,
                    farmers: [
                      { name: 'Saman Kumara', location: 'Ampara', rating: 4.5, price: 'Rs. 120/kg' },
                      { name: 'Malini Wickramasinghe', location: 'Monaragala', rating: 4.7, price: 'Rs. 140/kg' },
                      { name: 'Roshan Perera', location: 'Badulla', rating: 4.6, price: 'Rs. 130/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={watermelonImg} alt="Fresh Watermelon" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Watermelon</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Juicy watermelon, perfect for hot summer days.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Watermelon',
                          type: 'conventional',
                          image: watermelonImg,
                          description: 'Juicy watermelon, perfect for hot summer days.',
                          icon: nonOrganicIcon,
                          farmers: [
                            { name: 'Saman Kumara', location: 'Ampara', rating: 4.5, price: 'Rs. 120/kg' },
                            { name: 'Malini Wickramasinghe', location: 'Monaragala', rating: 4.7, price: 'Rs. 140/kg' },
                            { name: 'Roshan Perera', location: 'Badulla', rating: 4.6, price: 'Rs. 130/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('conventional', 'Fresh Pineapple') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Pineapple',
                    type: 'conventional',
                    image: pineappleImg,
                    description: 'Sweet and tangy pineapple, rich in vitamin C and bromelain.',
                    icon: nonOrganicIcon,
                    farmers: [
                      { name: 'Indika Ratnayake', location: 'Gampaha', rating: 4.8, price: 'Rs. 250/piece' },
                      { name: 'Nilanthi Silva', location: 'Kalutara', rating: 4.6, price: 'Rs. 220/piece' },
                      { name: 'Asanka Fernando', location: 'Ratnapura', rating: 4.9, price: 'Rs. 280/piece' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={pineappleImg} alt="Fresh Pineapple" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Pineapple</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Sweet and tangy pineapple, rich in vitamin C and bromelain.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Pineapple',
                          type: 'conventional',
                          image: pineappleImg,
                          description: 'Sweet and tangy pineapple, rich in vitamin C and bromelain.',
                          icon: nonOrganicIcon,
                          farmers: [
                            { name: 'Indika Ratnayake', location: 'Gampaha', rating: 4.8, price: 'Rs. 250/piece' },
                            { name: 'Nilanthi Silva', location: 'Kalutara', rating: 4.6, price: 'Rs. 220/piece' },
                            { name: 'Asanka Fernando', location: 'Ratnapura', rating: 4.9, price: 'Rs. 280/piece' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              {shouldShowFruit('organic', 'Organic Mango') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Mango',
                    type: 'organic',
                    image: mangoImg,
                    description: 'Premium organic mangoes, naturally sweet and pesticide-free.',
                    icon: organicIcon,
                    farmers: [
                      { name: 'Chathura Bandara', location: 'Kurunegala', rating: 4.9, price: 'Rs. 420/kg' },
                      { name: 'Ayesha Perera', location: 'Puttalam', rating: 4.8, price: 'Rs. 450/kg' },
                      { name: 'Ruwan Silva', location: 'Chilaw', rating: 4.7, price: 'Rs. 400/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={mangoImg} alt="Organic Mango" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Mango</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Premium organic mangoes, naturally sweet and pesticide-free.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Mango',
                          type: 'organic',
                          image: mangoImg,
                          description: 'Premium organic mangoes, naturally sweet and pesticide-free.',
                          icon: organicIcon,
                          farmers: [
                            { name: 'Chathura Bandara', location: 'Kurunegala', rating: 4.9, price: 'Rs. 420/kg' },
                            { name: 'Ayesha Perera', location: 'Puttalam', rating: 4.8, price: 'Rs. 450/kg' },
                            { name: 'Ruwan Silva', location: 'Chilaw', rating: 4.7, price: 'Rs. 400/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

              
              {shouldShowFruit('conventional', 'Fresh Papaya') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Fresh Papaya',
                    type: 'conventional',
                    image: papayaImg,
                    description: 'Sweet papaya, great for breakfast and digestive health.',
                    icon: nonOrganicIcon,
                    farmers: [
                      { name: 'Gihan Rajapaksa', location: 'Matara', rating: 4.6, price: 'Rs. 180/kg' },
                      { name: 'Priyanka Silva', location: 'Galle', rating: 4.7, price: 'Rs. 200/kg' },
                      { name: 'Sampath Fernando', location: 'Hambantota', rating: 4.5, price: 'Rs. 160/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={papayaImg} alt="Fresh Papaya" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Fresh Papaya</span>
                      <img src={nonOrganicIcon} alt="conventional" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type conventional">Conventional</span>
                    <p className="vegetables-product-description">Sweet papaya, great for breakfast and digestive health.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Fresh Papaya',
                          type: 'conventional',
                          image: papayaImg,
                          description: 'Sweet papaya, great for breakfast and digestive health.',
                          icon: nonOrganicIcon,
                          farmers: [
                            { name: 'Gihan Rajapaksa', location: 'Matara', rating: 4.6, price: 'Rs. 180/kg' },
                            { name: 'Priyanka Silva', location: 'Galle', rating: 4.7, price: 'Rs. 200/kg' },
                            { name: 'Sampath Fernando', location: 'Hambantota', rating: 4.5, price: 'Rs. 160/kg' }
                          ]
                        })
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              )}

             
              {shouldShowFruit('organic', 'Organic Bananas') && (
                <div 
                  className="vegetables-product-card clickable" 
                  onClick={() => handleNavigateToDetails({
                    name: 'Organic Bananas',
                    type: 'organic',
                    image: bananaImg,
                    description: 'Premium organic bananas, naturally ripened and pesticide-free.',
                    icon: organicIcon,
                    farmers: [
                      { name: 'Nirmal Wijesinghe', location: 'Kegalle', rating: 4.9, price: 'Rs. 380/kg' },
                      { name: 'Kamani Perera', location: 'Kurunegala', rating: 4.8, price: 'Rs. 350/kg' },
                      { name: 'Lakshan Silva', location: 'Hambantota', rating: 4.7, price: 'Rs. 400/kg' }
                    ]
                  })}
                >
                  <div className="vegetables-product-image">
                    <img src={bananaImg} alt="Organic Bananas" />
                  </div>
                  <div className="vegetables-product-info">
                    <h3 className="vegetables-product-name">
                      <span>Organic Bananas</span>
                      <img src={organicIcon} alt="organic" className="vegetables-organic-icon" />
                    </h3>
                    <span className="vegetables-product-type organic">Organic</span>
                    <p className="vegetables-product-description">Premium organic bananas, naturally ripened and pesticide-free.</p>
                    <button 
                      className="vegetables-add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigateToDetails({
                          name: 'Organic Bananas',
                          type: 'organic',
                          image: bananaImg,
                          description: 'Premium organic bananas, naturally ripened and pesticide-free.',
                          icon: organicIcon,
                          farmers: [
                            { name: 'Nirmal Wijesinghe', location: 'Kegalle', rating: 4.9, price: 'Rs. 380/kg' },
                            { name: 'Kamani Perera', location: 'Kurunegala', rating: 4.8, price: 'Rs. 350/kg' },
                            { name: 'Lakshan Silva', location: 'Hambantota', rating: 4.7, price: 'Rs. 400/kg' }
                          ]
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

export default Fruits

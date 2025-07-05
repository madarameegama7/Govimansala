import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './MoreDetails.css'

function MoreDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const vegetable = location.state?.vegetable
  const [showFarmers, setShowFarmers] = useState(false)

  // Sample farmers data - in real app this would come from an API
  const availableFarmers = [
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Colombo District",
      distance: "12 km away",
      price: "Rs. 150/kg",
      quantity: "50 kg available",
      rating: 4.8,
      contact: "+94 77 123 4567",
      description: "Certified organic farm with 15+ years experience in sustainable farming.",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Sunrise Agricultural Center",
      location: "Gampaha District", 
      distance: "18 km away",
      price: "Rs. 140/kg",
      quantity: "75 kg available",
      rating: 4.6,
      contact: "+94 71 987 6543",
      description: "Family-owned farm specializing in fresh, high-quality produce.",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Fresh Fields Cooperative",
      location: "Kalutara District",
      distance: "25 km away", 
      price: "Rs. 135/kg",
      quantity: "100 kg available",
      rating: 4.7,
      contact: "+94 75 456 7890",
      description: "Cooperative of local farmers committed to providing fresh vegetables.",
      image: "/api/placeholder/100/100"
    },
    {
      id: 4,
      name: "Organic Harvest Farm",
      location: "Kandy District",
      distance: "45 km away",
      price: "Rs. 160/kg", 
      quantity: "30 kg available",
      rating: 4.9,
      contact: "+94 81 234 5678",
      description: "Premium organic farm with international certifications.",
      image: "/api/placeholder/100/100"
    }
  ]

  const handleShowFarmers = () => {
    setShowFarmers(true)
  }

  const handleSeeMore = (farmer) => {
    // Navigate to farmer details page or show more info
    console.log('See more for farmer:', farmer.name)
    // You can add navigation to farmer details page here
  }

  if (!vegetable) {
    return (
      <div className="more-details">
        <div className="more-details-container">
          <h1>Product Not Found</h1>
          <p>No product information available.</p>
          <button onClick={() => navigate('/vegetables')} className="back-btn">
            Back to Vegetables
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="more-details">
      <div className="more-details-container">
        {/* Back Button */}
        <button onClick={() => navigate('/vegetables')} className="back-btn">
          ← Back to Vegetables
        </button>

        {/* Product Details */}
        <div className="product-details">
          <div className="product-image-section">
            <img src={vegetable.image} alt={vegetable.name} className="product-main-image" />
            <div className="product-type-badge">
              <img src={vegetable.icon} alt={vegetable.type} className="type-icon" />
              <span className={`type-label ${vegetable.type}`}>
                {vegetable.type === 'organic' ? 'Organic' : 'Conventional'}
              </span>
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{vegetable.name}</h1>
            
            <div className="product-meta">
              <span className={`product-type-tag ${vegetable.type}`}>
                {vegetable.type === 'organic' ? 'Organic' : 'Conventional'}
              </span>
            </div>

            <div className="product-description-section">
              <h3>Description</h3>
              <p className="product-description">{vegetable.description}</p>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {vegetable.type === 'organic' ? (
                  <>
                    <li>Certified organic farming</li>
                    <li>No synthetic pesticides or fertilizers</li>
                    <li>Non-GMO verified</li>
                    <li>Environmentally sustainable</li>
                  </>
                ) : (
                  <>
                    <li>Fresh and high quality</li>
                    <li>Affordable pricing</li>
                    <li>Locally sourced when possible</li>
                    <li>Quality assured</li>
                  </>
                )}
              </ul>
            </div>

            <div className="product-actions">
              <button 
                className="show-farmers-btn primary" 
                onClick={handleShowFarmers}
              >
                Show Available Farmers
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="additional-info">
          <div className="info-section">
            <h3>Nutritional Benefits</h3>
            <p>
              {vegetable.name.toLowerCase().includes('carrot') && 
                "Rich in beta-carotene, fiber, and antioxidants. Great for eye health and immune system support."
              }
              {vegetable.name.toLowerCase().includes('brinjal') && 
                "High in fiber, potassium, and antioxidants. Supports heart health and digestion."
              }
              {vegetable.name.toLowerCase().includes('potato') && 
                "Good source of potassium, vitamin C, and fiber. Provides sustained energy."
              }
              {vegetable.name.toLowerCase().includes('onion') && 
                "Contains quercetin and sulfur compounds. Supports immune system and heart health."
              }
              {vegetable.name.toLowerCase().includes('tomato') && 
                "Rich in lycopene, vitamin C, and folate. Supports skin health and heart function."
              }
            </p>
          </div>

          <div className="info-section">
            <h3>Storage Tips</h3>
            <p>
              Store in a cool, dry place away from direct sunlight. 
              {vegetable.type === 'organic' ? 
                ' Organic produce may have a shorter shelf life, so consume within a few days for best quality.' :
                ' Can be stored for longer periods when kept in proper conditions.'
              }
            </p>
          </div>
        </div>

        {/* Available Farmers Section */}
        {showFarmers && (
          <div className="farmers-section">
            <h2 className="farmers-title">Available Farmers</h2>
            <p className="farmers-subtitle">
              Connect directly with local farmers for fresh {vegetable.name.toLowerCase()}
            </p>
            
            <div className="farmers-grid">
              {availableFarmers.map(farmer => (
                <div key={farmer.id} className="farmer-card">
                  <div className="farmer-header">
                    <div className="farmer-image">
                      <img src={farmer.image} alt={farmer.name} />
                    </div>
                    <div className="farmer-basic-info">
                      <h3 className="farmer-name">{farmer.name}</h3>
                      <div className="farmer-rating">
                        <span className="rating-stars">
                          {'★'.repeat(Math.floor(farmer.rating))}
                          {farmer.rating % 1 !== 0 && '☆'}
                        </span>
                        <span className="rating-number">({farmer.rating})</span>
                      </div>
                    </div>
                  </div>

                  <div className="farmer-details">
                    <div className="detail-row">
                      <span className="detail-label">📍 Location:</span>
                      <span className="detail-value">{farmer.location}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📏 Distance:</span>
                      <span className="detail-value">{farmer.distance}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💰 Price:</span>
                      <span className="detail-value price">{farmer.price}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📦 Available:</span>
                      <span className="detail-value">{farmer.quantity}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📞 Contact:</span>
                      <span className="detail-value">{farmer.contact}</span>
                    </div>
                  </div>

                  <div className="farmer-description">
                    <p>{farmer.description}</p>
                  </div>

                  <div className="farmer-actions">
                    <button 
                      className="see-more-btn"
                      onClick={() => handleSeeMore(farmer)}
                    >
                      See More Details
                    </button>
                    <button className="contact-farmer-btn">
                      Contact Farmer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MoreDetails

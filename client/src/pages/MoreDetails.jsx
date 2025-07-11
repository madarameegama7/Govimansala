import React, { useState } from 'react'
import { useLocation} from 'react-router-dom'
import './styles/MoreDetails.css'

function MoreDetails() {
  const location = useLocation()
  const vegetable = location.state?.vegetable
  const fruit = location.state?.fruit
  const product = vegetable || fruit
  const [showSellers, setShowSellers] = useState(false)
  const [quantities, setQuantities] = useState({})

  const handleQuantityChange = (sellerId, newQuantity, maxQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantities(prev => ({
        ...prev,
        [sellerId]: newQuantity
      }))
    }
  }

  const getQuantity = (sellerId) => {
    return quantities[sellerId] || 1
  }

  const handleShowFarmers = () => {
    setShowSellers(!showSellers)
  }

  // Use farmers data from the product if available, otherwise use default sellers
  const availableSellers = product?.farmers || [
    {
      id: 1,
      name: "Green Valley Farms",
      harvestDate: "15th June 2025",
      price: "Rs.250/Kg",
      location: "Nuwara Eliya",
      availability: "Yes",
      availableQuantity: "100 Kg",
      offer: "15%",
      quality: "Premium"
    },
    {
      id: 2,
      name: "Saman Bandara's Farm",
      harvestDate: "10th June 2025",
      price: "Rs.210/Kg",
      location: "Nuwara Eliya",
      availability: "Yes",
      availableQuantity: "100 Kg",
      offer: "20%",
      quality: "Grade A"
    },
    {
      id: 3,
      name: "Fresh Roots Co.",
      harvestDate: "18th June 2025",
      price: "Rs.280/Kg",
      location: "Nuwara Eliya",
      availability: "Yes",
      availableQuantity: "100 Kg",
      offer: "25%",
      quality: "Organic"
    }
  ]

  
  const getProductDetails = (name, isVegetable = true) => {
    const productName = name.toLowerCase()
    
    if (isVegetable) {
      // Vegetable details
      if (productName.includes('carrot')) {
        return {
          plantingSeason: 'February-April, August-October',
          harvestSeason: 'April-June, October-December',
          suitableAreas: ['Nuwara Eliya', 'Badulla', 'Kandy', 'Matale', 'Bandarawela'],
        }
      } else if (productName.includes('brinjal') || productName.includes('eggplant')) {
        return {
          plantingSeason: 'March-May, September-November',
          harvestSeason: 'June-August, December-February',
          suitableAreas: ['Anuradhapura', 'Polonnaruwa', 'Kurunegala', 'Puttalam', 'Hambantota'],
        }
      } else if (productName.includes('potato')) {
        return {
          plantingSeason: 'January-March, August-September',
          harvestSeason: 'April-June, November-December',
          suitableAreas: ['Nuwara Eliya', 'Badulla', 'Welimada', 'Bandarawela', 'Haputale'],
        }
      } else if (productName.includes('onion')) {
        return {
          plantingSeason: 'October-December, February-March',
          harvestSeason: 'February-April, June-July',
          suitableAreas: ['Jaffna', 'Puttalam', 'Anuradhapura', 'Hambantota', 'Mannar'],
        }
      } else if (productName.includes('tomato')) {
        return {
          plantingSeason: 'March-May, September-November',
          harvestSeason: 'June-August, December-February',
          suitableAreas: ['Nuwara Eliya', 'Matale', 'Kandy', 'Ratnapura', 'Kegalle'],
        }
      }
    } else {
      // Fruit details
      if (productName.includes('avocado')) {
        return {
          plantingSeason: 'March-May, September-October',
          harvestSeason: 'July-September, January-March',
          suitableAreas: ['Kandy', 'Matale', 'Nuwara Eliya', 'Badulla', 'Kegalle'],
        }
      } else if (productName.includes('banana')) {
        return {
          plantingSeason: 'Year-round',
          harvestSeason: 'Year-round (12-15 months after planting)',
          suitableAreas: ['Hambantota', 'Kurunegala', 'Kegalle', 'Gampaha', 'Kalutara'],
        }
      } else if (productName.includes('guava')) {
        return {
          plantingSeason: 'March-May, September-November',
          harvestSeason: 'June-August, December-February',
          suitableAreas: ['Anuradhapura', 'Polonnaruwa', 'Kurunegala', 'Puttalam', 'Hambantota'],
        }
      } else if (productName.includes('mango')) {
        return {
          plantingSeason: 'May-June',
          harvestSeason: 'April-July',
          suitableAreas: ['Kurunegala', 'Puttalam', 'Anuradhapura', 'Hambantota', 'Jaffna'],
        }
      } else if (productName.includes('papaya')) {
        return {
          plantingSeason: 'Year-round',
          harvestSeason: 'Year-round (8-12 months after planting)',
          suitableAreas: ['Matara', 'Galle', 'Hambantota', 'Kurunegala', 'Puttalam'],
        }
      } else if (productName.includes('watermelon')) {
        return {
          plantingSeason: 'March-May, September-November',
          harvestSeason: 'June-August, December-February',
          suitableAreas: ['Ampara', 'Monaragala', 'Hambantota', 'Anuradhapura', 'Polonnaruwa'],
        }
      } else if (productName.includes('pineapple')) {
        return {
          plantingSeason: 'March-May, September-October',
          harvestSeason: 'April-June, October-December (18-24 months)',
          suitableAreas: ['Gampaha', 'Kalutara', 'Ratnapura', 'Kegalle', 'Kurunegala'],
        }
      }
    }
    
    // Default values if no specific details found
    return {
      plantingSeason: 'Year-round',
      harvestSeason: 'Seasonal',
      suitableAreas: ['Various regions across Sri Lanka'],
    }
  }

  if (!product) {
    return (
      <div className="more-details">
        <div className="more-details-container">
          <h1>Product Not Found</h1>
          <p>No product information available.</p>
        </div>
      </div>
    )
  }

  const isVegetable = !!vegetable
  const details = getProductDetails(product.name, isVegetable)

  return (
    <div className="more-details">
      <div className="more-details-container">
        
      
        <div className="product-details">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-main-image" />
            <div className="product-type-badge">
              <img src={product.icon} alt={product.type} className="type-icon" />
              <span className={`type-label ${product.type}`}>
                {product.type === 'organic' ? 'Organic' : 'Conventional'}
              </span>
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-description-section">
              <h3>About This {isVegetable ? 'Vegetable' : 'Fruit'}</h3>
              <p className="product-description">{product.description}</p>
              <div className="farming-summary">
                <p><strong>Planting Season:</strong> {details.plantingSeason}</p>
                <p><strong>Harvest Season:</strong> {details.harvestSeason}</p>
              </div>
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.type === 'organic' ? (
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
                {showSellers ? 'Hide' : 'Show'} Available Sellers
              </button>
            </div>
          </div>
        </div>

        {showSellers && (
          <div className="sellers-section">
            <div className="sellers-header">
              <div className="sellers-title-section">
                <h2>Available Sellers</h2>
                <p>Compare offers from multiple sellers</p>
              </div>
            </div>
            
            <div className="sellers-list">
              {availableSellers.map((seller) => (
                <div key={seller.id} className="seller-card">
                  <div className="seller-avatar">
                    <div className="avatar-circle">
                      <span>{seller.name.charAt(0)}</span>
                    </div>
                  </div>
                  
                  <div className="seller-info">
                    <h3 className="seller-name">{seller.name}</h3>
                    <div className="seller-details">
                      <div className="detail-row">
                        <span className="label">Harvest Date</span>
                        <span className="value">{seller.harvestDate}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Price</span>
                        <span className="value">{seller.price}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Location</span>
                        <span className="value">{seller.location}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Availability</span>
                        <span className="value available">{seller.availability}</span>
                      </div>
                      <div className="detail-row">
                        <span className='label'>Available Quantity</span>
                        <span className="value">{seller.availableQuantity}</span>
                        </div>
                    </div>
                  </div>
                

                  <div className="seller-actions">
                    <div className="quantity-selector">
                      <label className="quantity-label">Quantity (kg)</label>
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn minus"
                          onClick={() => handleQuantityChange(seller.id, getQuantity(seller.id) - 1, parseInt(seller.availableQuantity))}
                          disabled={getQuantity(seller.id) <= 1}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={getQuantity(seller.id)}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            const maxQty = parseInt(seller.availableQuantity);
                            handleQuantityChange(seller.id, value, maxQty);
                          }}
                          className="quantity-input"
                          min="1"
                          max={parseInt(seller.availableQuantity)}
                        />
                        <button 
                          className="quantity-btn plus"
                          onClick={() => handleQuantityChange(seller.id, getQuantity(seller.id) + 1, parseInt(seller.availableQuantity))}
                          disabled={getQuantity(seller.id) >= parseInt(seller.availableQuantity)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
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

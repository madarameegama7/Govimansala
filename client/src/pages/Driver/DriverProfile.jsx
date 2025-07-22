import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DriverProfile.css'

function DriverProfile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [editMode, setEditMode] = useState({
    personal: false,
    emergency: false,
    bank: false
  })
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [showLicenseDetails, setShowLicenseDetails] = useState(false)
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'Sunil Gamage',
    id: 'DRV001',
    phone: '+94 77 123 4567',
    email: 'sunilgamage@email.com',
    address: '123 Main Street, Kandy, Sri Lanka',
    dateOfBirth: '1985-03-15',
    nic: '198575123456',
    joinDate: '2023-05-15',
    emergencyContact: '+94 77 987 6543',
    emergencyContactName: 'Kamani Gamage',
    emergencyContactRelation: 'Wife',
    rating: 4.8,
    totalDeliveries: 247,
    profileImage: 'https://via.placeholder.com/150',
    bankAccount: {
      accountNumber: '****-****-****-5678',
      bank: 'Commercial Bank',
      branch: 'Kandy',
      accountHolderName: 'Sunil Gamage'
    }
  })

  const [licenseData, _setLicenseData] = useState({
    licenseNumber: 'B1234567',
    licenseType: 'Heavy Vehicle License',
    issueDate: '2020-03-15',
    expiryDate: '2027-03-15',
    issuingAuthority: 'Department of Motor Traffic',
    status: 'Valid',
    endorsements: ['Light Vehicle', 'Heavy Vehicle', 'Commercial Vehicle'],
    restrictions: 'None',
    uploaded: true,
    verified: true
  })

  const [insuranceData, _setInsuranceData] = useState({
    policyNumber: 'INS-789456123',
    provider: 'SLIC Insurance',
    policyType: 'Commercial Vehicle Insurance',
    coverageAmount: 'Rs. 5,000,000',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    premium: 'Rs. 45,000',
    status: 'Active',
    coverageDetails: ['Third Party Liability', 'Comprehensive Coverage', 'Goods in Transit'],
    uploaded: true,
    verified: true
  })

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: 'Small Lorry',
      brand: 'TATA',
      model: 'DIMO BATTA',
      plateNumber: 'DAA-1234',
      capacity: '1500 kg',
      year: '2020',
      color: 'White',
      fuelType: 'Diesel',
      engineCapacity: '2500 cc',
      isActive: true,
      condition: 'Excellent',
      mileage: '45,000 km',
      lastService: '2024-06-15',
      nextService: '2024-12-15',
      insuranceExpiry: '2025-01-15',
      registrationExpiry: '2025-03-15',
      totalDeliveries: 180,
      preferredAreas: ['Kandy', 'Matale', 'Nuwara Eliya', 'Colombo']
    },
    {
      id: 2,
      type: 'Van',
      brand: 'Nissan',
      model: 'Caravan',
      plateNumber: 'CAR-5678',
      capacity: '800 kg',
      year: '2019',
      color: 'Blue',
      fuelType: 'Petrol',
      engineCapacity: '2000 cc',
      isActive: false,
      condition: 'Good',
      mileage: '78,000 km',
      lastService: '2024-05-10',
      nextService: '2024-11-10',
      insuranceExpiry: '2024-12-20',
      registrationExpiry: '2025-02-20',
      totalDeliveries: 67,
      preferredAreas: ['Kandy', 'Matale']
    }
  ])

  const [newVehicle, setNewVehicle] = useState({
    type: '',
    brand: '',
    model: '',
    plateNumber: '',
    capacity: '',
    year: '',
    color: '',
    fuelType: '',
    engineCapacity: '',
    condition: '',
    preferredAreas: []
  })
  const [reviews, _setReviews] = useState([
    {
      id: 1,
      customerName: 'Kamatha Restaurant',
      rating: 5,
      date: '2024-07-15',
      comment: 'Excellent service! Very punctual and handled our vegetables with great care. Professional driver.',
      orderNumber: 'GOV-2024-001',
      deliveryType: 'Restaurant Delivery'
    },
    {
      id: 2,
      customerName: 'City Supermarket',
      rating: 4,
      date: '2024-07-10',
      comment: 'Good delivery service. Arrived on time and vegetables were fresh. Recommend for future deliveries.',
      orderNumber: 'GOV-2024-008',
      deliveryType: 'Supermarket Delivery'
    },
    {
      id: 3,
      customerName: 'Green Groceries',
      rating: 5,
      date: '2024-07-08',
      comment: 'Outstanding service! Very careful with organic vegetables. Communication was excellent throughout.',
      orderNumber: 'GOV-2024-012',
      deliveryType: 'Organic Delivery'
    },
    {
      id: 4,
      customerName: 'Hotel Paradise',
      rating: 4,
      date: '2024-07-05',
      comment: 'Professional service. Delivered premium vegetables on time. Minor delay but kept us informed.',
      orderNumber: 'GOV-2024-015',
      deliveryType: 'Hotel Delivery'
    },
    {
      id: 5,
      customerName: 'Royal Hotel',
      rating: 5,
      date: '2024-06-28',
      comment: 'Exceptional service! Very polite and professional. Handled our organic order perfectly.',
      orderNumber: 'GOV-2024-020',
      deliveryType: 'Premium Delivery'
    }
  ])

  const vehicleTypes = ['Small Lorry', 'Truck', 'Lorry', 'Van', 'Pickup']
  const vehicleBrands = ['TATA', 'Mahindra', 'Ashok Leyland', 'Nissan', 'Mitsubishi', 'Isuzu', 'Toyota']

  const handleSaveProfile = (section) => {
    setEditMode(prev => ({ ...prev, [section]: false }))
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} information updated successfully!`)
  }

  const handleAddVehicle = () => {
    if (newVehicle.type && newVehicle.brand && newVehicle.model && newVehicle.plateNumber) {
      const vehicle = {
        id: vehicles.length + 1,
        ...newVehicle,
        isActive: vehicles.length === 0,
        totalDeliveries: 0,
        mileage: '0 km',
        lastService: new Date().toISOString().split('T')[0],
        nextService: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        registrationExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
      setVehicles([...vehicles, vehicle])
      setNewVehicle({
        type: '',
        brand: '',
        model: '',
        plateNumber: '',
        capacity: '',
        year: '',
        color: '',
        fuelType: '',
        engineCapacity: '',
        condition: '',
        preferredAreas: []
      })
      setShowAddVehicle(false)
      alert('Vehicle added successfully!')
    } else {
      alert('Please fill in all required fields!')
    }
  }

  const handleSetActiveVehicle = (vehicleId) => {
    setVehicles(vehicles.map(v => ({
      ...v,
      isActive: v.id === vehicleId
    })))
  }

  const handleDeleteVehicle = (vehicleId) => {
    if (vehicles.length > 1) {
      if (window.confirm('Are you sure you want to delete this vehicle?')) {
        setVehicles(vehicles.filter(v => v.id !== vehicleId))
      }
    } else {
      alert('You must have at least one vehicle!')
    }
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const renderPersonalDetails = () => (
    <div className="orders-list">
      
      <div className="order-card">
        <div className="order-header">
          <div className="customer-section">
            <div className="customer-avatar-large">
              <img src={profileData.profileImage} alt="Profile" />
            </div>
            <div className="customer-info">
              <div className="customer-name">{profileData.name}</div>
              <div className="customer-phone">Driver ID: {profileData.id}</div>
            </div>
          </div>
          <div className="order-status">
            <span className="status-badge completed">Active Driver</span>
          </div>
        </div>

        <div className="route-summary">
          <div className="route-info">
            <div className="route-item">
              <i className="fas fa-star"></i>
              <span>{profileData.rating} Rating</span>
            </div>
            <div className="route-item">
              <i className="fas fa-calendar"></i>
              <span>Since {new Date(profileData.joinDate).toLocaleDateString('en-GB')}</span>
            </div>
          </div>
          <div className="distance-info">
            <div className="distance">{profileData.totalDeliveries}</div>
            <div className="time-estimate">Deliveries</div>
          </div>
        </div>
      </div>

      
      <div className="order-card">
        <div className="order-header">
          <div className="customer-section">
            <div className="customer-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="customer-info">
              <div className="customer-name">Personal Information</div>
              <div className="customer-phone">Basic details</div>
            </div>
          </div>
          <div className="order-actions">
            <button 
              className="action-btn primary"
              onClick={() => editMode.personal ? handleSaveProfile('personal') : setEditMode(prev => ({ ...prev, personal: true }))}
            >
              <i className={`fas ${editMode.personal ? 'fa-save' : 'fa-edit'}`}></i>
              {editMode.personal ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <label>Full Name</label>
            <input 
              type="text" 
              value={profileData.name}
              disabled={!editMode.personal}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            />
          </div>
          <div className="detail-row">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={profileData.phone}
              disabled={!editMode.personal}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            />
          </div>
          <div className="detail-row">
            <label>Email Address</label>
            <input 
              type="email" 
              value={profileData.email}
              disabled={!editMode.personal}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            />
          </div>
          <div className="detail-row">
            <label>Address</label>
            <input 
              type="text" 
              value={profileData.address}
              disabled={!editMode.personal}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
            />
          </div>
          <div className="detail-row">
            <label>NIC Number</label>
            <input 
              type="text" 
              value={profileData.nic}
              disabled={!editMode.personal}
              onChange={(e) => setProfileData({...profileData, nic: e.target.value})}
            />
          </div>
          <div className="detail-row">
            <label>Date of Birth</label>
            <input 
              type="date" 
              value={profileData.dateOfBirth}
              disabled={!editMode.personal}
              onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
            />
          </div>
        </div>
      </div>

      
      <div className="order-card">
        <div className="order-header">
          <div className="customer-section">
            <div className="customer-avatar">
              <i className="fas fa-phone"></i>
            </div>
            <div className="customer-info">
              <div className="customer-name">Emergency Contact</div>
              <div className="customer-phone">Emergency information</div>
            </div>
          </div>
          <div className="order-actions">
            <button 
              className="action-btn primary"
              onClick={() => editMode.emergency ? handleSaveProfile('emergency') : setEditMode(prev => ({ ...prev, emergency: true }))}
            >
              <i className={`fas ${editMode.emergency ? 'fa-save' : 'fa-edit'}`}></i>
              {editMode.emergency ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <label>Contact Name</label>
            <input 
              type="text" 
              value={profileData.emergencyContactName}
              disabled={!editMode.emergency}
              onChange={(e) => setProfileData({...profileData, emergencyContactName: e.target.value})}
            />
          </div>
          <div className="detail-row">
            <label>Contact Phone</label>
            <input 
              type="tel" 
              value={profileData.emergencyContact}
              disabled={!editMode.emergency}
              onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
            />
          </div>
        </div>
      </div>

      
      <div className="order-card">
        <div className="order-header">
          <div className="customer-section">
            <div className="customer-avatar">
              <i className="fas fa-university"></i>
            </div>
            <div className="customer-info">
              <div className="customer-name">Bank Account Details</div>
              <div className="customer-phone">Payment information</div>
            </div>
          </div>
          <div className="order-actions">
            <button 
              className="action-btn primary"
              onClick={() => editMode.bank ? handleSaveProfile('bank') : setEditMode(prev => ({ ...prev, bank: true }))}
            >
              <i className={`fas ${editMode.bank ? 'fa-save' : 'fa-edit'}`}></i>
              {editMode.bank ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <label>Account Number</label>
            <input 
              type="text" 
              value={profileData.bankAccount.accountNumber}
              disabled={!editMode.bank}
              onChange={(e) => setProfileData({
                ...profileData, 
                bankAccount: {...profileData.bankAccount, accountNumber: e.target.value}
              })}
            />
          </div>
          <div className="detail-row">
            <label>Bank Name</label>
            <input 
              type="text" 
              value={profileData.bankAccount.bank}
              disabled={!editMode.bank}
              onChange={(e) => setProfileData({
                ...profileData, 
                bankAccount: {...profileData.bankAccount, bank: e.target.value}
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderVehicleDetails = () => (
    <div className="orders-list">
      
      <div className="order-card">
        <div className="order-actions">
          <button 
            className="action-btn primary"
            onClick={() => setShowAddVehicle(true)}
          >
            <i className="fas fa-plus"></i>
            Add Vehicle
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => setShowLicenseDetails(true)}
          >
            <i className="fas fa-id-card"></i>
            License Details
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => setShowInsuranceDetails(true)}
          >
            <i className="fas fa-shield-alt"></i>
            Insurance Details
          </button>
        </div>
      </div>

      
      {vehicles.map(vehicle => (
        <div key={vehicle.id} className="order-card">
          <div className="order-header">
            <div className="customer-section">
              <div className="customer-avatar">
                <i className="fas fa-truck"></i>
              </div>
              <div className="customer-info">
                <div className="customer-name">{vehicle.brand} {vehicle.model}</div>
                <div className="customer-phone">{vehicle.plateNumber}</div>
              </div>
            </div>
            <div className="order-status">
              {vehicle.isActive ? (
                <span className="status-badge completed">Active</span>
              ) : (
                <span className="status-badge pending">Inactive</span>
              )}
            </div>
          </div>

          <div className="route-summary">
            <div className="route-info">
              <div className="route-item">
                <i className="fas fa-cog"></i>
                <span>{vehicle.type}</span>
              </div>
              <div className="route-item">
                <i className="fas fa-calendar"></i>
                <span>{vehicle.year}</span>
              </div>
              <div className="route-item">
                <i className="fas fa-gas-pump"></i>
                <span>{vehicle.fuelType}</span>
              </div>
            </div>
            <div className="distance-info">
              <div className="distance">{vehicle.capacity}</div>
              <div className="time-estimate">Capacity</div>
            </div>
          </div>

          <div className="order-summary">
            <div className="order-items">
              <span className="item-tag">Color: {vehicle.color}</span>
              <span className="item-tag">Condition: {vehicle.condition}</span>
            </div>
            
            <div className="order-amount">
              <div className="amount-label">Deliveries</div>
              <div className="amount-value">{vehicle.totalDeliveries || 0}</div>
            </div>
          </div>

          <div className="order-actions">
            {!vehicle.isActive && (
              <button 
                className="action-btn primary"
                onClick={() => handleSetActiveVehicle(vehicle.id)}
              >
                <i className="fas fa-check"></i>
                Set Active
              </button>
            )}
            <button 
              className="action-btn danger"
              onClick={() => handleDeleteVehicle(vehicle.id)}
            >
              <i className="fas fa-trash"></i>
              Delete
            </button>
          </div>
        </div>
      ))}

      
      {showAddVehicle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Vehicle</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddVehicle(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Vehicle Type *</label>
                  <select 
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                  >
                    <option value="">Select Type</option>
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Brand *</label>
                  <select 
                    value={newVehicle.brand}
                    onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                  >
                    <option value="">Select Brand</option>
                    {vehicleBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Model *</label>
                  <input 
                    type="text" 
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                    placeholder="Enter model"
                  />
                </div>
                <div className="form-group">
                  <label>Plate Number *</label>
                  <input 
                    type="text" 
                    value={newVehicle.plateNumber}
                    onChange={(e) => setNewVehicle({...newVehicle, plateNumber: e.target.value})}
                    placeholder="XXX-1234"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="action-btn secondary"
                onClick={() => setShowAddVehicle(false)}
              >
                Cancel
              </button>
              <button 
                className="action-btn primary"
                onClick={handleAddVehicle}
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showLicenseDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>License Details</h3>
              <button 
                className="close-btn"
                onClick={() => setShowLicenseDetails(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="info-section">
                <p><strong>License Number:</strong> {licenseData.licenseNumber}</p>
                <p><strong>Type:</strong> {licenseData.licenseType}</p>
                <p><strong>Expiry Date:</strong> {new Date(licenseData.expiryDate).toLocaleDateString('en-GB')}</p>
                <p><strong>Status:</strong> {licenseData.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {showInsuranceDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Insurance Details</h3>
              <button 
                className="close-btn"
                onClick={() => setShowInsuranceDetails(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="info-section">
                <p><strong>Policy Number:</strong> {insuranceData.policyNumber}</p>
                <p><strong>Provider:</strong> {insuranceData.provider}</p>
                <p><strong>Type:</strong> {insuranceData.policyType}</p>
                <p><strong>Expiry Date:</strong> {new Date(insuranceData.expiryDate).toLocaleDateString('en-GB')}</p>
                <p><strong>Status:</strong> {insuranceData.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderReviews = () => {
    const averageRating = calculateAverageRating()
    const totalReviews = reviews.length

    return (
      <div className="orders-list">
        
        <div className="order-card">
          <div className="route-summary">
            <div className="route-info">
              <div className="route-item">
                <i className="fas fa-star"></i>
                <span>Overall Rating: {averageRating}</span>
              </div>
              <div className="route-item">
                <i className="fas fa-comments"></i>
                <span>Total Reviews: {totalReviews}</span>
              </div>
              <div className="route-item">
                <i className="fas fa-thumbs-up"></i>
                <span>Positive: {reviews.filter(r => r.rating >= 4).length}</span>
              </div>
            </div>
            <div className="distance-info">
              <div className="distance">{reviews.filter(r => r.rating === 5).length}</div>
              <div className="time-estimate">5-Star Reviews</div>
            </div>
          </div>
        </div>

        
        {reviews.map(review => (
          <div key={review.id} className="order-card">
            <div className="order-header">
              <div className="customer-section">
                <div className="customer-avatar">
                  {review.customerName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="customer-info">
                  <div className="customer-name">{review.customerName}</div>
                  <div className="customer-phone">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${index < review.rating ? 'filled' : ''}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-status">
                <span className="status-badge completed">
                  {new Date(review.date).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            {review.comment && (
              <div className="route-summary">
                <div className="route-info">
                  <div className="route-item">
                    <i className="fas fa-quote-left"></i>
                    <span>"{review.comment}"</span>
                  </div>
                </div>
              </div>
            )}

            <div className="order-summary">
              <div className="order-items">
                <span className="item-tag">Order #{review.orderNumber}</span>
                {review.deliveryType && (
                  <span className="item-tag">{review.deliveryType}</span>
                )}
              </div>
              
              <div className="order-amount">
                <div className="amount-label">Delivery</div>
                <div className="amount-value">
                  Completed
                </div>
              </div>
            </div>

            {review.response && (
              <div className="order-actions">
                <div className="response-section">
                  <strong>Your Response:</strong>
                  <p>{review.response}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        
        {reviews.length === 0 && (
          <div className="order-card">
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="empty-title">No Reviews Yet</div>
              <div className="empty-subtitle">
                Complete your first delivery to start receiving reviews!
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'personal': return renderPersonalDetails()
      case 'vehicles': return renderVehicleDetails()
      case 'reviews': return renderReviews()
      default: return renderPersonalDetails()
    }
  }

  return (
    <div className="simple-order-dashboard">
      
      <div className="dashboard-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="page-title">
            <h1>Driver Profile</h1>
            <span className="subtitle">Manage your profile information</span>
          </div>
        </div>

        <div className="header-center">
          
        </div>

        <div className="header-right">
          
        </div>
      </div>

      {/* Navigation Tabs - Now below header */}
      <div className="tabs-section">
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Details
          </button>
          <button 
            className={`tab ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            Vehicle Details
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{profileData.rating}</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{profileData.totalDeliveries}</div>
              <div className="stat-label">Total Deliveries</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-car"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{vehicles.length}</div>
              <div className="stat-label">Vehicles</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{reviews.length}</div>
              <div className="stat-label">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default DriverProfile

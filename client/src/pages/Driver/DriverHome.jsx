import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DriverProfile from './DriverProfile'
import './DriverHome.css'
import './OrderDashboard.css'
import './Tasks.css'
import './Sections.css'

function DriverHome() {
  const [activeSection, setActiveSection] = useState('orders')
  const [showAllOrders, setShowAllOrders] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const navigate = useNavigate()

  const handleMyProfileClick = () => {
    navigate("/driver/profile"); // make sure the path matches the one in your router
  };

  // Sample driver data
  const [driverData] = useState({
    name: 'Sunil Gaage',
    id: 'DRV001',
    phone: '+94 77 123 4567',
    email: 'sunilgamage@email.com',
    address: '123 Main Street, Kandy, Sri Lanka',
    dateOfBirth: '1985-03-15',
    licenseNumber: 'B1234567',
    licenseExpiry: '2027-03-15',
    emergencyContact: '+94 77 987 6543',
    rating: 4.8,
    totalDeliveries: 247,
    joinDate: '2023-05-15',
    vehicle: {
      type: 'Small Lorry',
      model: 'TATA DIMO',
      plateNumber: 'DAA-1234',
      capacity: '1500 kg'
    },
    coverageAreas: ['Kandy', 'Matale', 'Nuwara Eliya', 'Colombo'],
    bankAccount: {
      accountNumber: '****-****-****-5678',
      bank: 'Commercial Bank',
      branch: 'Kandy'
    }
  })


  // Sample tasks data
  const [tasks] = useState([
    {
      id: 'TASK001',
      status: 'available',
      pickup: 'Anura Farm',
      delivery: 'Kamatha Supermarket',
      items: 'Potatoes 100kg',
      payment: 1200,
      distance: '120 km',
      estimatedTime: '2.5 hours'
    },
    {
      id: 'TASK002',
      status: 'in-progress',
      pickup: 'Sanath Farm',
      delivery: 'Kavindu Supermarket',
      items: 'Carrot 50kg',
      payment: 2800,
      distance: '95 km',
      estimatedTime: '3 hours'
    },
    {
      id: 'TASK003',
      status: 'available',
      pickup: 'Kandy Organic Farm',
      delivery: 'Ranathunga Store',
      items: 'Organic Carrot 50kg',
      payment: 1500,
      distance: '140 km',
      estimatedTime: '3.5 hours'
    }
  ])

  // Sample delivery history
  const [deliveryHistory] = useState([
    {
      id: 'TASK098',
      date: '2024-07-17',
      pickup: 'Sanath Farm',
      delivery: 'Wickramasinghe Store',
      payment: 1800,
      status: 'completed',
      rating: 5
    },
    {
      id: 'TASK097',
      date: '2024-07-16',
      pickup: 'Anura Farm',
      delivery: 'Wijitha Food City',
      payment: 2200,
      status: 'completed',
      rating: 4
    },
    {
      id: 'TASK096',
      date: '2024-07-15',
      pickup: 'Anura Govi Kamatha',
      delivery: 'Kandy Super Store',
      payment: 1600,
      status: 'completed',
      rating: 5
    }
  ])

  // Sample messages
  const [messages] = useState([
    {
      id: 1,
      from: 'Support Team',
      subject: 'Welcome to Govimansala',
      message: 'Thank you for joining our platform. Here are some tips to get started...',
      date: '2024-07-18',
      read: false
    },
    {
      id: 2,
      from: 'Customer',
      subject: 'Delivery Update Request',
      message: 'Hi, could you please provide an update on my delivery scheduled for today?',
      date: '2024-07-17',
      read: true
    },
    {
      id: 3,
      from: 'Admin',
      subject: 'Payment Processed',
      message: 'Your weekly payment of Rs. 18,500 has been processed successfully.',
      date: '2024-07-16',
      read: true
    }
  ])

  // Sample orders data for order dashboard
  const [orders] = useState([
    {
      id: 'ORD001',
      orderNumber: 'GOV-2024-001',
      customerName: 'Kamatha Restaurant',
      customerPhone: '+94 77 456 7890',
      customerAvatar: 'KR',
      status: 'assigned',
      priority: 'high',
      pickupTime: '2024-07-19 09:00',
      deliveryTime: '2024-07-19 14:00',
      totalWeight: '200kg',
      totalDistance: '45km',
      estimatedTime: '4.5 hours',
      locations: [
        {
          type: 'pickup',
          name: 'Karunarathna Farm',
          address: '123 Farm Road, Matale',
          contactPhone: '+94 77 123 4567',
          coordinates: { lat: 7.4675, lng: 80.6234 },
          items: 'Tomatoes 80kg',
          distance: 0
        },
        {
          type: 'pickup', 
          name: 'Green Farm',
          address: '456 Valley Road, Kandy',
          contactPhone: '+94 77 234 5678',
          coordinates: { lat: 7.2906, lng: 80.6337 },
          items: 'Tomatoes 70kg',
          distance: 15
        },
        {
          type: 'pickup',
          name: 'Ape Kamatha Farm',
          address: '789 Market Street, Nuwara Eliya',
          contactPhone: '+94 77 345 6789', 
          coordinates: { lat: 6.9497, lng: 80.7891 },
          items: 'Tomatoes 50kg',
          distance: 25
        },
        {
          type: 'delivery',
          name: 'Kamatha Restaurant',
          address: '321 Restaurant Lane, Colombo',
          contactPhone: '+94 77 456 7890',
          coordinates: { lat: 6.9271, lng: 79.8612 },
          items: 'All Tomatoes 200kg',
          distance: 95
        }
      ],
      products: [
        { name: 'Tomatoes', quantity: '80 kg', price: 4800, location: 'Karunarathna Farm' },
        { name: 'Tomatoes', quantity: '70 kg', price: 4200, location: 'Green Farm' },
        { name: 'Tomatoes', quantity: '50 kg', price: 3000, location: 'Ape Kamatha Farm' }
      ],
      subtotal: 12000,
      deliveryFee: 450,
      totalWithDelivery: 12450,
      specialInstructions: 'Handle vegetables carefully. Restaurant delivery - use rear entrance.'
    },
    {
      id: 'ORD002', 
      orderNumber: 'GOV-2024-002',
      customerName: 'City Supermarket',
      customerPhone: '+94 77 666 5678',
      customerAvatar: 'CS',
      status: 'pending',
      priority: 'medium',
      pickupTime: '2024-07-19 10:30',
      deliveryTime: '2024-07-19 15:30',
      totalWeight: '150kg',
      totalDistance: '35km', 
      estimatedTime: '3.5 hours',
      locations: [
        {
          type: 'pickup',
          name: 'Vegetable Market Kandy',
          address: '555 Market Road, Kandy',
          contactPhone: '+94 77 555 1234',
          coordinates: { lat: 7.2906, lng: 80.6337 },
          items: 'Mixed Vegetables 150kg',
          distance: 0
        },
        {
          type: 'delivery',
          name: 'City Supermarket',
          address: '777 City Center, Colombo',
          contactPhone: '+94 77 666 5678',
          coordinates: { lat: 6.9271, lng: 79.8612 },
          items: 'Mixed Vegetables 150kg',
          distance: 120
        }
      ],
      products: [
        { name: 'Mixed Vegetables', quantity: '150 kg', price: 7500, location: 'Vegetable Market Kandy' }
      ],
      subtotal: 7500,
      deliveryFee: 300,
      totalWithDelivery: 7800,
      specialInstructions: 'Deliver to loading dock at rear of supermarket.'
    },
    {
      id: 'ORD003',
      orderNumber: 'GOV-2024-003', 
      customerName: 'Hotel Paradise',
      customerPhone: '+94 77 888 2222',
      customerAvatar: 'HP',
      status: 'in-progress',
      priority: 'urgent',
      pickupTime: '2024-07-19 08:00',
      deliveryTime: '2024-07-19 12:00',
      totalWeight: '100kg',
      totalDistance: '25km',
      estimatedTime: '2.5 hours',
      locations: [
        {
          type: 'pickup',
          name: 'Premium Organic Farm',
          address: '999 Premium Road, Matale',
          contactPhone: '+94 77 999 1111',
          coordinates: { lat: 7.4675, lng: 80.6234 },
          items: 'Premium Vegetables 100kg',
          distance: 0
        },
        {
          type: 'delivery',
          name: 'Hotel Paradise',
          address: '123 Paradise Street, Kandy',
          contactPhone: '+94 77 888 2222',
          coordinates: { lat: 7.2906, lng: 80.6337 },
          items: 'Premium Vegetables 100kg',
          distance: 45
        }
      ],
      products: [
        { name: 'Premium Vegetables', quantity: '100 kg', price: 8500, location: 'Premium Organic Farm' }
      ],
      subtotal: 8500,
      deliveryFee: 200,
      totalWithDelivery: 8700,
      specialInstructions: 'Premium quality required. Contact chef upon arrival.'
    },
    {
      id: 'ORD004',
      orderNumber: 'GOV-2024-004',
      customerName: 'Green Groceries',
      customerPhone: '+94 77 999 0000',
      customerAvatar: 'GG',
      status: 'assigned',
      priority: 'medium',
      pickupTime: '2024-07-19 14:00',
      deliveryTime: '2024-07-19 18:00',
      totalWeight: '80kg',
      totalDistance: '30km',
      estimatedTime: '2 hours',
      locations: [
        {
          type: 'pickup',
          name: 'Fresh Valley Farm',
          address: '456 Valley Street, Kandy',
          contactPhone: '+94 77 777 8888',
          coordinates: { lat: 7.2906, lng: 80.6337 },
          items: 'Fresh Vegetables 80kg',
          distance: 0
        },
        {
          type: 'delivery',
          name: 'Green Groceries',
          address: '888 Market Street, Galle',
          contactPhone: '+94 77 999 0000',
          coordinates: { lat: 6.0535, lng: 80.2210 },
          items: 'Fresh Vegetables 80kg',
          distance: 125
        }
      ],
      products: [
        { name: 'Fresh Vegetables', quantity: '80 kg', price: 4000, location: 'Fresh Valley Farm' }
      ],
      subtotal: 4000,
      deliveryFee: 250,
      totalWithDelivery: 4250,
      specialInstructions: 'Check vegetables for freshness before delivery.'
    },
    {
      id: 'ORD005',
      orderNumber: 'GOV-2024-005',
      customerName: 'Royal Hotel',
      customerPhone: '+94 77 333 4444',
      customerAvatar: 'RH',
      status: 'pending',
      priority: 'low',
      pickupTime: '2024-07-19 16:00',
      deliveryTime: '2024-07-19 20:00',
      totalWeight: '120kg',
      totalDistance: '50km',
      estimatedTime: '3 hours',
      locations: [
        {
          type: 'pickup',
          name: 'Highland Organic',
          address: '123 Highland Road, Nuwara Eliya',
          contactPhone: '+94 77 111 2222',
          coordinates: { lat: 6.9497, lng: 80.7891 },
          items: 'Organic Vegetables 120kg',
          distance: 0
        },
        {
          type: 'delivery',
          name: 'Royal Hotel',
          address: '555 Royal Avenue, Colombo',
          contactPhone: '+94 77 333 4444',
          coordinates: { lat: 6.9271, lng: 79.8612 },
          items: 'Organic Vegetables 120kg',
          distance: 180
        }
      ],
      products: [
        { name: 'Organic Vegetables', quantity: '120 kg', price: 9600, location: 'Highland Organic' }
      ],
      subtotal: 9600,
      deliveryFee: 400,
      totalWithDelivery: 10000,
      specialInstructions: 'Organic certification required. Handle with care.'
    }
  ])

  const handleAcceptTask = (taskId) => {
    alert(`Task ${taskId} accepted! You can start the delivery.`)
  }

  // Calculate optimized route based on distance
  const optimizeRoute = (locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    // Sort pickups by distance (nearest first)
    const sortedPickups = pickups.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    
    // Return optimized route: pickups first, then deliveries
    return [...sortedPickups, ...deliveries];
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleNavigateToOrder = (order) => {
    navigate('/driver-navigation', {
      state: {
        orderData: order,
        orderDetails: order
      }
    })
  }

  const handleRequestOrder = (orderId) => {
    alert(`Order ${orderId} requested! You can start the delivery process.`)
  }

  const renderOrderDashboard = () => (
    <div className="order-dashboard-content">
      {/* Header with Welcome Message */}
      <div className="order-dashboard-header">
        <div className="header-left">
          <h1> Welcome back, {driverData.name}!</h1>
          <p>Ready to start your delivery journey today? Manage your orders and track your progress below.</p>
        </div>
      </div>

      {/* Welcome Action Buttons */}
      <div className="welcome-actions">
        <div className="action-buttons">
          <button 
            className="welcome-btn primary"
            onClick={() => setActiveSection('orders')}
          >
            <div className="btn-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Orders" style={{width: '24px', height: '24px'}} />
            </div>
            <div className="btn-text">View My Orders</div>
          </button>
          <button 
            className="welcome-btn secondary"
            onClick={() => setActiveSection('tasks')}
          >
            <div className="btn-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/411/411763.png" alt="Truck" style={{width: '24px', height: '24px'}} />
            </div>
            <div className="btn-text">Browse Tasks</div>
          </button>
          <button 
            className="welcome-btn secondary"
            onClick={() => setActiveSection('history')}
          >
            <div className="btn-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828833.png" alt="Analytics" style={{width: '24px', height: '24px'}} />
            </div>
            <div className="btn-text">View History</div>
          </button>
          <button 
            className="welcome-btn secondary"
            onClick={handleMyProfileClick}
          >
            <div className="btn-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" style={{width: '24px', height: '24px'}} />
            </div>
            <div className="btn-text">My Profile</div>
          </button>
        </div>
      </div>


      {/* Stats */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{orders.filter(o => o.status === 'assigned').length}</div>
              <div className="stat-label">Assigned Orders</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-road"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{orders.filter(o => o.status === 'in-progress').length}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">Rs. 3,200</div>
              <div className="stat-label">Today's Earnings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="orders-main">
        <div className="section-header">
          <div className="section-title-area">
            {showAllOrders && (
              <button 
                className="back-btn"
                onClick={() => setShowAllOrders(false)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            )}
            <h2>{showAllOrders ? `All Orders (${orders.length})` : 'My Orders'}</h2>
          </div>
          <div className="order-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Assigned</button>
            <button className="filter-btn">In Progress</button>
            <button className="filter-btn">Pending</button>
          </div>
        </div>

        <div className="orders-grid">
          {(showAllOrders ? orders : orders.slice(0, 2)).map(order => (
            <div 
              key={order.id} 
              className={`order-card ${order.status}`}
              onClick={() => handleOrderClick(order)}
            >
              <div className="order-header">
                <div className="order-number">{order.orderNumber}</div>
                <div className="order-status" style={{ 
                  backgroundColor: order.status === 'assigned' ? '#0A5446' : 
                                   order.status === 'in-progress' ? '#2563eb' :
                                   order.status === 'pending' ? '#ff6b35' : '#6c757d'
                }}>
                  {order.status.replace('-', ' ')}
                </div>
              </div>

              <div className="order-customer">
                <div className="customer-avatar">
                  {order.customerName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="customer-info">
                  <div className="customer-name">{order.customerName}</div>
                  <div className="customer-phone">
                    {order.locations.find(l => l.type === 'delivery')?.contactPhone || 'N/A'}
                  </div>
                </div>
                <div className="order-time">
                  <div className="time-label">Delivery</div>
                  <div className="time-value">
                    {new Date(order.deliveryTime).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>

              <div className="route-summary">
                <div className="route-info">
                  <div className="route-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{order.locations.filter(l => l.type === 'pickup').length} Pickup(s)</span>
                  </div>
                  <div className="route-item">
                    <i className="fas fa-home"></i>
                    <span>{order.locations.filter(l => l.type === 'delivery').length} Delivery</span>
                  </div>
                </div>
                <div className="distance-info">
                  <div className="distance">{order.totalDistance}</div>
                  <div className="time-estimate">{order.estimatedTime}</div>
                </div>
              </div>

              <div className="order-summary">
                <div className="order-items">
                  {order.locations.slice(0, 2).map((location, index) => (
                    <span key={index} className="item-tag">
                      {location.items}
                    </span>
                  ))}
                  {order.locations.length > 2 && (
                    <span className="more-items">+{order.locations.length - 2} more</span>
                  )}
                </div>
                
                <div className="order-amount">
                  <div className="amount-label">Weight</div>
                  <div className="amount-value">{order.totalWeight}</div>
                </div>
              </div>

              {/* Show route overview only when showing all orders */}
              {showAllOrders && (
                <div className="order-locations">
                  <h4>Route Overview:</h4>
                  <div className="locations-list">
                    {order.locations.map((location, index) => (
                      <div key={index} className={`location-item ${location.type}`}>
                        <div className="location-number">{index + 1}</div>
                        <div className="location-details">
                          <div className="location-name">
                            <img 
                              src={location.type === 'pickup' ? 
                                "https://cdn-icons-png.flaticon.com/512/684/684908.png" : 
                                "https://cdn-icons-png.flaticon.com/512/619/619153.png"
                              } 
                              alt={location.type} 
                              style={{width: '16px', height: '16px', marginRight: '5px'}} 
                            />
                            {location.name}
                          </div>
                          <div className="location-address">{location.address}</div>
                          <div className="location-items">{location.items}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="order-actions">
                {order.status === 'assigned' && (
                  <>
                    <button 
                      className="action-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToOrder(order);
                      }}
                    >
                      <i className="fas fa-route"></i>
                      View Route
                    </button>
                    <button 
                      className="action-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestOrder(order.id);
                      }}
                    >
                      <i className="fas fa-check"></i>
                      Request Order
                    </button>
                  </>
                )}
                
                {order.status === 'in-progress' && (
                  <>
                    <button 
                      className="action-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToOrder(order);
                      }}
                    >
                      <i className="fas fa-route"></i>
                      Navigate
                    </button>
                    <button 
                      className="action-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle contact customer
                      }}
                    >
                      <i className="fas fa-phone"></i>
                      Contact
                    </button>
                  </>
                )}
                
                {order.status === 'pending' && (
                  <button className="action-btn disabled">
                    <i className="fas fa-clock"></i>
                    Waiting for Confirmation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {!showAllOrders && orders.length > 2 && (
          <div className="see-more-section">
            <button 
              className="btn-see-more"
              onClick={() => setShowAllOrders(true)}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" 
                alt="Orders" 
                style={{width: '16px', height: '16px', marginRight: '5px'}} 
              />
              See All Orders ({orders.length})
            </button>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="details-section">
                <h4>Order Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Order Number:</span>
                    <span className="value">{selectedOrder.orderNumber}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Customer:</span>
                    <span className="value">{selectedOrder.customerName}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone:</span>
                    <span className="value">
                      {selectedOrder.locations.find(l => l.type === 'delivery')?.contactPhone || 'N/A'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span className="value">{selectedOrder.status}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Priority:</span>
                    <span className="value">{selectedOrder.priority}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Total Weight:</span>
                    <span className="value">{selectedOrder.totalWeight}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Total Distance:</span>
                    <span className="value">{selectedOrder.totalDistance}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Estimated Time:</span>
                    <span className="value">{selectedOrder.estimatedTime}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h4>Optimized Route</h4>
                <div className="route-timeline">
                  {optimizeRoute(selectedOrder.locations).map((location, index) => (
                    <div key={index} className="timeline-item">
                      <div className={`timeline-icon ${location.type}`}>
                        <i className={location.type === 'pickup' ? 'fas fa-store' : 'fas fa-home'}></i>
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-title">{location.type === 'pickup' ? 'Pickup' : 'Delivery'}</div>
                        <div className="timeline-subtitle">{location.name}</div>
                        <div className="timeline-address">{location.address}</div>
                        <div className="timeline-phone">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/724/724664.png" 
                            alt="Phone" 
                            style={{width: '14px', height: '14px', marginRight: '3px'}} 
                          />
                          {location.contactPhone}
                        </div>
                        <div className="timeline-items">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                            alt="Package" 
                            style={{width: '14px', height: '14px', marginRight: '3px'}} 
                          />
                          {location.items}
                        </div>
                        {location.distance > 0 && (
                          <div className="timeline-distance">{location.distance} km from previous</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-section">
                <h4>Products</h4>
                <div className="products-list">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="product-item">
                      <div className="product-info">
                        <div className="product-name">{product.name}</div>
                        <div className="product-quantity">{product.quantity}</div>
                        <div className="product-location">From: {product.location}</div>
                      </div>
                      <div className="product-price">Rs. {product.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Delivery Fee:</span>
                    <span>Rs. {selectedOrder.deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>Rs. {selectedOrder.totalWithDelivery.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div className="details-section">
                  <h4>Special Instructions</h4>
                  <div className="instructions-text">
                    {selectedOrder.specialInstructions}
                  </div>
                </div>
              )}

              <div className="details-section">
                <h4>Route Actions</h4>
                <div className="modal-actions">
                  {selectedOrder.status === 'assigned' && (
                    <>
                      <button 
                        className="action-btn secondary"
                        onClick={() => {
                          setSelectedOrder(null);
                          handleNavigateToOrder(selectedOrder);
                        }}
                      >
                        <i className="fas fa-route"></i>
                        Start Navigation
                      </button>
                      <button 
                        className="action-btn primary"
                        onClick={() => {
                          setSelectedOrder(null);
                          handleRequestOrder(selectedOrder.id);
                        }}
                      >
                        <i className="fas fa-check"></i>
                        Request Order
                      </button>
                    </>
                  )}
                  
                  {selectedOrder.status === 'in-progress' && (
                    <>
                      <button 
                        className="action-btn primary"
                        onClick={() => {
                          setSelectedOrder(null);
                          handleNavigateToOrder(selectedOrder);
                        }}
                      >
                        <i className="fas fa-route"></i>
                        Continue Navigation
                      </button>
                      <button 
                        className="action-btn secondary"
                      >
                        <i className="fas fa-phone"></i>
                        Contact Customer
                      </button>
                    </>
                  )}
                  
                  {selectedOrder.status === 'pending' && (
                    <button className="action-btn disabled">
                      <i className="fas fa-clock"></i>
                      Waiting for Confirmation
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderTasks = () => (
    <div className="tasks-content">
      <div className="tasks-header">
        <h2>My Tasks</h2>
        <div className="task-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Available</button>
          <button className="filter-btn">In Progress</button>
          <button className="filter-btn">Completed</button>
        </div>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${task.status}`}>
            <div className="task-header">
              <div className="task-info">
                <span className="task-id">#{task.id}</span>
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
                <span className={`status-badge ${task.status}`}>
                  {task.status}
                </span>
              </div>
              <div className="task-payment">
                <span className="amount">Rs. {task.payment.toLocaleString()}</span>
                <span className="distance">{task.distance}</span>
              </div>
            </div>
            <div className="task-route">
              <div className="route-point pickup">
                <i className="fas fa-map-marker-alt"></i>
                <span>{task.pickup}</span>
              </div>
              <div className="route-arrow">→</div>
              <div className="route-point delivery">
                <i className="fas fa-flag"></i>
                <span>{task.delivery}</span>
              </div>
            </div>
            <div className="task-details">
              <span className="items">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                  alt="Package" 
                  style={{width: '16px', height: '16px', marginRight: '5px'}} 
                />
                {task.items}
              </span>
              <span className="time">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png" 
                  alt="Clock" 
                  style={{width: '16px', height: '16px', marginRight: '5px'}} 
                />
                {task.estimatedTime}
              </span>
            </div>
            <div className="task-actions">
              {task.status === 'available' && (
                <>
                  <button className="btn-secondary">View Route</button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleAcceptTask(task.id)}
                  >
                    Accept Task
                  </button>
                </>
              )}
              {task.status === 'in-progress' && (
                <>
                  <button className="btn-secondary">Contact Customer</button>
                  <button className="btn-primary">Update Status</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHistory = () => (
    <div className="history-content">
      <div className="history-header">
        <h2>Delivery History</h2>
        <div className="history-filters">
          <select className="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>
      <div className="history-list">
        {deliveryHistory.map(delivery => (
          <div key={delivery.id} className="history-card">
            <div className="history-header">
              <div className="history-info">
                <span className="history-id">#{delivery.id}</span>
                <span className="history-date">{delivery.date}</span>
              </div>
              <div className="history-rating">
                {[...Array(delivery.rating)].map((_, index) => (
                  <img 
                    key={index}
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" 
                    alt="Star" 
                    style={{width: '16px', height: '16px', marginRight: '2px'}} 
                  />
                ))}
              </div>
            </div>
            <div className="history-route">
              <span className="pickup">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/447/447031.png" 
                  alt="Location" 
                  style={{width: '16px', height: '16px', marginRight: '5px'}} 
                />
                {delivery.pickup}
              </span>
              <span className="arrow">→</span>
              <span className="delivery">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                  alt="Target" 
                  style={{width: '16px', height: '16px', marginRight: '5px'}} 
                />
                {delivery.delivery}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="messages-content">
      <div className="messages-header">
        <h2>Messages</h2>
        <button className="btn-primary">Mark All Read</button>
      </div>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className={`message-card ${!message.read ? 'unread' : ''}`}>
            <div className="message-header">
              <div className="message-info">
                <span className="sender">{message.from}</span>
                <span className="date">{message.date}</span>
              </div>
              {!message.read && <div className="unread-indicator"></div>}
            </div>
            <div className="message-subject">{message.subject}</div>
            <div className="message-preview">{message.message}</div>
            <div className="message-actions">
              <button className="btn-secondary">Reply</button>
              <button className="btn-primary">Mark as Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )



  const renderContent = () => {
    switch(activeSection) {
      case 'orders': return renderOrderDashboard()
      case 'profile': return <DriverProfile />
      case 'tasks': return renderTasks()
      case 'history': return renderHistory()
      case 'messages': return renderMessages()
      default: return renderOrderDashboard()
    }
  }

  return (
    <div className="driver-home">
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}


export default DriverHome

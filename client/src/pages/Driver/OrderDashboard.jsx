import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderDashboard.css';

const OrderDashboard = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState(null);

  // Sample data with multi-location orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerName: 'Kamal Perera',
      customerPhone: '+94 71 234 5678',
      customerAvatar: 'KP',
      status: 'pending',
      priority: 'high',
      deliveryTime: '2:30 PM',
      locations: [
        {
          type: 'pickup',
          name: 'Green Valley Farm',
          address: '123 Farm Road, Kandy',
          coordinates: { lat: 7.2906, lng: 80.6337 },
          distance: 0 // Starting point
        },
        {
          type: 'pickup',
          name: 'Organic Paradise',
          address: '456 Hill Street, Peradeniya',
          coordinates: { lat: 7.2541, lng: 80.5976 },
          distance: 8.5 // km from first pickup
        },
        {
          type: 'delivery',
          name: 'Kamal Perera',
          address: '789 Temple Street, Colombo 03',
          coordinates: { lat: 6.9271, lng: 79.8612 },
          distance: 115 // km from last pickup
        }
      ],
      products: [
        { name: 'Organic Carrots', quantity: '2 kg', price: 450, location: 'Green Valley Farm' },
        { name: 'Fresh Tomatoes', quantity: '1 kg', price: 280, location: 'Green Valley Farm' },
        { name: 'Lettuce', quantity: '1 head', price: 180, location: 'Organic Paradise' }
      ],
      subtotal: 910,
      deliveryFee: 250,
      totalWithDelivery: 1160,
      totalDistance: 123.5,
      estimatedTime: '3h 15min',
      specialInstructions: 'Please call before delivery. Handle vegetables carefully.'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'Nimal Silva',
      customerPhone: '+94 77 987 6543',
      customerAvatar: 'NS',
      status: 'approved',
      priority: 'medium',
      deliveryTime: '3:00 PM',
      locations: [
        {
          type: 'pickup',
          name: 'Sunshine Vegetables',
          address: '789 Market Street, Galle',
          coordinates: { lat: 6.0329, lng: 80.2168 },
          distance: 0
        },
        {
          type: 'delivery',
          name: 'Nimal Silva',
          address: '321 Beach Road, Mount Lavinia',
          coordinates: { lat: 6.8378, lng: 79.8639 },
          distance: 125
        }
      ],
      products: [
        { name: 'Banana', quantity: '2 dozen', price: 600, location: 'Sunshine Vegetables' },
        { name: 'Pineapple', quantity: '1 piece', price: 450, location: 'Sunshine Vegetables' }
      ],
      subtotal: 1050,
      deliveryFee: 180,
      totalWithDelivery: 1230,
      totalDistance: 125,
      estimatedTime: '2h 30min',
      specialInstructions: null
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customerName: 'Priya Fernando',
      customerPhone: '+94 76 555 4321',
      customerAvatar: 'PF',
      status: 'completed',
      priority: 'low',
      deliveryTime: '1:45 PM',
      locations: [
        {
          type: 'pickup',
          name: 'Fresh Market',
          address: '555 Main Street, Negombo',
          coordinates: { lat: 7.2084, lng: 79.8380 },
          distance: 0
        },
        {
          type: 'delivery',
          name: 'Priya Fernando',
          address: '777 Lake View, Colombo 07',
          coordinates: { lat: 6.9147, lng: 79.8803 },
          distance: 38
        }
      ],
      products: [
        { name: 'Spinach', quantity: '250g', price: 150, location: 'Fresh Market' },
        { name: 'Broccoli', quantity: '500g', price: 320, location: 'Fresh Market' }
      ],
      subtotal: 470,
      deliveryFee: 120,
      totalWithDelivery: 590,
      totalDistance: 38,
      estimatedTime: '1h 15min',
      specialInstructions: 'Leave at front door if not home'
    }
  ]);

  const [stats] = useState({
    totalOrders: 12,
    activeOrders: 3,
    completedToday: 8,
    totalEarnings: 15420,
    avgDeliveryTime: '28 min',
    customerRating: 4.8
  });

  // Calculate optimized route based on distance
  const optimizeRoute = (locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    // Sort pickups by distance (nearest first)
    const sortedPickups = pickups.sort((a, b) => a.distance - b.distance);
    
    // Return optimized route: pickups first, then deliveries
    return [...sortedPickups, ...deliveries];
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleRequestRide = (orderId) => {
    setPendingOrderId(orderId);
    setShowApprovalModal(true);
  };

  const handleApproveRide = () => {
    // Update order status
    setOrders(orders.map(order => 
      order.id === pendingOrderId ? { ...order, status: 'approved' } : order
    ));
    
    setShowApprovalModal(false);
    setPendingOrderId(null);
  };

  const handleRejectRide = () => {
    setShowApprovalModal(false);
    setPendingOrderId(null);
  };

  const handleStartNavigation = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const optimizedRoute = optimizeRoute(order.locations);
      
      // Navigate to the dedicated navigation page with order data
      navigate('/driver-navigation', {
        state: {
          orderId: orderId,
          route: optimizedRoute,
          orderDetails: order
        }
      });
      
      // Update order status to active
      setOrders(orders.map(o => 
        o.id === orderId ? { ...o, status: 'active' } : o
      ));
    }
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'completed' } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff6b35';
      case 'approved': return '#0A5446';
      case 'active': return '#0A5446';
      case 'completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="simple-order-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/driver-home')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="page-title">
            <h1>Order Dashboard</h1>
            <span className="subtitle">Manage delivery orders</span>
          </div>
        </div>

        <div className="header-center">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <div className="filter-dropdown">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
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
              <div className="stat-number">{stats.totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.activeOrders}</div>
              <div className="stat-label">Active Orders</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.completedToday}</div>
              <div className="stat-label">Completed Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="orders-main">
        <div className="section-header">
          <h2>Orders</h2>
          <button className="refresh-btn">
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-clipboard-list"></i>
            <h3>No orders found</h3>
            <p>No orders match your current filters.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map(order => (
              <div 
                key={order.id} 
                className={`order-card ${order.status}`}
                onClick={() => handleOrderClick(order)}
              >
                <div className="order-header">
                  <div className="order-number">{order.orderNumber}</div>
                  <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status}
                  </div>
                </div>

                <div className="order-customer">
                  <div className="customer-avatar">
                    {order.customerAvatar}
                  </div>
                  <div className="customer-info">
                    <div className="customer-name">{order.customerName}</div>
                    <div className="customer-phone">{order.customerPhone}</div>
                  </div>
                  <div className="order-time">
                    <div className="time-label">Delivery</div>
                    <div className="time-value">{order.deliveryTime}</div>
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
                    <div className="distance">{order.totalDistance} km</div>
                    <div className="time-estimate">{order.estimatedTime}</div>
                  </div>
                </div>

                <div className="order-summary">
                  <div className="order-items">
                    {order.products.slice(0, 2).map((product, index) => (
                      <span key={index} className="item-tag">
                        {product.name} ({product.quantity})
                      </span>
                    ))}
                    {order.products.length > 2 && (
                      <span className="more-items">+{order.products.length - 2} more</span>
                    )}
                  </div>
                  
                  <div className="order-amount">
                    <div className="amount-label">Total</div>
                    <div className="amount-value">Rs. {order.totalWithDelivery.toLocaleString()}</div>
                  </div>
                </div>

                <div className="order-actions">
                  {order.status === 'pending' && (
                    <button 
                      className="action-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestRide(order.id);
                      }}
                    >
                      <i className="fas fa-car"></i>
                      Request Ride
                    </button>
                  )}
                  
                  {order.status === 'approved' && (
                    <button 
                      className="action-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartNavigation(order.id);
                      }}
                    >
                      <i className="fas fa-route"></i>
                      Start Navigation
                    </button>
                  )}
                  
                  {order.status === 'active' && (
                    <button 
                      className="action-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteOrder(order.id);
                      }}
                    >
                      <i className="fas fa-check"></i>
                      Complete Order
                    </button>
                  )}
                  
                  {order.status === 'completed' && (
                    <button className="action-btn disabled">
                      <i className="fas fa-check-circle"></i>
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="approval-modal">
          <div className="modal-overlay" onClick={() => setShowApprovalModal(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ride Approval Request</h3>
              <button className="close-btn" onClick={() => setShowApprovalModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="approval-message">
                <i className="fas fa-car approval-icon"></i>
                <h4>Request Ride for Delivery</h4>
                <p>Do you want to request a ride for this delivery order?</p>
                <p className="order-info">Order: {orders.find(o => o.id === pendingOrderId)?.orderNumber}</p>
              </div>
              <div className="approval-actions">
                <button className="btn-reject" onClick={handleRejectRide}>
                  <i className="fas fa-times"></i>
                  Reject
                </button>
                <button className="btn-approve" onClick={handleApproveRide}>
                  <i className="fas fa-check"></i>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <span className="value">{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span className="value">{selectedOrder.status}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Total Distance:</span>
                    <span className="value">{selectedOrder.totalDistance} km</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDashboard;

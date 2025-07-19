import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderDashboard.css';

const OrderDashboard = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data
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
      pickupLocation: {
        name: 'Green Valley Farm',
        address: '123 Farm Road, Kandy'
      },
      deliveryLocation: {
        name: 'Kamal Perera',
        address: '456 Temple Street, Colombo 03'
      },
      products: [
        { name: 'Organic Carrots', quantity: '2 kg', price: 450 },
        { name: 'Fresh Tomatoes', quantity: '1 kg', price: 280 },
        { name: 'Green Beans', quantity: '500g', price: 320 }
      ],
      subtotal: 1050,
      deliveryFee: 200,
      totalWithDelivery: 1250,
      specialInstructions: 'Please call before delivery. Handle vegetables carefully.'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'Nimal Silva',
      customerPhone: '+94 77 987 6543',
      customerAvatar: 'NS',
      status: 'active',
      priority: 'medium',
      deliveryTime: '3:00 PM',
      pickupLocation: {
        name: 'Sunshine Vegetables',
        address: '789 Market Street, Galle'
      },
      deliveryLocation: {
        name: 'Nimal Silva',
        address: '321 Beach Road, Mount Lavinia'
      },
      products: [
        { name: 'Banana', quantity: '2 dozen', price: 600 },
        { name: 'Pineapple', quantity: '1 piece', price: 450 }
      ],
      subtotal: 1050,
      deliveryFee: 150,
      totalWithDelivery: 1200,
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
      pickupLocation: {
        name: 'Organic Paradise',
        address: '555 Hill Street, Nuwara Eliya'
      },
      deliveryLocation: {
        name: 'Priya Fernando',
        address: '777 Lake View, Colombo 07'
      },
      products: [
        { name: 'Lettuce', quantity: '1 head', price: 180 },
        { name: 'Broccoli', quantity: '500g', price: 320 },
        { name: 'Spinach', quantity: '250g', price: 150 }
      ],
      subtotal: 650,
      deliveryFee: 120,
      totalWithDelivery: 770,
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

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'active' } : order
    ));
    console.log('Order accepted:', orderId);
  };

  const handleRejectOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    console.log('Order rejected:', orderId);
  };

  const handleStartDelivery = (orderId) => {
    console.log('Starting delivery for order:', orderId);
    // Add navigation logic here
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'completed' } : order
    ));
    console.log('Order completed:', orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="modern-order-dashboard">
      {/* Top Navigation Bar */}
      <div className="dashboard-topbar">
        <div className="topbar-left">
          <button className="back-btn" onClick={() => navigate('/driver-home')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="page-title">
            <h1>Order Dashboard</h1>
            <span className="subtitle">Manage your delivery orders</span>
          </div>
        </div>

        <div className="topbar-center">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search orders by number or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="topbar-right">
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large"></i>
            </button>
          </div>

          <div className="filter-dropdown">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="notifications">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
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
            <div className="stat-icon active">
              <i className="fas fa-truck"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.activeOrders}</div>
              <div className="stat-label">Active Orders</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon completed">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.completedToday}</div>
              <div className="stat-label">Completed Today</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon earnings">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">Rs. {stats.totalEarnings.toLocaleString()}</div>
              <div className="stat-label">Total Earnings</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon time">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.avgDeliveryTime}</div>
              <div className="stat-label">Avg Delivery Time</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon rating">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.customerRating}</div>
              <div className="stat-label">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Orders Section - Full Width */}
        <div className="orders-section">
          <div className="section-header">
            <h2>Orders</h2>
            <div className="section-actions">
              <button className="refresh-btn">
                <i className="fas fa-sync-alt"></i>
                Refresh
              </button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <i className="fas fa-clipboard-list"></i>
              <h3>No orders found</h3>
              <p>No orders match your current filters.</p>
            </div>
          ) : (
            <div className={`orders-container ${viewMode}`}>
              {filteredOrders.map(order => (
                <div 
                  key={order.id} 
                  className={`order-item ${order.status} ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="order-header">
                    <div className="order-number">{order.orderNumber}</div>
                    <div className="order-badges">
                      <span className={`priority-badge ${order.priority}`}>
                        {order.priority}
                      </span>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
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

                  <div className="order-route">
                    <div className="route-item pickup">
                      <div className="route-icon">
                        <i className="fas fa-store"></i>
                      </div>
                      <div className="route-details">
                        <div className="route-name">{order.pickupLocation.name}</div>
                        <div className="route-address">{order.pickupLocation.address}</div>
                      </div>
                    </div>
                    
                    <div className="route-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                    
                    <div className="route-item delivery">
                      <div className="route-icon">
                        <i className="fas fa-home"></i>
                      </div>
                      <div className="route-details">
                        <div className="route-name">{order.deliveryLocation.name}</div>
                        <div className="route-address">{order.deliveryLocation.address}</div>
                      </div>
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
                      <>
                        <button 
                          className="action-btn decline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRejectOrder(order.id)
                          }}
                        >
                          <i className="fas fa-times"></i>
                          Decline
                        </button>
                        <button 
                          className="action-btn accept"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAcceptOrder(order.id)
                          }}
                        >
                          <i className="fas fa-check"></i>
                          Accept
                        </button>
                      </>
                    )}
                    
                    {order.status === 'active' && (
                      <>
                        <button 
                          className="action-btn navigate"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStartDelivery(order.id)
                          }}
                        >
                          <i className="fas fa-route"></i>
                          Navigate
                        </button>
                        <button 
                          className="action-btn complete"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCompleteOrder(order.id)
                          }}
                        >
                          <i className="fas fa-check-circle"></i>
                          Complete
                        </button>
                      </>
                    )}
                    
                    {order.status === 'completed' && (
                      <button className="action-btn view-details">
                        <i className="fas fa-eye"></i>
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-modal" onClick={() => setSelectedOrder(null)}>
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
                </div>
              </div>

              <div className="details-section">
                <h4>Customer Details</h4>
                <div className="customer-details">
                  <div className="customer-profile">
                    <div className="customer-avatar-large">
                      {selectedOrder.customerAvatar}
                    </div>
                    <div className="customer-info">
                      <div className="customer-name">{selectedOrder.customerName}</div>
                      <div className="customer-phone">{selectedOrder.customerPhone}</div>
                    </div>
                  </div>
                  <div className="customer-actions">
                    <button className="contact-btn call">
                      <i className="fas fa-phone"></i>
                      Call
                    </button>
                    <button className="contact-btn message">
                      <i className="fas fa-sms"></i>
                      Message
                    </button>
                  </div>
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

              <div className="details-section">
                <h4>Route Details</h4>
                <div className="route-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon pickup">
                      <i className="fas fa-store"></i>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">Pickup Location</div>
                      <div className="timeline-subtitle">{selectedOrder.pickupLocation.name}</div>
                      <div className="timeline-address">{selectedOrder.pickupLocation.address}</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon delivery">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">Delivery Location</div>
                      <div className="timeline-subtitle">{selectedOrder.deliveryLocation.name}</div>
                      <div className="timeline-address">{selectedOrder.deliveryLocation.address}</div>
                    </div>
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
  )
}

export default OrderDashboard

import React, { useState } from 'react';
import './VendorOrder.css';

const VendorOrder = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Sample orders data
  const ordersData = [
    {
      id: 1,
      orderNumber: 'Order #87134',
      placedDate: '2024-08-15',
      total: '$20.00',
      status: 'Placed',
      category: 'Placed'
    },
    {
      id: 2,
      orderNumber: 'Order #87135',
      placedDate: '2024-08-14',
      total: '$45.00',
      status: 'Placed',
      category: 'Placed'
    },
    {
      id: 3,
      orderNumber: 'Order #87136',
      placedDate: '2024-08-13',
      total: '$32.00',
      status: 'Out for Delivery',
      category: 'Out for Delivery'
    },
    {
      id: 4,
      orderNumber: 'Order #87137',
      placedDate: '2024-08-12',
      total: '$28.00',
      status: 'Delivered',
      category: 'Delivered'
    },
    {
      id: 5,
      orderNumber: 'Order #87138',
      placedDate: '2024-08-11',
      total: '$55.00',
      status: 'Returned',
      category: 'Return'
    }
  ];

  const tabs = ['All', 'Placed', 'Out for Delivery', 'Delivered', 'Returned'];

  const getFilteredOrders = () => {
    if (activeTab === 'All') return ordersData;
    if (activeTab === 'Returned') return ordersData.filter(order => order.category === 'Return');
    return ordersData.filter(order => order.category === activeTab);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Placed': '#4a90e2',
      'Out for Delivery': '#f5a623',
      'Delivered': '#7ed321',
      'Returned': '#d0021b'
    };
    return statusColors[status] || '#9b9b9b';
  };

  return (
    <div className="vendor-orders-container">
      <h2 className="orders-title">Your Orders</h2>
      
      {/* Tabs */}
      <div className="orders-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`orders-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Cards */}
      <div className="orders-grid">
        {getFilteredOrders().map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <span className="order-number">{order.orderNumber}</span>
              <span 
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status}
              </span>
            </div>
            
            <div className="order-card-body">
              <div className="order-detail">
                <span className="detail-label">Placed:</span>
                <span className="detail-value">{order.placedDate}</span>
              </div>
              
              <div className="order-detail">
                <span className="detail-label">Total:</span>
                <span className="detail-value total-amount">{order.total}</span>
              </div>
            </div>
            
            <div className="order-card-footer">
              <button className="view-order-btn">
                View Order Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOrder;
import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Sample orders data - in your actual app, this would come from your Spring Boot API
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

  const getStatusDisplayText = (status) => {
    const statusMap = {
      'Placed': 'Status: Placed',
      'Out for Delivery': 'Status: Out for Delivery',
      'Delivered': 'Status: Delivered',
      'Returned': 'Status: Returned'
    };
    return statusMap[status] || status;
  };

  const getButtonText = (status) => {
    const buttonMap = {
      'Placed': 'View Order',
      'Out for Delivery': 'View Order',
      'Delivered': 'View Order',
      'Returned': 'View Order'
    };
    return buttonMap[status] || 'View Order';
  };

  return (
    <>

      {/* Main Content */}
      <div className="orders-content">
        <h2>Your Orders</h2>
        
        {/* Tabs */}
        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {getFilteredOrders().map(order => (
            <div key={order.id} className="order-item">
              <div className="order-icon">
                <div className="order-circle" >🛒</div>
              </div>
              <div className="order-details">
                <div className="order-info">
                  <div className="order-number">{order.orderNumber}</div>
                  <div className="order-meta">
                    <span>Placed: {order.placedDate}</span>
                    <span>Total: {order.total}</span>
                    <span>{getStatusDisplayText(order.status)}</span>
                  </div>
                </div>
                <button className="view-order-btn">
                  {getButtonText(order.status)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
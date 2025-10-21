import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import './Orders.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');
  const getBuyerId = () => parseInt(localStorage.getItem('buyerId'));

  const fetchOrders = async () => {
    const token = getAuthToken();
    if (!token) {
      setError('Please login to view your orders');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/buyer-order/buyer', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Please login again.');
        }
        if (response.status === 204) {
          setOrdersData([]); // No orders
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrdersData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const tabs = ['All', 'Placed', 'Out for Delivery', 'Delivered', 'Returned'];

  // Map tab names to backend enum
  const enumStatusMap = {
    Placed: 'PENDING',
    'Out for Delivery': 'IN_TRANSIT',
    Delivered: 'DELIVERED',
    Returned: 'FAILED',
  };

  const getFilteredOrders = () => {
    if (activeTab === 'All') return ordersData;
    const enumStatus = enumStatusMap[activeTab];
    return ordersData.filter(order => order.status === enumStatus);
  };

  const getStatusDisplayText = (status) => {
    const statusMap = {
      PENDING: 'Placed',
      IN_TRANSIT: 'Out for Delivery',
      DELIVERED: 'Delivered',
      FAILED: 'Returned',
      RIDER_ASSIGNED: 'Rider Assigned',
      RIDER_PICKED: 'Rider Picked Up'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-hero">
        <h1>Your Orders</h1>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle style={{ color: '#DC2626' }} size={20} />
          <span style={{ color: '#991B1B' }}>{error}</span>
        </div>
      )}

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

      <div className="orders-list">
        {getFilteredOrders().length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#6B7280', fontSize: '18px' }}>
            No orders in this category.
          </div>
        ) : (
          getFilteredOrders().map(order => (
            <div key={order.id} className="order-item">
              <div className="order-icon">
                <div className="order-circle">🛒</div>
              </div>
              <div className="order-details">
                <div className="order-info">
                  <div className="order-number">{order.orderNumber}</div>
                  <div className="order-meta">
                    <span>Placed: {new Date(order.placedDate).toLocaleDateString()}</span>
                    <span>Total: ${order.total}</span>
                    <span>Status: {getStatusDisplayText(order.status)}</span>
                  </div>
                </div>
                <button className="view-order-btn">
                  View Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

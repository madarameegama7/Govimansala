import React from 'react';
import '../pages/styles/analytics.css';

const BuyerAnalytics = () => {
  // Sample data for the chart
  const chartData = [
    { height: 60 },
    { height: 70 },
    { height: 80 },
    { height: 75 },
    { height: 90 },
    { height: 85 },
    { height: 95 },
    { height: 88 },
    { height: 82 },
    { height: 92 },
    { height: 98 },
    { height: 100 }
  ];

  // Sample seller data
  const sellerData = [
    {
      name: 'AgroFresh',
      orders: 75,
      revenue: 75000,
      avatar: 'AF',
      bgColor: '#4F46E5'
    },
    {
      name: 'FreshMart',
      orders: 18,
      revenue: 18500,
      avatar: 'FM',
      bgColor: '#EF4444'
    },
    {
      name: 'Green Basket',
      orders: 15,
      revenue: 15200,
      avatar: 'GB',
      bgColor: '#F59E0B'
    }
  ];

  return (
    <>
  <div className="analytics-hero">
      <h1>Analytics</h1>
        <p>Home &gt; Analytics</p>
  </div>

  <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <h3>Total Purchases</h3>
            <div className="stat-number">295</div>
            <div className="stat-description">Total items purchases for this month</div>
          </div>
          <button className="view-details-btn">View Details</button>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Orders Placed</h3>
            <div className="stat-number">295</div>
            <div className="stat-description">Total orders this month</div>
          </div>
          <button className="view-details-btn">View Details</button>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3>Out for Delivery</h3>
            <div className="stat-number">9</div>
            <div className="stat-description">Orders in transit</div>
          </div>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>

      {/* Purchase Trend Chart */}
     <div className="chart-section">
     <h2>Purchase Trend</h2>
     <div className="chart-container-with-axes">
    {/* Y-axis labels */}
     <div className="y-axis">
      {[100, 80, 60, 40, 20, 0].map((val, i) => (
        <div key={i} className="y-label">
          {val}
        </div>
      ))}
    </div>

    {/* Chart Bars */}
    <div className="chart-area">
      <div className="chart">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${item.height}%` }}
            title={`Value: ${item.height}`}
          ></div>
        ))}
      </div>

      {/* X-axis labels (Months) */}
      <div className="x-axis">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
          (month, index) => (
            <div key={index} className="x-label">
              {month}
            </div>
          )
        )}
      </div>
    </div>
  </div>
</div>


      {/* Seller Insights */}
      <div className="seller-section">
        <h2>Seller Insights</h2>
        <div className="seller-list">
          {sellerData.map((seller, index) => (
            <div key={index} className="seller-item">
              <div 
                className="seller-avatar"
                style={{ backgroundColor: seller.bgColor }}
              >
                {seller.avatar}
              </div>
              <div className="seller-info">
                <div className="seller-name">{seller.name}</div>
                <div className="seller-stats">
                  {seller.orders} orders • ₹{seller.revenue.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyerAnalytics;
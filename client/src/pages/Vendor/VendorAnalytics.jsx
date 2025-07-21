import React from 'react';
import './VendorAnalytics.css';

const VendorAnalytics = () => {
  // Sample data for the chart
  const chartData = [
    { height: 60, month: 'Jan' },
    { height: 70, month: 'Feb' },
    { height: 80, month: 'Mar' },
    { height: 75, month: 'Apr' },
    { height: 90, month: 'May' },
    { height: 85, month: 'Jun' },
    { height: 95, month: 'Jul' },
    { height: 88, month: 'Aug' },
    { height: 82, month: 'Sep' },
    { height: 92, month: 'Oct' },
    { height: 98, month: 'Nov' },
    { height: 100, month: 'Dec' }
  ];

  // Sample seller data
  const sellerData = [
    {
      name: 'Nimal Perera',
      orders: 10,
      revenue: 75000,
      avatar: 'AF',
      bgColor: '#4F46E5',
      trend: 'up'
    },
    {
      name: 'Sunil De sIlva',
      orders: 18,
      revenue: 18500,
      avatar: 'FM',
      bgColor: '#EF4444',
      trend: 'down'
    },
    {
      name: 'Ashen Mendis',
      orders: 15,
      revenue: 15200,
      avatar: 'GB',
      bgColor: '#F59E0B',
      trend: 'up'
    }
  ];

  // Stats data
  const stats = [
    {
      title: 'Total Purchases',
      value: '295',
      description: 'Total items purchased this month',
      trend: '12% ↑',
      trendColor: '#10B981'
    },
    {
      title: 'Orders Placed',
      value: '108',
      description: 'Total orders this month',
      trend: '5% ↑',
      trendColor: '#10B981'
    },
    {
      title: 'Out for Delivery',
      value: '9',
      description: 'Orders in transit',
      trend: '3% ↓',
      trendColor: '#EF4444'
    },
    {
      title: 'Total Revenue',
      value: 'Rs. 10,875',
      description: 'Revenue this month',
      trend: '18% ↑',
      trendColor: '#10B981'
    }
  ];

  return (
    <div className="analytics-dashboard">
      {/* Hero Section */}
      <div className="analytics-hero">
        <div className="hero-content">
          <div className="breadcrumb">
            <span>Home</span>
            <span className="separator">/</span>
            <span>Analytics</span>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-value-container">
                  <div className="stat-number">{stat.value}</div>
                  <span className="stat-trend" style={{ color: stat.trendColor }}>
                    {stat.trend}
                  </span>
                </div>
                <div className="stat-description">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="dashboard-content">
          {/* Purchase Trend Chart */}
          <div className="chart-card">
            <div className="card-header">
              <h2>Purchase Trend</h2>
              <div className="time-filter">
                <button className="active">Monthly</button>
                <button>Quarterly</button>
                <button>Yearly</button>
              </div>
            </div>
            <div className="chart-container">
              <div className="y-axis">
                {[100, 80, 60, 40, 20, 0].map((val, i) => (
                  <div key={i} className="y-label">
                    {val}
                  </div>
                ))}
              </div>
              <div className="chart-area">
                <div className="chart-bars">
                  {chartData.map((item, index) => (
                    <div key={index} className="bar-container">
                      <div
                        className="chart-bar"
                        style={{ height: `${item.height}%` }}
                        data-month={item.month}
                        data-value={item.height}
                      ></div>
                      <div className="x-label">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seller Insights */}
          <div className="seller-card">
            <div className="card-header">
              <h2>Top Sellers</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="seller-list">
              {sellerData.map((seller, index) => (
                <div key={index} className="seller-item">
                  <div className="seller-info-container">
                    <div 
                      className="seller-avatar"
                      style={{ backgroundColor: seller.bgColor }}
                    >
                      {seller.avatar}
                    </div>
                    <div className="seller-info">
                      <div className="seller-name">{seller.name}</div>
                      <div className="seller-stats">
                        <span className="orders">{seller.orders} orders</span>
                        <span className="revenue">Rs.{seller.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`trend-indicator ${seller.trend}`}>
                    {seller.trend === 'up' ? '↑' : '↓'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;
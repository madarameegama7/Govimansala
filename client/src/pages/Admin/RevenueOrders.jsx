import React, { useEffect, useState } from 'react';
import OrderSummaryCard from '../../components/order/OrderSummaryCard';
import { fetchRevenueOrders } from '../../services/revenueService';
import { calculateRevenueSummary, formatCurrency } from '../../utils/RevenueCalculator';
import './RevenueOrders.css';

function RevenueOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRevenueOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.items && order.items.some(item => 
        item.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    return matchesStatus && matchesSearch;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.orderDate) - new Date(a.orderDate);
      case 'date-asc':
        return new Date(a.orderDate) - new Date(b.orderDate);
      case 'amount-desc': {
        const totalA = calculateRevenueSummary([a]).totalRevenue;
        const totalB = calculateRevenueSummary([b]).totalRevenue;
        return totalB - totalA;
      }
      case 'amount-asc': {
        const totalA = calculateRevenueSummary([a]).totalRevenue;
        const totalB = calculateRevenueSummary([b]).totalRevenue;
        return totalA - totalB;
      }
      default:
        return 0;
    }
  });

  // Calculate summary statistics
  const summary = calculateRevenueSummary(filteredOrders);

  if (loading) {
    return (
      <div className="revenue-orders-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="revenue-orders-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={loadOrders} className="retry-button">
            <i className="fas fa-redo"></i> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="revenue-orders-container">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <i className="fas fa-chart-line"></i>
            Revenue & Orders Management
          </h1>
          <p className="page-subtitle">
            Track and manage order revenue with detailed breakdowns
          </p>
        </div>
        <button onClick={loadOrders} className="refresh-button">
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>

      {/* Revenue Summary Cards */}
      <div className="revenue-summary-grid">
        <div className="summary-card total-revenue">
          <div className="summary-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="summary-content">
            <h3 className="summary-label">Total Revenue</h3>
            <p className="summary-value">{formatCurrency(summary.totalRevenue)}</p>
          </div>
        </div>

        <div className="summary-card service-charge">
          <div className="summary-icon">
            <i className="fas fa-percent"></i>
          </div>
          <div className="summary-content">
            <h3 className="summary-label">Service Charges (10%)</h3>
            <p className="summary-value">{formatCurrency(summary.totalServiceCharge)}</p>
          </div>
        </div>

        <div className="summary-card delivery-fees">
          <div className="summary-icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="summary-content">
            <h3 className="summary-label">Delivery Fees</h3>
            <p className="summary-value">{formatCurrency(summary.totalDeliveryFees)}</p>
          </div>
        </div>

        <div className="summary-card order-count">
          <div className="summary-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="summary-content">
            <h3 className="summary-label">Total Orders</h3>
            <p className="summary-value">{summary.orderCount}</p>
          </div>
        </div>

        <div className="summary-card average-order">
          <div className="summary-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="summary-content">
            <h3 className="summary-label">Average Order Value</h3>
            <p className="summary-value">{formatCurrency(summary.averageOrderValue)}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="controls-section">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by Order ID, Buyer, Farmer, Farm, or Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">
              <i className="fas fa-filter"></i> Status:
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">
              <i className="fas fa-sort"></i> Sort By:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="amount-desc">Amount (Highest First)</option>
              <option value="amount-asc">Amount (Lowest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>
          Showing <strong>{sortedOrders.length}</strong> of <strong>{orders.length}</strong> orders
          {filterStatus !== 'All' && <span> with status <strong>{filterStatus}</strong></span>}
          {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        </p>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {sortedOrders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-inbox"></i>
            <p>No orders found matching your criteria.</p>
            {(filterStatus !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setFilterStatus('All');
                  setSearchTerm('');
                }}
                className="clear-filters-button"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          sortedOrders.map((order) => (
            <OrderSummaryCard key={order.orderId} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

export default RevenueOrders;

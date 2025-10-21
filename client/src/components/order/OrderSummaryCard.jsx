import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { calculateOrderRevenue, calculateFarmerBills, formatCurrency } from '../../utils/RevenueCalculator';
import FarmerBillCard from './FarmerBillCard';
import './OrderSummaryCard.css';

const OrderSummaryCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!order) return null;

  const revenue = calculateOrderRevenue(order.items || [], order.distanceInKm || 0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Pending': 'status-pending',
      'Processing': 'status-processing',
      'Shipped': 'status-shipped',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-default';
  };

  return (
    <div className="order-summary-card">
      {/* Header Section */}
      <div className="order-summary-header" onClick={toggleExpand}>
        <div className="order-header-left">
          <h3 className="order-id">Order #{order.orderId}</h3>
          <span className={`order-status ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="order-header-right">
          <span className="order-date">{new Date(order.orderDate).toLocaleDateString()}</span>
          <span className="order-total">{formatCurrency(revenue.total)}</span>
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} expand-icon`}></i>
        </div>
      </div>

      {/* Buyer Information */}
      <div className="order-buyer-info">
        <div className="buyer-detail">
          <i className="fas fa-user buyer-icon"></i>
          <div>
            <span className="buyer-label">Buyer:</span>
            <span className="buyer-name">{order.buyerName}</span>
          </div>
        </div>
        <div className="buyer-detail">
          <i className="fas fa-map-marker-alt buyer-icon"></i>
          <div>
            <span className="buyer-label">Address:</span>
            <span className="buyer-address">{order.buyerAddress}</span>
          </div>
        </div>
        <div className="buyer-detail">
          <i className="fas fa-warehouse buyer-icon"></i>
          <div>
            <span className="buyer-label">Pickup From:</span>
            <span className="buyer-address">{order.pickupLocation}</span>
          </div>
        </div>
        <div className="buyer-detail">
          <i className="fas fa-truck buyer-icon"></i>
          <div>
            <span className="buyer-label">Delivery To:</span>
            <span className="buyer-address">{order.deliveryLocation}</span>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="order-summary-content">
          {/* Items Table */}
          <div className="order-items-section">
            <h4 className="section-title">Order Items</h4>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Farmer</th>
                  <th>Farm</th>
                  <th>Location</th>
                  <th>Quantity</th>
                  <th>Price/Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items && order.items.map((item, index) => (
                  <tr key={item.itemId || index}>
                    <td className="product-name">{item.productName}</td>
                    <td>{item.farmerName}</td>
                    <td>{item.farmName}</td>
                    <td>{item.farmLocation}</td>
                    <td>{item.quantity} {item.unit}</td>
                    <td>{formatCurrency(item.pricePerUnit)}</td>
                    <td className="item-total">{formatCurrency(item.pricePerUnit * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Revenue Breakdown */}
          <div className="revenue-breakdown-section">
            <h4 className="section-title">Revenue Breakdown</h4>
            <div className="revenue-breakdown">
              <div className="breakdown-row">
                <span className="breakdown-label">Subtotal ({revenue.itemCount} items):</span>
                <span className="breakdown-value">{formatCurrency(revenue.subtotal)}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">
                  Delivery Fee ({order.pickupLocation} → {order.deliveryLocation}: {order.distanceInKm} km × Rs. 10/km):
                </span>
                <span className="breakdown-value">{formatCurrency(revenue.deliveryFee)}</span>
              </div>
              <div className="breakdown-row service-charge">
                <span className="breakdown-label">
                  Service Charge (10%):
                </span>
                <span className="breakdown-value">{formatCurrency(revenue.serviceCharge)}</span>
              </div>
              <div className="breakdown-row total-row">
                <span className="breakdown-label">Total Amount:</span>
                <span className="breakdown-value total-amount">{formatCurrency(revenue.total)}</span>
              </div>
            </div>
          </div>

          {/* Farmer Bills Section */}
          <div className="farmer-bills-section">
            <h4 className="section-title">Farmer Bills (Individual Breakdown)</h4>
            <div className="farmer-bills-container">
              {calculateFarmerBills(order.items).map((farmerBill, index) => (
                <FarmerBillCard key={farmerBill.farmerId || index} farmerBill={farmerBill} />
              ))}
            </div>
          </div>

          {/* Farmer Summary */}
          <div className="farmer-summary-section">
            <h4 className="section-title">Farmers Involved</h4>
            <div className="farmer-cards">
              {order.items && Array.from(new Map(order.items.map(item => 
                [item.farmerId, item]
              )).values()).map((item) => (
                <div key={item.farmerId} className="farmer-card">
                  <div className="farmer-card-header">
                    <i className="fas fa-tractor farmer-card-icon"></i>
                    <div>
                      <div className="farmer-card-name">{item.farmerName}</div>
                      <div className="farmer-card-farm">{item.farmName}</div>
                    </div>
                  </div>
                  <div className="farmer-card-location">
                    <i className="fas fa-location-dot"></i>
                    {item.farmLocation}
                  </div>
                  <div className="farmer-card-items">
                    {order.items
                      .filter(i => i.farmerId === item.farmerId)
                      .map((i, idx) => (
                        <div key={idx} className="farmer-item">
                          {i.productName} - {i.quantity} {i.unit}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

OrderSummaryCard.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    buyerId: PropTypes.string,
    buyerName: PropTypes.string.isRequired,
    buyerAddress: PropTypes.string,
    pickupLocation: PropTypes.string,
    deliveryLocation: PropTypes.string,
    orderDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    distanceInKm: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        itemId: PropTypes.string,
        productName: PropTypes.string.isRequired,
        farmerId: PropTypes.string.isRequired,
        farmerName: PropTypes.string.isRequired,
        farmName: PropTypes.string.isRequired,
        farmLocation: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        pricePerUnit: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default OrderSummaryCard;

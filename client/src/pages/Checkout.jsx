import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import '../pages/styles/Checkout.css';

const Checkout = () => {
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    temporaryAddress: '',
    contactNumber: '',
    nameForReference: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = () => {
    // Handle payment processing
    console.log('Processing payment...');
    // Here you would typically call your Spring Boot API
  };

  return (
    <>
    <div className="checkout-container">
    
    <div className="checkout-page">
      {/* Header Section */}
      <div className="checkout-hero">
        <h1>Checkout</h1>
        <p>Home &gt; Cart &gt; Checkout</p>
      </div>

      {/* Main Content */}
      <div className="checkout-content">
        {/* Shipping Details */}
        <div className="section">
          <h2 className="section-title">Shipping Details</h2>
          <p className="section-subtitle">
            We will deliver to your given address. If you want to use a different address, add it below.
          </p>

          {/* Shipping Address */}
          <div className="subsection">
            <h3 className="subsection-title">Shipping Address</h3>
            
            {/* Default Address Option */}
            <div className="address-option">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={useDefaultAddress}
                  onChange={(e) => setUseDefaultAddress(e.target.checked)}
                />
                <span className="checkmark">
                  {useDefaultAddress && <Check size={14} />}
                </span>
                <span className="checkbox-label">Default Address</span>
              </label>
              
              {useDefaultAddress && (
                <div className="default-address">
                  <div className="address-header">Janajaya fruits</div>
                  <div className="address-details">
                    123 Green Street, thimbirigasyaya, Colombo 05
                  </div>
                  <div className="address-phone">+94 72 4553561</div>
                </div>
              )}
            </div>

            {/* Different Address Option */}
            <div className="address-option">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={!useDefaultAddress}
                  onChange={(e) => setUseDefaultAddress(!e.target.checked)}
                />
                <span className="checkmark">
                  {!useDefaultAddress && <Check size={14} />}
                </span>
                <span className="checkbox-label">Use Different Address</span>
              </label>
            </div>

            {!useDefaultAddress && (
              <div className="different-address-form">
                <div className="form-group">
                  <label>Temporary Address</label>
                  <input
                    type="text"
                    placeholder="Enter your temporary address"
                    value={formData.temporaryAddress}
                    onChange={(e) => handleInputChange('temporaryAddress', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Name (for reference)</label>
                  <input
                    type="text"
                    placeholder="Enter a name for reference"
                    value={formData.nameForReference}
                    onChange={(e) => handleInputChange('nameForReference', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="section">
          <h2 className="section-title">Payment Method</h2>
          <div className="payment-dropdown">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="credit">Credit/Debit Card</option>
              <option value="cash">Cash on Delivery</option>
              <option value="bank">Bank Transfer</option>
            </select>
            <ChevronDown className="dropdown-icon" size={20} />
          </div>
          <div className="payment-info">Visa, MasterCard</div>
        </div>

        {/* Order Summary */}
        <div className="section">
          <h2 className="section-title">Order Summary</h2>
          <div className="order-summary">
            <div className="summary-row">
              <span>Total Items</span>
              <span className="summary-value">4</span>
            </div>
            <div className="summary-row total">
              <span>Total amount</span>
              <span className="summary-value total-amount">Rs.25 000.00</span>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button className="pay-button" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default Checkout;
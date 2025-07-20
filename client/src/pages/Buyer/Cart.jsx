import React, { useState } from 'react';
import { Minus, Plus, User } from 'lucide-react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { NavLink, useLocation } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      seller: "Green valley Farms",
      product: "Tomato",
      price: 230,
      unit: "kg",
      quantity: 1,
      location: "Nuwara Eliya"
    },
    {
      id: 2,
      seller: "Green valley Farms",
      product: "Tomato",
      price: 230,
      unit: "kg",
      quantity: 1,
      location: "Nuwara Eliya"
    },
    {
      id: 3,
      seller: "Green valley Farms",
      product: "Tomato",
      price: 230,
      unit: "kg",
      quantity: 1,
      location: "Nuwara Eliya"
    },
    {
      id: 4,
      seller: "Green valley Farms",
      product: "Tomato",
      price: 230,
      unit: "kg",
      quantity: 1,
      location: "Nuwara Eliya"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.length;

  return (
    <>
      <div className="cart-page">
      {/* Header Section */}
      <div className="cart-hero">
        <h1>Cart</h1>
        <p>Home &gt; Cart</p>
      </div>

      {/* Main Content */}
      <div className="cart-content">
        <div className="cart-section">
          <h2>Your Cart</h2>
          <p className="cart-subtitle">Review your selected items and adjust quantities before checkout.</p>

          <div className="cart-items-section">
            <h3>Cart Items</h3>
            
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="seller-info">
                  <User size={16} className="seller-icon" />
                  <span className="seller-name">{item.seller}</span>
                </div>
                
                <div className="item-details">
                  <span className="product-name">{item.product}</span>
                  <span className="price">Rs.{item.price}/{item.unit}</span>
                  <span className="quantity-display">{item.quantity}{item.unit}</span>
                  <span className="location">{item.location}</span>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="quantity-btn"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="quantity-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Total items</span>
              <span className="summary-value">{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Total amount</span>
              <span className="summary-value total-amount">Rs.{totalAmount.toFixed(2)}</span>
            </div>
            
            <NavLink to="/buyer/checkout">
             <button className="checkout-btn">
              Proceed to Checkout
            </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
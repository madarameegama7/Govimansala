import React, { useState, useEffect } from 'react';
import { Minus, Plus, User, Loader, AlertCircle } from 'lucide-react';
import './Cart.css';
import { NavLink } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Get the token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Extract buyerId from JWT token
  const getBuyerIdFromToken = () => {
    const token = getAuthToken();
    if (!token) return null;
    
    try {
      // Decode JWT token to get userId
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Adjust this based on your JWT structure (userId, sub, id, etc.)
      return payload.userId || payload.sub || payload.id;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  };

  // Fetch cart items from API
  const fetchCartItems = async () => {
    const token = getAuthToken();
    const buyerId = getBuyerIdFromToken();

    if (!token || !buyerId) {
      setError('Please login to view your cart');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/buyer-cart/${buyerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Please login again.');
        }
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Update cart item quantity
  const updateQuantity = async (item, change) => {
    const newQuantity = item.quantity + change;
    
    // If quantity becomes 0, remove the item
    if (newQuantity < 1) {
      removeItem(item.id);
      return;
    }

    const token = getAuthToken();
    const buyerId = getBuyerIdFromToken();

    if (!token || !buyerId) {
      setError('Please login to update cart');
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(item.id));

    try {
      const requestBody = {
        buyerId: buyerId,
        productId: item.productId,
        sellerId: item.sellerId,
        quantity: newQuantity,
        price: item.price
      };

      const response = await fetch('http://localhost:8080/api/buyer-cart/item', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Please login again.');
        }
        throw new Error('Failed to update cart item');
      }

      const updatedItem = await response.json();
      
      // Update the cart items with the new data from server
      setCartItems(items =>
        items.map(i => i.id === item.id ? updatedItem : i)
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating cart:', err);
      // Revert the change on error
      fetchCartItems();
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    const token = getAuthToken();

    if (!token) {
      setError('Please login to remove items');
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(id));

    try {
      const response = await fetch(`http://localhost:8080/api/buyer-cart/item/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Please login again.');
        }
        throw new Error('Failed to remove cart item');
      }

      // Remove item from state
      setCartItems(items => items.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error removing item:', err);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.length;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
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

          {/* Error Message */}
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

          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ color: '#6B7280', fontSize: '18px', marginBottom: '16px' }}>
                Your cart is empty
              </p>
              <NavLink to="../Marketplace" style={{ color: '#16A34A', fontWeight: '500' }}>
                Continue Shopping
              </NavLink>
            </div>
          ) : (
            <>
              <div className="cart-items-section">
                <h3>Cart Items</h3>
                
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="cart-item"
                    style={{ opacity: updatingItems.has(item.id) ? 0.5 : 1 }}
                  >
                    <div className="seller-info">
                      <User size={16} className="seller-icon" />
                      <span className="seller-name">{item.sellerName || 'Seller'}</span>
                    </div>
                    
                    <div className="item-details">
                      <span className="product-name">{item.productName || 'Product'}</span>
                      <span className="price">Rs.{item.price}/{item.unit || 'kg'}</span>
                      <span className="quantity-display">{item.quantity}{item.unit || 'kg'}</span>
                      <span className="location">{item.location || 'Location'}</span>
                    </div>
                    
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item, -1)}
                        className="quantity-btn"
                        disabled={updatingItems.has(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item, 1)}
                        className="quantity-btn"
                        disabled={updatingItems.has(item.id)}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
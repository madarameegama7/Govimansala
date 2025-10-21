import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalImage } from "../Marketplace";
import "../styles/MoreDetails.css";

const API_BASE_URL = "http://localhost:8080/api/product/buyer_product";

function MoreDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName, category, isOrganic } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  const getAuthToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (!productName || !category) {
      setError("Missing product information");
      setLoading(false);
      return;
    }
    fetchProductDetails();
  }, [productName, category, isOrganic]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const organicType = isOrganic ? "organic" : "conventional";
      const url = `${API_BASE_URL}/${category}/${organicType}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      // Filter by name (case insensitive)
      const filteredProducts = data.filter(
        (p) => p.name?.toLowerCase() === productName.toLowerCase()
      );
      setProducts(filteredProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const getQuantity = (productId) => quantities[productId] || 1;

  const handleAddToCart = async (product) => {
    const token = getAuthToken();
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const buyerId = parseInt(localStorage.getItem("buyerId"));
    if (!buyerId) {
      alert("Unable to identify user. Please log in again.");
      return;
    }

    const requestBody = {
      buyerId: buyerId,
      productId: product.productId,
      quantity: getQuantity(product.productId),
      price: product.unitPrice || product.price,
    };

    try {
      const response = await fetch("http://localhost:8080/api/buyer-cart/item", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Failed to add to cart");
      }

      alert(`${product.name} added to cart successfully!`);
    } catch (err) {
      alert(`Error adding to cart: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="more-details-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="more-details-container">
        <div className="error-state">
          <h2>Error Loading Products</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="more-details-container">
        <div className="empty-state">
          <h2>No Products Found</h2>
          <p>
            No {isOrganic ? "organic" : "conventional"} {productName} available
            at the moment.
          </p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="more-details-container">
      <div className="more-details-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Marketplace
        </button>
        <div className="header-info">
          <h1>{productName}</h1>
          <p className="product-meta">
            {category} • {isOrganic ? "Organic" : "Conventional"} •{" "}
            {products.length} listings available
          </p>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.productId} className="product-detail-card">
            <div className="product-image-wrapper">
              <img
                src={getLocalImage(product.name)}
                alt={product.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=" +
                    encodeURIComponent(product.name);
                }}
              />
              <span
                className={`badge ${
                  product.isOrganic ? "organic" : "conventional"
                }`}
              >
                {product.isOrganic ? "Organic" : "Conventional"}
              </span>
            </div>

            <div className="product-details">
              <h3>{product.name}</h3>

              <div className="product-info-grid">
                {product.unitPrice && (
                  <div className="info-item">
                    <span className="label">Unit Price:</span>
                    <span className="value">
                      Rs. {product.unitPrice} per kg
                    </span>
                  </div>
                )}
                {product.quantity && (
                  <div className="info-item">
                    <span className="label">Available:</span>
                    <span className="value">{product.quantity} kg</span>
                  </div>
                )}
                {product.location && (
                  <div className="info-item">
                    <span className="label">Location:</span>
                    <span className="value">{product.location}</span>
                  </div>
                )}
                {product.harvestDate && (
                  <div className="info-item">
                    <span className="label">Harvest Date:</span>
                    <span className="value">
                      {new Date(product.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {product.description && (
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
              )}

              <div className="card-actions">
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product.productId,
                        getQuantity(product.productId) - 1
                      )
                    }
                    disabled={getQuantity(product.productId) <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={getQuantity(product.productId)}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.productId,
                        parseInt(e.target.value) || 1
                      )
                    }
                    min="1"
                    max={product.quantity}
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        product.productId,
                        getQuantity(product.productId) + 1
                      )
                    }
                    disabled={getQuantity(product.productId) >= product.quantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreDetails;

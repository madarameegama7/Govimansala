import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorMarketPlace.css";
import SimpleSearchBar from "../../components/search/SearchBar";

// Import category images
import seedsImg from "../../assets/Marketplace/Vendor/seeds.jpg";
import fertilizersImg from "../../assets/Marketplace/Vendor/fertilizer.jpg";
import pesticidesImg from "../../assets/Marketplace/Vendor/pesticides.jpeg";
import machineryImg from "../../assets/Marketplace/Vendor/machinery.jpg";

function VendorMarketPlace() {
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    productName: "",
    productCategory: "Seeds",
    productPrice: "",
    productQuantity: "",
    productDescription: "",
  });
  const navigate = useNavigate();

  // All product names for search suggestions
  const allProductNames = [
    "Seeds",
    "Fertilizers",
    "Pesticides",
    "Machinery",
    "Organic",
    "Premium",
    "Bulk",
  ];

  // Filter products based on selected filter and search term
  const shouldShowProduct = (category, name) => {
    const matchesFilter = selectedFilter === "all" || selectedFilter === category;
    const matchesSearch = searchTerm === "" || name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const scrollLeft = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token is", token);

    // Decode token to get user ID
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log("Decoded token:", decoded);
        setCurrentUserId(decoded.sub?.toString()); // Ensure we store as string
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

    fetch("http://localhost:8080/api/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleEditProduct = (product) => {
    setEditingProductId(product.productId);
    setProductData({
      productName: product.productName,
      productCategory: product.productCategory,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      productDescription: product.productDescription,
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`http://localhost:8080/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.productId !== productId));
        alert("✅ Product deleted successfully!");
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`http://localhost:8080/api/product/${editingProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        const updatedProduct = await res.json();
        setProducts(products.map((p) =>
          p.productId === updatedProduct.productId ? updatedProduct : p
        ));
        setEditingProductId(null);
        alert("✅ Product updated successfully!");
        setProductData({
          productName: "",
          productCategory: "Seeds",
          productPrice: "",
          productQuantity: "",
          productDescription: "",
        });
      } else {
        alert("❌ Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const res = await fetch("http://localhost:8080/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      alert("✅ Product added successfully!");
      setProductData({
        productName: "",
        productCategory: "Seeds",
        productPrice: "",
        productQuantity: "",
        productDescription: "",
      });
    } else {
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="vendor-marketplace">
      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle-below-logo"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "×" : "≡"}
      </button>

      <div className="marketplace-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <h3>Filter Products</h3>

          {/* Category Filter Section */}
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="type-filters">
              <div className="type-filter">
                <input
                  type="radio"
                  id="all"
                  name="category"
                  checked={selectedFilter === "all"}
                  onChange={() => setSelectedFilter("all")}
                />
                <label htmlFor="all">All Products</label>
              </div>
              <div className="type-filter">
                <input
                  type="radio"
                  id="Seeds"
                  name="category"
                  checked={selectedFilter === "Seeds"}
                  onChange={() => setSelectedFilter("Seeds")}
                />
                <label htmlFor="Seeds">Seeds</label>
              </div>
              <div className="type-filter">
                <input
                  type="radio"
                  id="Fertilizers"
                  name="category"
                  checked={selectedFilter === "Fertilizers"}
                  onChange={() => setSelectedFilter("Fertilizers")}
                />
                <label htmlFor="Fertilizers">Fertilizers</label>
              </div>
              <div className="type-filter">
                <input
                  type="radio"
                  id="Pesticides"
                  name="category"
                  checked={selectedFilter === "Pesticides"}
                  onChange={() => setSelectedFilter("Pesticides")}
                />
                <label htmlFor="Pesticides">Pesticides</label>
              </div>
              <div className="type-filter">
                <input
                  type="radio"
                  id="Machinery"
                  name="category"
                  checked={selectedFilter === "Machinery"}
                  onChange={() => setSelectedFilter("Machinery")}
                />
                <label htmlFor="Machinery">Machinery</label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          {/* Header */}
          <div className="marketplace-header">
            <h1>Vendor Marketplace</h1>
            <p>Manage and showcase your agricultural products</p>
          </div>

          {/* Search Bar */}
          <div className="marketplace-search-container">
            <SimpleSearchBar
              placeholder="Search products..."
              onSearch={handleSearch}
              data={allProductNames}
            />
          </div>

          {/* My Products Section */}
          <div className="section">
            <div className="section-header">
              <h2>My Products</h2>
              <div className="scroll-controls">
                <button
                  className="scroll-btn scroll-left"
                  onClick={() => scrollLeft("products-container")}
                >
                  ←
                </button>
                <button
                  className="scroll-btn scroll-right"
                  onClick={() => scrollRight("products-container")}
                >
                  →
                </button>
              </div>
            </div>

            <div className="products-scroll" id="products-container">
              {Array.isArray(products) && products.map((product) =>
                shouldShowProduct(product.productCategory, product.productName) && (
                  <div className="product-card" key={product.productId}>
                    <div className="product-image">
                      {product.productCategory === "Seeds" && <img src={seedsImg} alt="Seeds" />}
                      {product.productCategory === "Fertilizers" && <img src={fertilizersImg} alt="Fertilizers" />}
                      {product.productCategory === "Pesticides" && <img src={pesticidesImg} alt="Pesticides" />}
                      {product.productCategory === "Machinery" && <img src={machineryImg} alt="Machinery" />}
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">
                        <span>{product.productName}</span>
                      </h3>
                      <span className="product-type">{product.productCategory}</span>
                      <p className="product-price">Rs.{product.productPrice}</p>
                      <p className="product-quantity">Quantity: {product.productQuantity}</p>
                      <p className="product-description">{product.productDescription}</p>
                      
                      {/* Edit/Delete Buttons - Only show for product owner */}
                      {product.userId.toString() === currentUserId?.toString() && (
                        <div className="product-actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditProduct(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteProduct(product.productId)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Add/Edit Product Form */}
          <div className="section">
            <h2>{editingProductId ? "Edit Product" : "Add New Product"}</h2>
            <form
              className="product-form"
              onSubmit={editingProductId ? handleUpdateProduct : handleSubmit}
            >
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={productData.productName}
                onChange={handleChange}
                required
              />

              <select
                name="productCategory"
                value={productData.productCategory}
                onChange={handleChange}
              >
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Pesticides">Pesticides</option>
                <option value="Machinery">Machinery</option>
              </select>

              <input
                type="number"
                name="productPrice"
                placeholder="Price (LKR)"
                value={productData.productPrice}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="productQuantity"
                placeholder="Quantity"
                value={productData.productQuantity}
                onChange={handleChange}
                required
              />

              <textarea
                name="productDescription"
                placeholder="Product Description"
                value={productData.productDescription}
                onChange={handleChange}
              ></textarea>

              <div className="form-actions">
                <button type="submit">
                  {editingProductId ? "Update Product" : "Add Product"}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setEditingProductId(null);
                      setProductData({
                        productName: "",
                        productCategory: "Seeds",
                        productPrice: "",
                        productQuantity: "",
                        productDescription: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorMarketPlace;
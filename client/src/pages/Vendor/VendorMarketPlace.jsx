import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorMarketPlace.css";
import SimpleSearchBar from "../../components/search/SearchBar";

// Import category images
import seedsImg from "../../assets/Marketplace/Vendor/seeds.jpg";
import fertilizersImg from "../../assets/Marketplace/Vendor/fertilizer.jpg";
import pesticidesImg from "../../assets/Marketplace/Vendor/pesticides.jpeg";
import machineryImg from "../../assets/Marketplace/Vendor/machinery.jpg";

console.log("✅ VendorMarketPlace component file loaded");

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
  const normalizeValue = (value) => (value || "").toLowerCase().trim();

  const shouldShowProduct = (category, name) => {
    const normalizedCategory = normalizeValue(category);
    const normalizedName = normalizeValue(name);
    const normalizedFilter = normalizeValue(selectedFilter);
    const matchesFilter =
      normalizedFilter === "all" ||
      normalizedCategory === normalizedFilter ||
      normalizedCategory.startsWith(normalizedFilter) ||
      normalizedFilter.startsWith(normalizedCategory);
    const matchesSearch =
      normalizeValue(searchTerm) === "" ||
      normalizedName.includes(normalizeValue(searchTerm));

    console.log("🧩 Filter check:", {
      selectedFilter,
      category: normalizedCategory,
      matchesFilter,
      matchesSearch,
    });
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

  const visibleProducts = Array.isArray(products)
    ? products.filter((product) =>
        shouldShowProduct(
          product.productCategory ?? "",
          product.productName ?? ""
        )
      )
    : [];

  console.log("🔸 Component rendered. Filter:", selectedFilter);

useEffect(() => {
  console.log("🟡 Category changed to:", selectedFilter);
  const token = localStorage.getItem("accessToken");
  const baseUrl = "http://localhost:8080/api/product";
  const url =
    selectedFilter && selectedFilter !== "all"
      ? `${baseUrl}/category/${encodeURIComponent(selectedFilter)}`
      : baseUrl;

  console.log("🔵 Fetching from URL:", url);

  const headers = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Add the actual fetch call here
  fetch(url, { headers })
    .then((res) => {
      console.log("🟢 Response status:", res.status);
      return res.text(); // 👈 get raw text instead of JSON for debugging
    })
    .then((text) => {
      console.log("🟣 Raw response:", text);
      try {
        const data = JSON.parse(text);
        console.log("✅ Parsed data:", data);

        const normalizedProducts = (() => {
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.content)) return data.content;
          if (data && Array.isArray(data.data)) return data.data;
          if (data && Array.isArray(data.products)) return data.products;
          return [];
        })();

        if (!Array.isArray(normalizedProducts)) {
          console.error("❌ Failed to derive products array, falling back to empty list.");
          setProducts([]);
          return;
        }

        console.log("📦 Normalized products:", normalizedProducts);
        setProducts(normalizedProducts);
      } catch (e) {
        console.error("❌ JSON parse error:", e);
        setProducts([]);
      }
    })
    .catch((err) => console.error("🔥 Fetch error:", err));
}, [selectedFilter]);

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
        setProducts((prev) => prev.filter((p) => p.productId !== productId));
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
        setProducts((prev) =>
          prev.map((p) =>
            p.productId === updatedProduct.productId ? updatedProduct : p
          )
        );
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
      setProducts((prev) => [...prev, newProduct]);
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

            <div
  id="products-container"
  className="products-scroll"
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    padding: "12px",
    background: "#f9fafb",
    borderRadius: "8px",
    minHeight: "200px",        // ensures something visible
  }}
>
  {visibleProducts.length > 0 ? (
    visibleProducts.map((product) => (
      <div
        key={product.productId}
        className="product-card"
        style={{
          flex: "0 0 260px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: "12px",
          textAlign: "center",
        }}
      >
        <div
          className="product-image"
          style={{ width: "100%", height: "150px", marginBottom: "10px" }}
        >
          {product.productCategory === "Seeds" && (
            <img src={seedsImg} alt="Seeds" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          {product.productCategory === "Fertilizers" && (
            <img src={fertilizersImg} alt="Fertilizers" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          {product.productCategory === "Pesticides" && (
            <img src={pesticidesImg} alt="Pesticides" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          {product.productCategory === "Machinery" && (
            <img src={machineryImg} alt="Machinery" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>
        <h3>{product.productName}</h3>
        <p style={{ color: "#555" }}>{product.productCategory}</p>
        <p><strong>Rs.{product.productPrice}</strong></p>
        <p>Qty: {product.productQuantity}</p>
        <p style={{ fontSize: "0.9em", color: "#666" }}>{product.productDescription}</p>
      </div>
    ))
  ) : (
    <div style={{ width: "100%", textAlign: "center", color: "#666" }}>
      <p>No products found for this category.</p>
    </div>
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

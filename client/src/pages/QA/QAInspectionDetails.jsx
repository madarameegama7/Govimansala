import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./QAStyles.css";

const QAInspectionDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/qa/product/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [productId]);

  const handleApprove = async () => {
    if (!window.confirm("Are you sure you want to approve this product?")) return;
    
    setProcessing(true);
    try {
      await axios.post(`http://localhost:8080/api/qa/approve/${productId}`);
      navigate("/qa/inspections");
    } catch (error) {
      console.error("Error approving product:", error);
      alert("Error approving product. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason === null) return;
    
    setProcessing(true);
    try {
      await axios.post(`http://localhost:8080/api/qa/reject/${productId}`, { reason });
      navigate("/qa/inspections");
    } catch (error) {
      console.error("Error rejecting product:", error);
      alert("Error rejecting product. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="qa-details">
        <div className="qa-container">
          <div className="qa-content">
            <div className="qa-loading">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="qa-details">
        <div className="qa-container">
          <div className="qa-content">
            <div className="qa-empty">
              <div className="qa-icon">❌</div>
              <h3>Product Not Found</h3>
              <p>The requested product could not be found.</p>
              <button 
                className="qa-btn qa-btn-primary"
                onClick={() => navigate("/qa/inspections")}
                style={{ marginTop: "20px" }}
              >
                Back to Inspections
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qa-details">
      <div className="qa-container">
        <div className="qa-content fade-in">
          <div className="qa-header">
            <div>
              <h2>Product Inspection</h2>
              <p>Reviewing: {product.productName}</p>
            </div>
            <button 
              className="qa-btn"
              onClick={() => navigate("/qa/inspections")}
              style={{ background: "var(--gray)", color: "white" }}
            >
              ← Back to List
            </button>
          </div>

          <div className="qa-segment">
            <h3>Product Information</h3>
            <div className="qa-form" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  {product.productName}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Category</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  {product.category}
                </div>
              </div>
              
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <div className="form-input" style={{ 
                  background: "#f8f9fa", 
                  border: "none",
                  minHeight: "80px"
                }}>
                  {product.description}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Farmer</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  {product.farmerName}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Submitted Date</label>
                <div className="form-input" style={{ background: "#f8f9fa", border: "none" }}>
                  {new Date(product.submittedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="qa-segment">
            <h3>Quality Assessment</h3>
            <div className="form-group">
              <label className="form-label">Quality Notes</label>
              <div className="form-input" style={{ 
                background: "#f8f9fa", 
                border: "none",
                minHeight: "100px"
              }}>
                {product.qualityNotes || "No quality notes provided."}
              </div>
            </div>
          </div>

          <div className="qa-segment">
            <h3>Inspection Decision</h3>
            <p>Please review the product information carefully before making your decision.</p>
            <div className="qa-actions" style={{ marginTop: "20px" }}>
              <button 
                className="qa-btn qa-btn-success" 
                onClick={handleApprove}
                disabled={processing}
                style={{ minWidth: "120px" }}
              >
                {processing ? "Processing..." : "Approve ✅"}
              </button>
              <button 
                className="qa-btn qa-btn-danger" 
                onClick={handleReject}
                disabled={processing}
                style={{ minWidth: "120px" }}
              >
                {processing ? "Processing..." : "Reject ❌"}
              </button>
              <button 
                className="qa-btn"
                onClick={() => navigate("/qa/inspections")}
                disabled={processing}
                style={{ background: "var(--gray)", color: "white" }}
              >
                Review Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAInspectionDetails;
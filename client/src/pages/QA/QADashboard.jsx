import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QAStyles.css";

const QADashboard = () => {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/qa/pending");
        setPendingCount(res.data.count);
      } catch (err) {
        console.error("Error fetching pending inspections", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  if (loading) {
    return (
      <div className="qa-dashboard">
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

  return (
    <div className="qa-dashboard">
      <div className="qa-container">
        <div className="qa-content fade-in">
          <div className="qa-header">
            <h2>Quality Assurance Dashboard</h2>
            <div className="welcome-message" style={{ color: 'var(--primary)' }}>
              Welcome back, Inspector!
            </div>
          </div>
          
          <div className="qa-card-group">
            <div className="qa-card">
              <div className="qa-card-content">
                <div className="qa-icon">📋</div>
                <h3>Pending Inspections</h3>
                <p>Products waiting for your review</p>
                <p className="qa-count">{pendingCount}</p>
              </div>
              <div className="qa-card-actions">
                <button 
                  className="qa-btn qa-btn-primary"
                  onClick={() => navigate("/qa/inspections")}
                >
                  View All Inspections
                </button>
              </div>
            </div>

            <div className="qa-card">
              <div className="qa-card-content">
                <div className="qa-icon">👤</div>
                <h3>My Profile</h3>
                <p>Manage your inspector profile and settings</p>
              </div>
              <div className="qa-card-actions">
                <button 
                  className="qa-btn qa-btn-secondary"
                  onClick={() => navigate("/qa/profile")}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="qa-card">
              <div className="qa-card-content">
                <div className="qa-icon">📊</div>
                <h3>Quality Metrics</h3>
                <p>View inspection statistics and reports</p>
              </div>
              <div className="qa-card-actions">
                <button 
                  className="qa-btn qa-btn-accent"
                  onClick={() => navigate("/qa/metrics")}
                >
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="qa-segment">
            <h3>Today's Overview</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--primary)' }}>12</div>
                <div className="metric-label">Inspections Today</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--success)' }}>10</div>
                <div className="metric-label">Approved Today</div>
              </div>
              <div className="metric-card">
                <div className="metric-value" style={{ color: 'var(--danger)' }}>2</div>
                <div className="metric-label">Rejected Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QADashboard;
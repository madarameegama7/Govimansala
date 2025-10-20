import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerDetails.css';

const BuyerDetails = () => {
  const [buyers, setBuyers] = useState([]);
  const [filteredBuyers, setFilteredBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockedFilter, setBlockedFilter] = useState('all');

  const token = localStorage.getItem('accessToken');

  const fetchBuyers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/buyers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Buyers data:', response.data); // Debug log
      setBuyers(response.data);
      setFilteredBuyers(response.data);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = buyers;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(buyer =>
        buyer.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.user?.phone?.includes(searchTerm) ||
        buyer.user?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.deliveryAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply blocked status filter
    if (blockedFilter !== 'all') {
      const isBlocked = blockedFilter === 'blocked';
      results = results.filter(buyer => buyer.user?.isBlocked === isBlocked);
    }

    setFilteredBuyers(results);
  }, [buyers, searchTerm, blockedFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this buyer?')) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/buyers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBuyers((prev) => prev.filter((buyer) => buyer.buyerId !== id));
      } catch (error) {
        console.error('Error deleting buyer:', error);
      }
    }
  };

  const handleBlockToggle = async (buyer) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/admin/buyers/${buyer.buyerId}/block`,
        { isBlocked: !buyer.user?.isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update the buyer with the response data
      setBuyers((prev) =>
        prev.map((b) =>
          b.buyerId === buyer.buyerId ? response.data : b
        )
      );
    } catch (error) {
      console.error('Error toggling block:', error);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading buyers...</p>
    </div>
  );

  return (
    <div className="buyers-container">
      <div className="header-section">
        <h2>Buyer Management</h2>
        <p className="subtitle">Manage and monitor buyer accounts</p>
      </div>

      {/* Search and Filter Section */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, phone, address, or business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <select
            value={blockedFilter}
            onChange={(e) => setBlockedFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="blocked">Blocked</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>Showing {filteredBuyers.length} of {buyers.length} buyers</span>
        {(searchTerm || blockedFilter !== 'all') && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setBlockedFilter('all');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Buyers Table */}
      <div className="table-container">
        <table className="buyers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Business Name</th>
              <th>Delivery Address</th>
              <th>Verified</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  <div className="no-data-content">
                    <span>No buyers found</span>
                    {(searchTerm || blockedFilter !== 'all') && (
                      <p>Try adjusting your search or filters</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredBuyers.map((buyer) => (
                <tr key={buyer.buyerId} className={buyer.user?.isBlocked ? 'blocked-user' : ''}>
                  <td>
                    <div className="user-name">
                      {buyer.user?.name || 'N/A'}
                    </div>
                  </td>
                  <td className="email-cell">{buyer.user?.email || 'N/A'}</td>
                  <td>{buyer.user?.phone || '-'}</td>
                  <td>{buyer.user?.address || '-'}</td>
                  <td>
                    {buyer.businessName ? (
                      <span className="business-name">
                        {buyer.businessName}
                      </span>
                    ) : '-'}
                  </td>
                  <td>{buyer.deliveryAddress || '-'}</td>
                  <td>
                    <span className={`verified-badge ${buyer.user?.verified ? 'verified' : 'not-verified'}`}>
                      {buyer.user?.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${buyer.user?.isBlocked ? 'blocked' : 'active'}`}>
                      {buyer.user?.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(buyer.buyerId)}
                        title="Delete buyer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerDetails;
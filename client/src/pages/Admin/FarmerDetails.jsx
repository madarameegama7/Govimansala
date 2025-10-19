import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FarmerDetails.css';

const FarmerDetails = () => {
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockedFilter, setBlockedFilter] = useState('all');
  const [farmTypeFilter, setFarmTypeFilter] = useState('all');

  const token = localStorage.getItem('accessToken');

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/farmers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFarmers(response.data);
      setFilteredFarmers(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = farmers;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(farmer =>
        farmer.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.user?.phone?.includes(searchTerm) ||
        farmer.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.farmType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply blocked status filter
    if (blockedFilter !== 'all') {
      const isBlocked = blockedFilter === 'blocked';
      results = results.filter(farmer => farmer.isBlocked === isBlocked);
    }

    // Apply farm type filter
    if (farmTypeFilter !== 'all') {
      results = results.filter(farmer => farmer.farmType === farmTypeFilter);
    }

    setFilteredFarmers(results);
  }, [farmers, searchTerm, blockedFilter, farmTypeFilter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/farmers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFarmers((prev) => prev.filter((farmer) => farmer.farmerId !== id));
      } catch (error) {
        console.error('Error deleting farmer:', error);
      }
    }
  };

  const handleBlockToggle = async (farmer) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/admin/farmers/${farmer.farmerId}/block`,
        { isBlocked: !farmer.isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFarmers((prev) =>
        prev.map((f) =>
          f.farmerId === farmer.farmerId ? response.data : f
        )
      );
    } catch (error) {
      console.error('Error toggling block:', error);
    }
  };

  // Get unique farm types for filter dropdown
  const uniqueFarmTypes = [...new Set(farmers.map(farmer => farmer.farmType).filter(Boolean))];

  useEffect(() => {
    fetchFarmers();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading farmers...</p>
    </div>
  );

  return (
    <div className="farmers-container">
      <div className="header-section">
        <h2>Farmer Management</h2>
        <p className="subtitle">Manage and monitor farmer accounts</p>
      </div>

      {/* Search and Filter Section */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, phone, location, or farm type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <select
            value={farmTypeFilter}
            onChange={(e) => setFarmTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Farm Types</option>
            {uniqueFarmTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

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
        <span>Showing {filteredFarmers.length} of {farmers.length} farmers</span>
        {(searchTerm || blockedFilter !== 'all' || farmTypeFilter !== 'all') && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setBlockedFilter('all');
              setFarmTypeFilter('all');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Farmers Table */}
      <div className="table-container">
        <table className="farmers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Farm Size</th>
              <th>Farm Type</th>
              <th>Credits</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  <div className="no-data-content">
                    <span>No farmers found</span>
                    {(searchTerm || blockedFilter !== 'all' || farmTypeFilter !== 'all') && (
                      <p>Try adjusting your search or filters</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredFarmers.map((farmer) => (
                <tr key={farmer.farmerId} className={farmer.isBlocked ? 'blocked-user' : ''}>
                  <td>
                    <div className="user-name">
                      {farmer.user?.name}
                    </div>
                  </td>
                  <td>{farmer.location || '-'}</td>
                  <td className="email-cell">{farmer.user?.email}</td>
                  <td>{farmer.user?.phone || '-'}</td>
                  <td>
                    {farmer.farmSize ? `${farmer.farmSize} acres` : '-'}
                  </td>
                  <td>
                    {farmer.farmType ? (
                      <span className="farm-type-badge">
                        {farmer.farmType}
                      </span>
                    ) : '-'}
                  </td>
                  <td>
                    <span className={`credits-badge ${farmer.credits > 0 ? 'has-credits' : 'no-credits'}`}>
                      {farmer.credits || 0}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${farmer.isBlocked ? 'blocked' : 'active'}`}>
                      {farmer.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(farmer.farmerId)}
                        title="Delete farmer"
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

export default FarmerDetails;
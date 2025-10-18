import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [blockedFilter, setBlockedFilter] = useState('all');

  const token = localStorage.getItem('accessToken');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = users;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      results = results.filter(user => user.role === roleFilter);
    }

    // Apply blocked status filter
    if (blockedFilter !== 'all') {
      const isBlocked = blockedFilter === 'blocked';
      results = results.filter(user => user.isBlocked === isBlocked);
    }

    setFilteredUsers(results);
  }, [users, searchTerm, roleFilter, blockedFilter]);

  // Delete user
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8081/api/admin/farmers/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => prev.filter((user) => user.user_id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  // Block / unblock user
  const handleBlockToggle = async (user) => {
    try {
      const response = await axios.patch(
        `http://localhost:8081/api/admin/farmers/${user.user_id}/block`,
        { isBlocked: !user.isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u.user_id === user.user_id ? response.data : u))
      );
    } catch (error) {
      console.error('Error toggling block:', error);
    }
  };

  // Get unique roles for filter dropdown
  const uniqueRoles = [...new Set(users.map(user => user.role))];

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading users...</p>
    </div>
  );

  return (
    <div className="farmers-container">
      <div className="header-section">
        <h2>User Management</h2>
        <p className="subtitle">Manage and monitor user accounts</p>
      </div>

      {/* Search and Filter Section */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
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
        <span>Showing {filteredUsers.length} of {users.length} users</span>
        {(searchTerm || roleFilter !== 'all' || blockedFilter !== 'all') && (
          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('all');
              setBlockedFilter('all');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="farmers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <span>No users found</span>
                    {(searchTerm || roleFilter !== 'all' || blockedFilter !== 'all') && (
                      <p>Try adjusting your search or filters</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.user_id} className={user.isBlocked ? 'blocked-user' : ''}>
                  <td>
                    <div className="user-name">
                      {user.name}
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.address || user.location || '-'}</td>
                  <td className="email-cell">{user.email}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    <span className={`status-badge ${user.isBlocked ? 'blocked' : 'active'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user.user_id)}
                        title="Delete user"
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

export default UserDetails;
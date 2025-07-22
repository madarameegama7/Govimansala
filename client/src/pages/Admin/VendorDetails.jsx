import React, { useEffect, useState } from 'react';
import './VendorDetails.css';

const VendorDetails = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setVendors([
        {
          id: '1',
          name: 'Ruwan Fernando',
          address: '101 Market Street, Galle',
          email: 'ruwan@vendor.com',
          mobile: '0756789123',
          passwordHash: 'd4f5g6h7i8j9...',
          isBlocked: false,
        },
        {
          id: '2',
          name: 'Sanduni Weerasinghe',
          address: '202 Trade Rd, Matara',
          email: 'sanduni@vendor.com',
          mobile: '0767891234',
          passwordHash: 'z9y8x7w6v5u4...',
          isBlocked: true,
        },
      ]);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(prev => prev.filter(vendor => vendor.id !== id));
    }
  };

  const toggleBlockStatus = (id) => {
    setVendors(prev =>
      prev.map(vendor =>
        vendor.id === id ? { ...vendor, isBlocked: !vendor.isBlocked } : vendor
      )
    );
  };

  return (
    <div className="vendors-container">
      <h2>Vendors List</h2>
      <table className="vendors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No vendors found.</td>
            </tr>
          ) : (
            vendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.address}</td>
                <td>{vendor.email}</td>
                <td>{vendor.mobile}</td>
                <td>*******</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(vendor.id)}>Delete</button>
                  <button
                    className={`block-btn ${vendor.isBlocked ? 'unblock' : 'block'}`}
                    onClick={() => toggleBlockStatus(vendor.id)}
                  >
                    {vendor.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorDetails;

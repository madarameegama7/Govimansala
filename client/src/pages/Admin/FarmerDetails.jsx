import React, { useEffect, useState } from 'react';
import './FarmerDetails.css';

const FarmerDetails = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setFarmers([
        {
          id: '1',
          name: 'Amara Silva',
          address: '23 Green Lane, Matale',
          email: 'amara@example.com',
          mobile: '0771234567',
          passwordHash: 'abc123hash',
          organic: 'Yes',
          conventional: 'No',
          organicProducts: 'Tea, Vegetables',
          conventionalProducts: ''
        },
        {
          id: '2',
          name: 'Sunil Fernando',
          address: '12 Palm St, Galle',
          email: 'sunil@example.com',
          mobile: '0789876543',
          passwordHash: 'hash456xyz',
          organic: 'No',
          conventional: 'Yes',
          organicProducts: '',
          conventionalProducts: 'Bananas, Rice'
        }
      ]);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      setFarmers((prev) => prev.filter((farmer) => farmer.id !== id));
    }
  };

  const handleBlockToggle = (id) => {
    setFarmers((prev) =>
      prev.map((farmer) =>
        farmer.id === id
          ? { ...farmer, isBlocked: !farmer.isBlocked }
          : farmer
      )
    );
  };

  return (
    <div className="farmers-container">
      <h2>Farmer Details</h2>
      <table className="farmers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Password</th>
            <th>Organic</th>
            <th>Conventional</th>
            <th>Organic Products</th>
            <th>Conventional Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>
                No farmers found.
              </td>
            </tr>
          ) : (
            farmers.map((farmer) => (
              <tr key={farmer.id}>
                <td>{farmer.name}</td>
                <td>{farmer.address}</td>
                <td>{farmer.email}</td>
                <td>{farmer.mobile}</td>
                <td>*******</td>
                <td>{farmer.organic}</td>
                <td>{farmer.conventional}</td>
                <td>{farmer.organicProducts}</td>
                <td>{farmer.conventionalProducts}</td>
                <td>
                  <div className='action-buttons'>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(farmer.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`block-btn ${
                      farmer.isBlocked ? 'unblock' : 'block'
                    }`}
                    onClick={() => handleBlockToggle(farmer.id)}
                  >
                    {farmer.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerDetails;

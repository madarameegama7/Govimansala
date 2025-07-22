import React, { useEffect, useState } from 'react';
import './BuyerDetails.css';

const BuyerDetails = () => {
  const [buyers, setBuyers] = useState([]);
  const [blockedBuyers, setBlockedBuyers] = useState({}); 

  useEffect(() => {
    setTimeout(() => {
      setBuyers([
        {
          id: '1',
          name: 'Sasha Bandara',
          address: '123 Main St, Colombo',
          email: 'sasha@example.com',
          mobile: '0712345678',
          passwordHash: 'a1b2c3d4e5f6...'
        },
        {
          id: '2',
          name: 'Nimal Perera',
          address: '456 Lake Rd, Kandy',
          email: 'nimal@example.com',
          mobile: '0723456789',
          passwordHash: 'f6e5d4c3b2a1...'
        }
      ]);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this buyer?')) {
      setBuyers(prev => prev.filter(buyer => buyer.id !== id));
    }
  };

  const handleBlockToggle = (id) => {
    setBlockedBuyers(prev => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };

  return (
    <div className="buyers-container">
      <h2>Buyers List</h2>
      <table className="buyers-table">
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
          {buyers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No buyers found.</td>
            </tr>
          ) : (
            buyers.map(buyer => (
              <tr key={buyer.id}>
                <td>{buyer.name}</td>
                <td>{buyer.address}</td>
                <td>{buyer.email}</td>
                <td>{buyer.mobile}</td>
                <td>*******</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(buyer.id)}>Delete</button>
                  <button
                    className={`block-btn ${blockedBuyers[buyer.id] ? 'unblock' : ''}`}
                    onClick={() => handleBlockToggle(buyer.id)}
                  >
                    {blockedBuyers[buyer.id] ? 'Unblock' : 'Block'}
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

export default BuyerDetails;

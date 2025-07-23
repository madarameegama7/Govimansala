import React, { useEffect, useState } from 'react';
import './QADetails.css';

const QADetails = () => {
  const [inspectors, setInspectors] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setInspectors([
        {
          id: '1',
          name: 'Lakshmi Silva',
          address: '123 Inspection Rd, Galle',
          email: 'lakshmi.qa@example.com',
          mobile: '0771234567',
          passwordHash: '1a2b3c4d5e6f...',
          isBlocked: false
        },
        {
          id: '2',
          name: 'Ruwan Jayasuriya',
          address: '456 Factory Rd, Negombo',
          email: 'ruwan.qa@example.com',
          mobile: '0782345678',
          passwordHash: '6f5e4d3c2b1a...',
          isBlocked: true
        }
      ]);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this QA Inspector?')) {
      setInspectors(prev => prev.filter(inspector => inspector.id !== id));
    }
  };

  const toggleBlockStatus = (id) => {
    setInspectors(prev =>
      prev.map(inspector =>
        inspector.id === id
          ? { ...inspector, isBlocked: !inspector.isBlocked }
          : inspector
      )
    );
  };

  return (
    <div className="inspectors-container">
      <h2>QA Inspectors List</h2>
      <table className="inspectors-table">
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
          {inspectors.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No inspectors found.</td>
            </tr>
          ) : (
            inspectors.map(inspector => (
              <tr key={inspector.id}>
                <td>{inspector.name}</td>
                <td>{inspector.address}</td>
                <td>{inspector.email}</td>
                <td>{inspector.mobile}</td>
                <td>*******</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(inspector.id)}>
                    Delete
                  </button>
                  <button
                    className={`block-btn ${inspector.isBlocked ? 'unblock' : 'block'}`}
                    onClick={() => toggleBlockStatus(inspector.id)}
                  >
                    {inspector.isBlocked ? 'Unblock' : 'Block'}
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

export default QADetails;

import React, { useEffect, useState } from 'react';
import './DriverDetails.css';

const DriverDetails = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDrivers([
        {
          id: '1',
          name: 'Kamal Silva',
          address: 'No 45, Flower Rd, Colombo',
          email: 'kamal.driver@example.com',
          mobile: '0771234567',
          passwordHash: 'a1b2c3d4e5f6...',
          isBlocked: false,
        },
        {
          id: '2',
          name: 'Sunil Fernando',
          address: '56 Green Path, Galle',
          email: 'sunil.driver@example.com',
          mobile: '0782345678',
          passwordHash: 'f6e5d4c3b2a1...',
          isBlocked: true,
        },
      ]);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    }
  };

  const handleBlockToggle = (id) => {
    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === id ? { ...driver, isBlocked: !driver.isBlocked } : driver
      )
    );
  };

  return (
    <div className="drivers-container">
      <h2>Drivers List</h2>
      <table className="drivers-table">
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
          {drivers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No drivers found.</td>
            </tr>
          ) : (
            drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.name}</td>
                <td>{driver.address}</td>
                <td>{driver.email}</td>
                <td>{driver.mobile}</td>
                <td>*******</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(driver.id)}>Delete</button>
                  <button
                    className={`block-btn ${driver.isBlocked ? 'unblock' : 'block'}`}
                    onClick={() => handleBlockToggle(driver.id)}
                  >
                    {driver.isBlocked ? 'Unblock' : 'Block'}
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

export default DriverDetails;

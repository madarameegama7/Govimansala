import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    mobileNumber: '',
    email: '',
    contactPerson: '',
    gstNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes:', formData);
    // You can add API call here to save to your Spring Boot backend
  };

  return (
    <>
      <div className="profile-page">
      {/* Header Section */}
      <div className="profile-hero">
        <h1>Account Settings</h1>
        <p>Home &gt; Account</p>
      </div>

      {/* Profile Details Section */}
      <div className="profile-details-section">
        <div className="profile-header">
          <h2>Profile Details</h2>
          <p>Update your business and contact information.</p>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleInputChange}
              />
              <span className="input-icon">📝</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div className="input-wrapper">
              <textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
              <span className="input-icon">📱</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactPerson">Contact Person</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                placeholder="Enter contact person's name"
                value={formData.contactPerson}
                onChange={handleInputChange}
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gstNumber">GST Number</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                placeholder="Enter GST number"
                value={formData.gstNumber}
                onChange={handleInputChange}
              />
              <span className="input-icon">🧾</span>
            </div>
          </div>

          <button 
            type="button" 
            className="save-button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
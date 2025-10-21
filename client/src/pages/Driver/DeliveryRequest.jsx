import { useState } from 'react';
import PropTypes from 'prop-types';
import './DeliveryRequest.css';

/**
 * Driver Delivery Request Page
 * Allows drivers to request delivery assignments
 */
const DeliveryRequest = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    vehicleType: '',
    vehicleNumber: '',
    availableDate: '',
    availableTime: '',
    maxCapacity: '',
    preferredArea: '',
    additionalNotes: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate request ID
      const generatedRequestId = `DR${Date.now().toString().slice(-8)}`;
      setRequestId(generatedRequestId);
      
      // Store request in localStorage (temporary - replace with API)
      const existingRequests = JSON.parse(localStorage.getItem('deliveryRequests') || '[]');
      const newRequest = {
        id: generatedRequestId,
        ...formData,
        status: 'Pending',
        requestDate: new Date().toISOString(),
        driverId: 'D001', // Replace with actual logged-in driver ID
        qaAssigned: null,
        adminApproved: false
      };
      
      existingRequests.push(newRequest);
      localStorage.setItem('deliveryRequests', JSON.stringify(existingRequests));
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        driverName: '',
        vehicleType: '',
        vehicleNumber: '',
        availableDate: '',
        availableTime: '',
        maxCapacity: '',
        preferredArea: '',
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="delivery-request-container">
      <div className="request-header">
        <h1 className="request-title">
          <i className="fas fa-truck-loading"></i>
          Request Delivery Assignment
        </h1>
        <p className="request-subtitle">
          Submit your availability for delivery assignments. Admin will review and assign a QA officer.
        </p>
      </div>

      <form className="request-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-title">
            <i className="fas fa-user"></i>
            Driver Information
          </h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="driverName">Driver Name *</label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <i className="fas fa-car"></i>
            Vehicle Details
          </h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type *</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select vehicle type</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Three-Wheeler">Three-Wheeler</option>
                <option value="Small Truck">Small Truck</option>
                <option value="Medium Truck">Medium Truck</option>
                <option value="Large Truck">Large Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="vehicleNumber">Vehicle Number *</label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="e.g., ABC-1234"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxCapacity">Max Capacity (kg) *</label>
              <input
                type="number"
                id="maxCapacity"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleChange}
                placeholder="Enter max weight capacity"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <i className="fas fa-calendar-check"></i>
            Availability
          </h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="availableDate">Available Date *</label>
              <input
                type="date"
                id="availableDate"
                name="availableDate"
                value={formData.availableDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="availableTime">Preferred Time *</label>
              <select
                id="availableTime"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleChange}
                required
              >
                <option value="">Select time slot</option>
                <option value="Morning (6AM - 12PM)">Morning (6AM - 12PM)</option>
                <option value="Afternoon (12PM - 6PM)">Afternoon (12PM - 6PM)</option>
                <option value="Evening (6PM - 10PM)">Evening (6PM - 10PM)</option>
                <option value="Full Day">Full Day</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <i className="fas fa-map-marker-alt"></i>
            Preferred Area
          </h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredArea">Preferred Delivery Area *</label>
              <select
                id="preferredArea"
                name="preferredArea"
                value={formData.preferredArea}
                onChange={handleChange}
                required
              >
                <option value="">Select area</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Any Area">Any Area</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <i className="fas fa-sticky-note"></i>
            Additional Information
          </h3>
          
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="additionalNotes">Additional Notes (Optional)</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any special requirements or notes..."
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => window.history.back()}
          >
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          requestId={requestId} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

/**
 * Success Modal Component
 */
const SuccessModal = ({ requestId, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon success">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h2 className="modal-title">Request Submitted Successfully!</h2>
        
        <p className="modal-message">
          Your delivery request has been submitted and is awaiting admin approval.
        </p>
        
        <div className="request-details">
          <div className="detail-item">
            <span className="detail-label">Request ID:</span>
            <span className="detail-value">{requestId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-pending">
              <i className="fas fa-clock"></i>
              Pending Admin Approval
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Next Step:</span>
            <span className="detail-value">Admin will assign a QA officer</span>
          </div>
        </div>
        
        <div className="modal-info">
          <i className="fas fa-info-circle"></i>
          <p>You will be notified once the admin reviews your request and assigns a QA officer for quality inspection.</p>
        </div>
        
        <div className="modal-actions">
          <button className="btn-view-requests" onClick={() => window.location.href = '/driver/requests'}>
            <i className="fas fa-list"></i>
            View My Requests
          </button>
          <button className="btn-close-modal" onClick={onClose}>
            <i className="fas fa-times"></i>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  requestId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DeliveryRequest;

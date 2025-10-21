import { useState, useEffect } from 'react';
import './DeliveryRequestApproval.css';

const DeliveryRequestApproval = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [qaOfficers, setQaOfficers] = useState([]);
  const [selectedQA, setSelectedQA] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock QA Officers data
  const mockQAOfficers = [
    { id: 'QA001', name: 'John Silva', availability: 'Available', region: 'Colombo' },
    { id: 'QA002', name: 'Sarah Perera', availability: 'Available', region: 'Gampaha' },
    { id: 'QA003', name: 'Michael Fernando', availability: 'On Duty', region: 'Kandy' },
    { id: 'QA004', name: 'Priya Rajapaksa', availability: 'Available', region: 'Colombo' },
    { id: 'QA005', name: 'David Jayawardena', availability: 'Available', region: 'Negombo' }
  ];

  useEffect(() => {
    loadRequests();
    setQaOfficers(mockQAOfficers);
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, statusFilter, searchTerm]);

  const loadRequests = () => {
    const storedRequests = localStorage.getItem('driverDeliveryRequests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  const getStatusCounts = () => {
    return {
      pending: requests.filter(r => r.status === 'Pending').length,
      approved: requests.filter(r => r.status === 'Approved').length,
      rejected: requests.filter(r => r.status === 'Rejected').length,
      total: requests.length
    };
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setSelectedQA('');
    setApprovalNotes('');
    setShowApprovalModal(true);
  };

  const handleReject = (request) => {
    if (window.confirm(`Are you sure you want to reject request ${request.id}?`)) {
      updateRequestStatus(request.id, 'Rejected', null, 'Request rejected by admin');
    }
  };

  const confirmApproval = async () => {
    if (!selectedQA) {
      alert('Please select a QA Officer');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const qaOfficer = qaOfficers.find(qa => qa.id === selectedQA);
    updateRequestStatus(
      selectedRequest.id,
      'Approved',
      qaOfficer,
      approvalNotes || 'Request approved'
    );

    setIsProcessing(false);
    setShowApprovalModal(false);
  };

  const updateRequestStatus = (requestId, status, qaOfficer, notes) => {
    const updatedRequests = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          adminApproved: status === 'Approved',
          qaAssigned: qaOfficer ? {
            id: qaOfficer.id,
            name: qaOfficer.name,
            region: qaOfficer.region
          } : null,
          approvalDate: status === 'Approved' ? new Date().toISOString() : null,
          approvalNotes: notes,
          processedBy: 'Admin User' // In real app, get from auth context
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    localStorage.setItem('driverDeliveryRequests', JSON.stringify(updatedRequests));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="approval-container">
      {/* Header */}
      <div className="approval-header">
        <div className="header-content">
          <h1 className="approval-title">
            <i className="fas fa-clipboard-check"></i>
            Delivery Request Management
          </h1>
          <p className="approval-subtitle">
            Review and approve driver delivery requests by assigning QA officers
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{statusCounts.pending}</div>
            <div className="stat-label">Pending Requests</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon approved">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{statusCounts.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rejected">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{statusCounts.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-list"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{statusCounts.total}</div>
            <div className="stat-label">Total Requests</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by driver name, request ID, or vehicle number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filters">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="requests-section">
        {filteredRequests.length === 0 ? (
          <div className="no-requests">
            <i className="fas fa-inbox"></i>
            <p>No requests found</p>
          </div>
        ) : (
          <div className="requests-grid">
            {filteredRequests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-header-info">
                  <div className="request-id">
                    <i className="fas fa-hashtag"></i>
                    {request.id}
                  </div>
                  <span className={`status-badge ${getStatusClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>

                <div className="driver-info">
                  <div className="driver-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="driver-details">
                    <h3>{request.driverName}</h3>
                    <p className="driver-id">Driver ID: {request.driverId}</p>
                  </div>
                </div>

                <div className="request-details-grid">
                  <div className="detail-row">
                    <i className="fas fa-truck"></i>
                    <div>
                      <span className="detail-label">Vehicle</span>
                      <span className="detail-value">{request.vehicleType}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <i className="fas fa-id-card"></i>
                    <div>
                      <span className="detail-label">Vehicle No.</span>
                      <span className="detail-value">{request.vehicleNumber}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <i className="fas fa-calendar"></i>
                    <div>
                      <span className="detail-label">Available Date</span>
                      <span className="detail-value">{request.availableDate}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <i className="fas fa-clock"></i>
                    <div>
                      <span className="detail-label">Available Time</span>
                      <span className="detail-value">{request.availableTime}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <i className="fas fa-weight-hanging"></i>
                    <div>
                      <span className="detail-label">Max Capacity</span>
                      <span className="detail-value">{request.maxCapacity} kg</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <span className="detail-label">Preferred Area</span>
                      <span className="detail-value">{request.preferredArea}</span>
                    </div>
                  </div>
                </div>

                {request.additionalNotes && (
                  <div className="notes-section">
                    <i className="fas fa-sticky-note"></i>
                    <p>{request.additionalNotes}</p>
                  </div>
                )}

                <div className="request-meta">
                  <i className="fas fa-clock"></i>
                  Requested on {formatDate(request.requestDate)}
                </div>

                {request.qaAssigned && (
                  <div className="qa-assigned">
                    <i className="fas fa-user-shield"></i>
                    <div>
                      <strong>QA Officer:</strong> {request.qaAssigned.name}
                      <span className="qa-region">({request.qaAssigned.region})</span>
                    </div>
                  </div>
                )}

                <div className="request-actions">
                  {request.status === 'Pending' ? (
                    <>
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(request)}
                      >
                        <i className="fas fa-check"></i>
                        Approve & Assign QA
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(request)}
                      >
                        <i className="fas fa-times"></i>
                        Reject
                      </button>
                    </>
                  ) : (
                    <div className="processed-info">
                      <i className={`fas ${request.status === 'Approved' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                      {request.status} on {formatDate(request.approvalDate || request.requestDate)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="modal-overlay" onClick={() => !isProcessing && setShowApprovalModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-user-plus"></i>
                Assign QA Officer
              </h2>
              <button
                className="close-btn"
                onClick={() => setShowApprovalModal(false)}
                disabled={isProcessing}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="request-summary">
                <h3>Request Details</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="label">Driver:</span>
                    <span className="value">{selectedRequest?.driverName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Vehicle:</span>
                    <span className="value">{selectedRequest?.vehicleType} - {selectedRequest?.vehicleNumber}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Area:</span>
                    <span className="value">{selectedRequest?.preferredArea}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Date:</span>
                    <span className="value">{selectedRequest?.availableDate}</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-user-shield"></i>
                  Select QA Officer *
                </label>
                <select
                  value={selectedQA}
                  onChange={(e) => setSelectedQA(e.target.value)}
                  disabled={isProcessing}
                >
                  <option value="">-- Select QA Officer --</option>
                  {qaOfficers.map(qa => (
                    <option key={qa.id} value={qa.id}>
                      {qa.name} - {qa.region} ({qa.availability})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-comment"></i>
                  Approval Notes (Optional)
                </label>
                <textarea
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="Add any notes or instructions..."
                  rows="3"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowApprovalModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={confirmApproval}
                disabled={isProcessing || !selectedQA}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    Approve & Assign
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryRequestApproval;

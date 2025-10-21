import React, { useEffect, useState } from 'react';
import './BuyerOrders.css';

function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const qaOptions = [
    { id: 'QA001', name: 'QA Inspector Kumara' },
    { id: 'QA002', name: 'QA Inspector Silva' },
    { id: 'QA003', name: 'QA Inspector Perera' },
    { id: 'QA004', name: 'QA Inspector Fernando' },
    { id: 'QA005', name: 'QA Inspector Jayawardena' }
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrdersData();
  }, [orders, filterStatus, searchTerm]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockOrders = [
        {
          orderId: 'ORD2024001',
          orderNumber: 'Order #87134',
          buyerId: 'B001',
          buyerName: 'Sasha Bandara',
          buyerPhone: '+94 72 4553561',
          buyerEmail: 'sasha.bandara@email.com',
          placedDate: '2024-10-18',
          deliveryDate: '2024-10-20',
          items: [
            { productId: 'P001', name: 'Carrots', quantity: 10, unit: 'kg', pricePerUnit: 120, total: 1200 },
            { productId: 'P002', name: 'Tomatoes', quantity: 15, unit: 'kg', pricePerUnit: 150, total: 2250 },
            { productId: 'P003', name: 'Potatoes', quantity: 20, unit: 'kg', pricePerUnit: 80, total: 1600 }
          ],
          totalItems: 3,
          totalQuantity: 45,
          subtotal: 5050,
          deliveryFee: 500,
          serviceCharge: 505,
          total: 6055,
          status: 'Placed',
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          shippingAddress: {
            street: '123 Green Street',
            city: 'Thimbirigasyaya',
            district: 'Colombo 05',
            phone: '+94 72 4553561'
          },
          assignedQA: null,
          driverRequests: [
            { driverId: 'D001', name: 'Driver Sanjeewa', vehicleType: 'Truck', capacity: '500kg' },
            { driverId: 'D002', name: 'Driver Nuwan', vehicleType: 'Van', capacity: '300kg' }
          ],
          approvedDriver: null
        },
        {
          orderId: 'ORD2024002',
          orderNumber: 'Order #87135',
          buyerId: 'B002',
          buyerName: 'Nimal Perera',
          buyerPhone: '+94 71 2345678',
          buyerEmail: 'nimal.perera@email.com',
          placedDate: '2024-10-19',
          deliveryDate: '2024-10-21',
          items: [
            { productId: 'P004', name: 'Cabbage', quantity: 12, unit: 'kg', pricePerUnit: 90, total: 1080 },
            { productId: 'P005', name: 'Leeks', quantity: 8, unit: 'kg', pricePerUnit: 200, total: 1600 },
            { productId: 'P006', name: 'Beans', quantity: 10, unit: 'kg', pricePerUnit: 180, total: 1800 }
          ],
          totalItems: 3,
          totalQuantity: 30,
          subtotal: 4480,
          deliveryFee: 400,
          serviceCharge: 448,
          total: 5328,
          status: 'Out for Delivery',
          paymentMethod: 'Debit Card',
          paymentStatus: 'Paid',
          shippingAddress: {
            street: '456 Market Road',
            city: 'Nugegoda',
            district: 'Colombo',
            phone: '+94 71 2345678'
          },
          assignedQA: 'QA001',
          driverRequests: [
            { driverId: 'D003', name: 'Driver Mahesh', vehicleType: 'Lorry', capacity: '1000kg' }
          ],
          approvedDriver: { driverId: 'D003', name: 'Driver Mahesh', vehicleType: 'Lorry' }
        },
        {
          orderId: 'ORD2024003',
          orderNumber: 'Order #87136',
          buyerId: 'B003',
          buyerName: 'Priya Rajapaksa',
          buyerPhone: '+94 77 8765432',
          buyerEmail: 'priya.r@email.com',
          placedDate: '2024-10-17',
          deliveryDate: '2024-10-19',
          items: [
            { productId: 'P007', name: 'Green Beans', quantity: 25, unit: 'kg', pricePerUnit: 160, total: 4000 },
            { productId: 'P008', name: 'Pumpkin', quantity: 15, unit: 'kg', pricePerUnit: 70, total: 1050 }
          ],
          totalItems: 2,
          totalQuantity: 40,
          subtotal: 5050,
          deliveryFee: 600,
          serviceCharge: 505,
          total: 6155,
          status: 'Delivered',
          paymentMethod: 'Bank Transfer',
          paymentStatus: 'Paid',
          shippingAddress: {
            street: '789 Lake View',
            city: 'Mount Lavinia',
            district: 'Colombo',
            phone: '+94 77 8765432'
          },
          assignedQA: 'QA002',
          driverRequests: [],
          approvedDriver: { driverId: 'D001', name: 'Driver Sanjeewa', vehicleType: 'Truck' }
        },
        {
          orderId: 'ORD2024004',
          orderNumber: 'Order #87137',
          buyerId: 'B004',
          buyerName: 'Kamal Silva',
          buyerPhone: '+94 76 5432109',
          buyerEmail: 'kamal.silva@email.com',
          placedDate: '2024-10-20',
          deliveryDate: '2024-10-22',
          items: [
            { productId: 'P009', name: 'Beetroot', quantity: 18, unit: 'kg', pricePerUnit: 140, total: 2520 },
            { productId: 'P010', name: 'Cucumber', quantity: 22, unit: 'kg', pricePerUnit: 110, total: 2420 },
            { productId: 'P011', name: 'Bell Peppers', quantity: 10, unit: 'kg', pricePerUnit: 250, total: 2500 }
          ],
          totalItems: 3,
          totalQuantity: 50,
          subtotal: 7440,
          deliveryFee: 700,
          serviceCharge: 744,
          total: 8884,
          status: 'Placed',
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          shippingAddress: {
            street: '321 Beach Road',
            city: 'Wellawatte',
            district: 'Colombo',
            phone: '+94 76 5432109'
          },
          assignedQA: 'QA003',
          driverRequests: [],
          approvedDriver: null
        }
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrdersData = () => {
    let filtered = orders;

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerPhone.includes(searchTerm) ||
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleQAChange = (orderId, qaId) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { ...order, assignedQA: qaId } : order
      )
    );
  };

  const handleDriverApproval = (orderId, driver) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { 
          ...order, 
          approvedDriver: driver,
          driverRequests: [] // Clear driver requests after approval
        } : order
      )
    );
  };

  const handleDriverDecline = (orderId, declinedDriver) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.orderId === orderId) {
          const newRequests = order.driverRequests.filter(d => d.driverId !== declinedDriver.driverId);
          return {
            ...order,
            driverRequests: newRequests
          };
        }
        return order;
      })
    );
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Placed': return 'status-placed';
      case 'Out for Delivery': return 'status-delivery';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getQAName = (qaId) => {
    const qa = qaOptions.find(q => q.id === qaId);
    return qa ? qa.name : 'Not Assigned';
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      placed: orders.filter(o => o.status === 'Placed').length,
      delivery: orders.filter(o => o.status === 'Out for Delivery').length,
      delivered: orders.filter(o => o.status === 'Delivered').length
    };
  };

  const stats = getOrderStats();

  return (
    <div className="buyer-orders-container">
      {/* Header */}
      <div className="orders-header">
        <div className="header-content">
          <h1 className="orders-title">
            <i className="fas fa-shopping-cart"></i>
            Buyer Orders Management
          </h1>
          <p className="orders-subtitle">
            View and manage all orders placed by buyers
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-list"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon placed">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{stats.placed}</div>
            <div className="stat-label">Placed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon delivery">
            <i className="fas fa-truck"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{stats.delivery}</div>
            <div className="stat-label">Out for Delivery</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon delivered">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-details">
            <div className="stat-value">{stats.delivered}</div>
            <div className="stat-label">Delivered</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by order ID, buyer name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filters">
          {['All', 'Placed', 'Out for Delivery', 'Delivered'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-section">
        {isLoading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-inbox"></i>
            <p>No orders found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="buyer-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Buyer Details</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Assigned QA</th>
                  <th>Assigned Driver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <React.Fragment key={order.orderId}>
                    <tr className="order-row">
                      <td>
                        <div className="order-id-cell">
                          <strong>{order.orderId}</strong>
                          <span className="order-number">{order.orderNumber}</span>
                          <span className="order-date">
                            <i className="far fa-calendar"></i>
                            {order.placedDate}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="buyer-details-cell">
                          <div className="buyer-name">
                            <i className="fas fa-user"></i>
                            {order.buyerName}
                          </div>
                          <div className="buyer-contact">
                            <i className="fas fa-phone"></i>
                            {order.buyerPhone}
                          </div>
                          <div className="buyer-email">
                            <i className="fas fa-envelope"></i>
                            {order.buyerEmail}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="items-cell">
                          <div className="item-count">
                            <i className="fas fa-box"></i>
                            {order.totalItems} items
                          </div>
                          <div className="item-quantity">
                            <i className="fas fa-weight-hanging"></i>
                            {order.totalQuantity} kg
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="amount-cell">
                          <div className="total-amount">Rs. {order.total.toLocaleString()}</div>
                          <div className="payment-method">
                            <i className="fas fa-credit-card"></i>
                            {order.paymentMethod}
                          </div>
                          <div className={`payment-status ${order.paymentStatus === 'Paid' ? 'paid' : 'pending'}`}>
                            {order.paymentStatus}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="qa-select"
                          value={order.assignedQA || ''}
                          onChange={(e) => handleQAChange(order.orderId, e.target.value)}
                        >
                          <option value="">-- Select QA --</option>
                          {qaOptions.map(qa => (
                            <option key={qa.id} value={qa.id}>{qa.name}</option>
                          ))}
                        </select>
                        {order.assignedQA && (
                          <div className="assigned-qa-badge">
                            <i className="fas fa-user-shield"></i>
                            {getQAName(order.assignedQA)}
                          </div>
                        )}
                      </td>
                      <td>
                        {order.approvedDriver ? (
                          <div className="approved-driver">
                            <div className="driver-name">
                              <i className="fas fa-truck"></i>
                              {order.approvedDriver.name}
                            </div>
                            <div className="driver-vehicle">{order.approvedDriver.vehicleType}</div>
                          </div>
                        ) : order.driverRequests?.length > 0 ? (
                          <div className="driver-requests">
                            {order.driverRequests.map(driver => (
                              <div key={driver.driverId} className="driver-request-item">
                                <div className="driver-info">
                                  <div className="driver-name-small">{driver.name}</div>
                                  <div className="driver-vehicle-small">{driver.vehicleType} ({driver.capacity})</div>
                                </div>
                                <div className="driver-actions">
                                  <button
                                    className="approve-btn"
                                    onClick={() => handleDriverApproval(order.orderId, driver)}
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    className="decline-btn"
                                    onClick={() => handleDriverDecline(order.orderId, driver)}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="no-driver">No driver assigned</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="view-details-btn"
                          onClick={() => toggleOrderExpansion(order.orderId)}
                        >
                          <i className={`fas fa-chevron-${expandedOrder === order.orderId ? 'up' : 'down'}`}></i>
                          Details
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Order Details */}
                    {expandedOrder === order.orderId && (
                      <tr className="expanded-row">
                        <td colSpan="8">
                          <div className="order-details-expanded">
                            <div className="details-section">
                              <h4>
                                <i className="fas fa-box-open"></i>
                                Order Items
                              </h4>
                              <table className="items-table">
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.items.map(item => (
                                    <tr key={item.productId}>
                                      <td>{item.name}</td>
                                      <td>{item.quantity} {item.unit}</td>
                                      <td>Rs. {item.pricePerUnit}</td>
                                      <td>Rs. {item.total.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td colSpan="3"><strong>Subtotal</strong></td>
                                    <td><strong>Rs. {order.subtotal.toLocaleString()}</strong></td>
                                  </tr>
                                  <tr>
                                    <td colSpan="3">Delivery Fee</td>
                                    <td>Rs. {order.deliveryFee.toLocaleString()}</td>
                                  </tr>
                                  <tr>
                                    <td colSpan="3">Service Charge</td>
                                    <td>Rs. {order.serviceCharge.toLocaleString()}</td>
                                  </tr>
                                  <tr className="total-row">
                                    <td colSpan="3"><strong>Grand Total</strong></td>
                                    <td><strong>Rs. {order.total.toLocaleString()}</strong></td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>

                            <div className="details-section">
                              <h4>
                                <i className="fas fa-map-marker-alt"></i>
                                Shipping Address
                              </h4>
                              <div className="address-card">
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.district}</p>
                                <p>
                                  <i className="fas fa-phone"></i>
                                  {order.shippingAddress.phone}
                                </p>
                              </div>
                            </div>

                            <div className="details-section">
                              <h4>
                                <i className="fas fa-info-circle"></i>
                                Delivery Information
                              </h4>
                              <div className="delivery-info">
                                <div className="info-item">
                                  <span className="info-label">Delivery Date:</span>
                                  <span className="info-value">{order.deliveryDate}</span>
                                </div>
                                <div className="info-item">
                                  <span className="info-label">Payment Method:</span>
                                  <span className="info-value">{order.paymentMethod}</span>
                                </div>
                                <div className="info-item">
                                  <span className="info-label">Payment Status:</span>
                                  <span className={`info-value payment-${order.paymentStatus.toLowerCase()}`}>
                                    {order.paymentStatus}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerOrders;

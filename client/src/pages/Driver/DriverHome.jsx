import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './DriverHome.css'

function DriverHome() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isOnline, setIsOnline] = useState(true)
  const navigate = useNavigate()

  // Sample driver data
  const [driverData] = useState({
    name: 'John Silva',
    id: 'DRV001',
    phone: '+94 77 123 4567',
    email: 'john.silva@email.com',
    rating: 4.8,
    totalDeliveries: 247,
    joinDate: '2023-05-15',
    vehicle: {
      type: 'Small Truck',
      model: 'Toyota Hiace',
      plateNumber: 'CAR-1234',
      capacity: '1500 kg'
    },
    coverageAreas: ['Kandy', 'Matale', 'Nuwara Eliya', 'Colombo'],
    bankAccount: {
      accountNumber: '****-****-****-5678',
      bank: 'Commercial Bank'
    }
  })

  // Sample earnings data
  const [earnings] = useState({
    today: 3200,
    thisWeek: 18500,
    thisMonth: 75400,
    total: 450000,
    pending: 2400
  })

  // Sample tasks data
  const [tasks] = useState([
    {
      id: 'TASK001',
      status: 'available',
      pickup: 'Kandy Central Market',
      delivery: 'Colombo Supermarket',
      items: 'Vegetables 25kg',
      payment: 1200,
      distance: '120 km',
      estimatedTime: '2.5 hours',
      priority: 'high'
    },
    {
      id: 'TASK002',
      status: 'in-progress',
      pickup: 'Matale Farm',
      delivery: 'Galle Market',
      items: 'Premium Vegetables 50kg',
      payment: 2800,
      distance: '95 km',
      estimatedTime: '3 hours',
      priority: 'urgent'
    },
    {
      id: 'TASK003',
      status: 'available',
      pickup: 'Kandy Organic Farm',
      delivery: 'Negombo Store',
      items: 'Organic Mix 30kg',
      payment: 1500,
      distance: '140 km',
      estimatedTime: '3.5 hours',
      priority: 'medium'
    }
  ])

  // Sample delivery history
  const [deliveryHistory] = useState([
    {
      id: 'TASK098',
      date: '2024-07-17',
      pickup: 'Kandy Market',
      delivery: 'Colombo Store',
      payment: 1800,
      status: 'completed',
      rating: 5
    },
    {
      id: 'TASK097',
      date: '2024-07-16',
      pickup: 'Matale Farm',
      delivery: 'Gampaha Market',
      payment: 2200,
      status: 'completed',
      rating: 4
    },
    {
      id: 'TASK096',
      date: '2024-07-15',
      pickup: 'Nuwara Eliya',
      delivery: 'Kandy Store',
      payment: 1600,
      status: 'completed',
      rating: 5
    }
  ])

  // Sample messages
  const [messages] = useState([
    {
      id: 1,
      from: 'Support Team',
      subject: 'Welcome to Govimansala',
      message: 'Thank you for joining our platform. Here are some tips to get started...',
      date: '2024-07-18',
      read: false
    },
    {
      id: 2,
      from: 'Customer',
      subject: 'Delivery Update Request',
      message: 'Hi, could you please provide an update on my delivery scheduled for today?',
      date: '2024-07-17',
      read: true
    },
    {
      id: 3,
      from: 'Admin',
      subject: 'Payment Processed',
      message: 'Your weekly payment of Rs. 18,500 has been processed successfully.',
      date: '2024-07-16',
      read: true
    }
  ])

  const handleAcceptTask = (taskId) => {
    alert(`Task ${taskId} accepted! You can start the delivery.`)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  const renderDashboard = () => (
    <div className="dashboard-content">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <div className="welcome-text">
            <h1>Good Morning, {driverData.name}! 🌅</h1>
            <p>Ready to start earning today? You have {tasks.filter(t => t.status === 'available').length} new delivery opportunities waiting for you!</p>
          </div>
          <div className="online-toggle-section">
            <div className="status-display">
              <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></span>
              <span className="status-label">
                {isOnline ? 'You\'re Online' : 'You\'re Offline'}
              </span>
            </div>
            <label className="modern-toggle">
              <input 
                type="checkbox" 
                checked={isOnline} 
                onChange={(e) => setIsOnline(e.target.checked)}
              />
              <span className="toggle-switch">
                <span className="toggle-button"></span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="earnings-summary">
        <div className="summary-header">
          <h2>💰 Your Earnings</h2>
          <select className="period-selector">
            <option>This Week</option>
            <option>This Month</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="earnings-cards">
          <div className="earning-card primary">
            <div className="card-header">
              <span className="card-title">Today's Earnings</span>
              <span className="card-icon">🎯</span>
            </div>
            <div className="card-amount">Rs. {earnings.today.toLocaleString()}</div>
            <div className="card-change positive">+Rs. 450 from yesterday</div>
          </div>
          <div className="earning-card secondary">
            <div className="card-header">
              <span className="card-title">This Week</span>
              <span className="card-icon">📅</span>
            </div>
            <div className="card-amount">Rs. {earnings.thisWeek.toLocaleString()}</div>
            <div className="card-change positive">+12% from last week</div>
          </div>
          <div className="earning-card tertiary">
            <div className="card-header">
              <span className="card-title">This Month</span>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-amount">Rs. {earnings.thisMonth.toLocaleString()}</div>
            <div className="card-change positive">+15% from last month</div>
          </div>
          <div className="earning-card pending">
            <div className="card-header">
              <span className="card-title">Pending Payment</span>
              <span className="card-icon">⏰</span>
            </div>
            <div className="card-amount">Rs. {earnings.pending.toLocaleString()}</div>
            <div className="card-change">Payment on Friday</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>🚀 Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => navigate('/orderdashboard')}>
            <div className="action-icon">📋</div>
            <div className="action-text">
              <span className="action-title">Order Dashboard</span>
              <span className="action-desc">Manage delivery orders</span>
            </div>
          </button>
          <button className="action-btn" onClick={() => setActiveSection('tasks')}>
            <div className="action-icon">📋</div>
            <div className="action-text">
              <span className="action-title">View Tasks</span>
              <span className="action-desc">{tasks.filter(t => t.status === 'available').length} available</span>
            </div>
          </button>
          <button className="action-btn" onClick={() => setActiveSection('earnings')}>
            <div className="action-icon">�</div>
            <div className="action-text">
              <span className="action-title">Earnings Report</span>
              <span className="action-desc">View detailed breakdown</span>
            </div>
          </button>
          <button className="action-btn" onClick={() => setActiveSection('messages')}>
            <div className="action-icon">�</div>
            <div className="action-text">
              <span className="action-title">Messages</span>
              <span className="action-desc">{messages.filter(m => !m.read).length} unread</span>
            </div>
          </button>
          <button className="action-btn" onClick={() => setActiveSection('settings')}>
            <div className="action-icon">⚙️</div>
            <div className="action-text">
              <span className="action-title">Settings</span>
              <span className="action-desc">Update preferences</span>
            </div>
          </button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="performance-stats">
        <h2>📈 Your Performance</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-visual">
              <div className="stat-circle" style={{background: `conic-gradient(#ff6b35 ${(driverData.rating/5)*100}%, #f0f0f0 0)`}}>
                <span className="stat-value">{driverData.rating}</span>
              </div>
            </div>
            <div className="stat-info">
              <span className="stat-title">Rating</span>
              <span className="stat-subtitle">Out of 5.0</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-visual">
              <div className="stat-number">{driverData.totalDeliveries}</div>
            </div>
            <div className="stat-info">
              <span className="stat-title">Total Deliveries</span>
              <span className="stat-subtitle">Lifetime completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-visual">
              <div className="stat-number">{driverData.coverageAreas.length}</div>
            </div>
            <div className="stat-info">
              <span className="stat-title">Coverage Areas</span>
              <span className="stat-subtitle">Cities you serve</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-visual">
              <div className="stat-number">Rs. {Math.floor(earnings.total/1000)}K</div>
            </div>
            <div className="stat-info">
              <span className="stat-title">Total Earned</span>
              <span className="stat-subtitle">All time earnings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Profile Card */}
      <div className="driver-profile-card">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {driverData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="profile-details">
            <h3>{driverData.name}</h3>
            <p className="driver-id">Driver ID: {driverData.id}</p>
            <p className="join-date">Member since {new Date(driverData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        
        <div className="profile-sections">
          <div className="profile-section">
            <h4>🚛 Vehicle Details</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{driverData.vehicle.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Model:</span>
                <span className="detail-value">{driverData.vehicle.model}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Plate:</span>
                <span className="detail-value">{driverData.vehicle.plateNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Capacity:</span>
                <span className="detail-value">{driverData.vehicle.capacity}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h4>📍 Service Areas</h4>
            <div className="areas-tags">
              {driverData.coverageAreas.map(area => (
                <span key={area} className="area-tag">{area}</span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h4>📱 Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-value">{driverData.phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span className="contact-value">{driverData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="tasks-content">
      <div className="tasks-header">
        <h2>My Tasks</h2>
        <div className="task-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Available</button>
          <button className="filter-btn">In Progress</button>
          <button className="filter-btn">Completed</button>
        </div>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${task.status}`}>
            <div className="task-header">
              <div className="task-info">
                <span className="task-id">#{task.id}</span>
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
                <span className={`status-badge ${task.status}`}>
                  {task.status}
                </span>
              </div>
              <div className="task-payment">
                <span className="amount">Rs. {task.payment.toLocaleString()}</span>
                <span className="distance">{task.distance}</span>
              </div>
            </div>
            <div className="task-route">
              <div className="route-point pickup">
                <i className="fas fa-map-marker-alt"></i>
                <span>{task.pickup}</span>
              </div>
              <div className="route-arrow">→</div>
              <div className="route-point delivery">
                <i className="fas fa-flag"></i>
                <span>{task.delivery}</span>
              </div>
            </div>
            <div className="task-details">
              <span className="items">📦 {task.items}</span>
              <span className="time">⏱️ {task.estimatedTime}</span>
            </div>
            <div className="task-actions">
              {task.status === 'available' && (
                <>
                  <button className="btn-secondary">View Route</button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleAcceptTask(task.id)}
                  >
                    Accept Task
                  </button>
                </>
              )}
              {task.status === 'in-progress' && (
                <>
                  <button className="btn-secondary">Contact Customer</button>
                  <button className="btn-primary">Update Status</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHistory = () => (
    <div className="history-content">
      <div className="history-header">
        <h2>Delivery History</h2>
        <div className="history-filters">
          <select className="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>
      <div className="history-list">
        {deliveryHistory.map(delivery => (
          <div key={delivery.id} className="history-card">
            <div className="history-header">
              <div className="history-info">
                <span className="history-id">#{delivery.id}</span>
                <span className="history-date">{delivery.date}</span>
              </div>
              <div className="history-rating">
                {'⭐'.repeat(delivery.rating)}
              </div>
            </div>
            <div className="history-route">
              <span className="pickup">📍 {delivery.pickup}</span>
              <span className="arrow">→</span>
              <span className="delivery">🎯 {delivery.delivery}</span>
            </div>
            <div className="history-payment">
              <span className="amount">Rs. {delivery.payment.toLocaleString()}</span>
              <span className={`status ${delivery.status}`}>{delivery.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="messages-content">
      <div className="messages-header">
        <h2>Messages</h2>
        <button className="btn-primary">Mark All Read</button>
      </div>
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className={`message-card ${!message.read ? 'unread' : ''}`}>
            <div className="message-header">
              <div className="message-info">
                <span className="sender">{message.from}</span>
                <span className="date">{message.date}</span>
              </div>
              {!message.read && <div className="unread-indicator"></div>}
            </div>
            <div className="message-subject">{message.subject}</div>
            <div className="message-preview">{message.message}</div>
            <div className="message-actions">
              <button className="btn-secondary">Reply</button>
              <button className="btn-primary">Mark as Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEarnings = () => (
    <div className="earnings-content">
      <div className="earnings-header">
        <h2>Earnings Overview</h2>
        <select className="period-select">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="earnings-chart">
        <div className="chart-placeholder">
          <h3>Weekly Earnings Chart</h3>
          <div className="chart-bars">
            <div className="bar" style={{height: '60%'}}><span>Mon</span></div>
            <div className="bar" style={{height: '80%'}}><span>Tue</span></div>
            <div className="bar" style={{height: '45%'}}><span>Wed</span></div>
            <div className="bar" style={{height: '90%'}}><span>Thu</span></div>
            <div className="bar" style={{height: '70%'}}><span>Fri</span></div>
            <div className="bar" style={{height: '50%'}}><span>Sat</span></div>
            <div className="bar" style={{height: '30%'}}><span>Sun</span></div>
          </div>
        </div>
      </div>
      <div className="earnings-breakdown">
        <div className="breakdown-item">
          <span className="label">Base Earnings:</span>
          <span className="value">Rs. 65,000</span>
        </div>
        <div className="breakdown-item">
          <span className="label">Bonus:</span>
          <span className="value">Rs. 8,400</span>
        </div>
        <div className="breakdown-item">
          <span className="label">Tips:</span>
          <span className="value">Rs. 2,000</span>
        </div>
        <div className="breakdown-item total">
          <span className="label">Total:</span>
          <span className="value">Rs. {earnings.thisMonth.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="settings-content">
      <h2>Settings</h2>
      <div className="settings-sections">
        <div className="settings-section">
          <h3>Account Settings</h3>
          <div className="setting-item">
            <label>Email Notifications</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>SMS Notifications</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Push Notifications</label>
            <input type="checkbox" />
          </div>
        </div>
        <div className="settings-section">
          <h3>Privacy Settings</h3>
          <div className="setting-item">
            <label>Location Sharing</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Activity Status</label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
        <div className="settings-section">
          <h3>Payment Settings</h3>
          <div className="setting-item">
            <label>Bank Account:</label>
            <span>{driverData.bankAccount.accountNumber}</span>
            <button className="btn-secondary">Edit</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard': return renderDashboard()
      case 'tasks': return renderTasks()
      case 'history': return renderHistory()
      case 'messages': return renderMessages()
      case 'earnings': return renderEarnings()
      case 'settings': return renderSettings()
      default: return renderDashboard()
    }
  }

  return (
    <div className="driver-home">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <h2>🚛 Govimansala</h2>
            <span>Driver Portal</span>
          </div>
        </div>
        
        <div className="sidebar-nav">
          <div 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </div>
          <div 
            className="nav-item"
            onClick={() => navigate('/orderdashboard')}
          >
            <i className="fas fa-clipboard-list"></i>
            <span>Order Dashboard</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveSection('tasks')}
          >
            <i className="fas fa-tasks"></i>
            <span>My Tasks</span>
            <div className="badge">{tasks.filter(t => t.status === 'available').length}</div>
          </div>
          <div 
            className={`nav-item ${activeSection === 'history' ? 'active' : ''}`}
            onClick={() => setActiveSection('history')}
          >
            <i className="fas fa-history"></i>
            <span>Delivery History</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveSection('messages')}
          >
            <i className="fas fa-envelope"></i>
            <span>Messages</span>
            <div className="badge">{messages.filter(m => !m.read).length}</div>
          </div>
          <div 
            className={`nav-item ${activeSection === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveSection('earnings')}
          >
            <i className="fas fa-chart-line"></i>
            <span>Earnings</span>
          </div>
          <div 
            className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="driver-profile">
            <div className="profile-avatar">
              {driverData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile-info">
              <span className="name">{driverData.name}</span>
              <span className="id">{driverData.id}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default DriverHome

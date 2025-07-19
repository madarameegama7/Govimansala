import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Driver/Driver.css'

function Driver() {
  const [isOnline, setIsOnline] = useState(false)
  const [availableTasks] = useState([
    {
      id: 'TASK001',
      pickup: 'Kandy Central Market',
      delivery: 'Colombo Supermarket',
      items: 'Vegetables 25kg',
      payment: 'Rs. 1,200',
      distance: '120 km'
    },
    {
      id: 'TASK002',
      pickup: 'Matale Farm',
      delivery: 'Galle Market',
      items: 'Premium Vegetables 50kg',
      payment: 'Rs. 2,800',
      distance: '95 km'
    },
    {
      id: 'TASK003',
      pickup: 'Kandy Organic Farm',
      delivery: 'Negombo Store',
      items: 'Organic Mix 30kg',
      payment: 'Rs. 1,500',
      distance: '140 km'
    }
  ])

  const navigate = useNavigate()

  const handleAcceptTask = (taskId) => {
    alert(`Task ${taskId} accepted! You can start the delivery.`)
  }

  return (
    <div className="driver-dashboard">
      {/* Header */}
      <div className="driver-header">
        <div className="driver-info">
          <h1>🚛 Driver Dashboard</h1>
          <p>Welcome back, John Driver!</p>
        </div>
        <div className="online-toggle">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={isOnline} 
              onChange={(e) => setIsOnline(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <span>{isOnline ? '🟢 Online' : '🔴 Offline'}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>💰 Today's Earnings</h3>
          <p className="stat-value">Rs. 2,400</p>
        </div>
        <div className="stat-card">
          <h3>📦 Completed</h3>
          <p className="stat-value">8 deliveries</p>
        </div>
        <div className="stat-card">
          <h3>⭐ Rating</h3>
          <p className="stat-value">4.8/5</p>
        </div>
      </div>

      {/* Available Tasks */}
      <div className="tasks-section">
        <h2>📋 Available Tasks</h2>
        
        {!isOnline ? (
          <div className="offline-message">
            <p>🔴 You are offline. Turn on availability to see tasks.</p>
          </div>
        ) : (
          <div className="tasks-list">
            {availableTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <span className="task-id">#{task.id}</span>
                  <span className="task-payment">{task.payment}</span>
                </div>
                
                <div className="task-route">
                  <div className="route-info">
                    <p><strong>📍 Pickup:</strong> {task.pickup}</p>
                    <p><strong>🎯 Delivery:</strong> {task.delivery}</p>
                    <p><strong>📦 Items:</strong> {task.items}</p>
                    <p><strong>🛣️ Distance:</strong> {task.distance}</p>
                  </div>
                </div>
                
                <div className="task-actions">
                  <button className="btn-secondary">View Details</button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleAcceptTask(task.id)}
                  >
                    Accept Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Driver

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import {
  generateUserReport,
  generateOrderReport,
  generateRevenueReport,
  generatePerformanceReport,
  generateInventoryReport,
  generateCustomReport
} from '../../utils/pdfGenerator';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  
  // State for report options
  const [userReportOptions, setUserReportOptions] = useState({
    farmers: true,
    vendors: true,
    drivers: false,
    qaStaff: false
  });
  
  const [orderReportOptions, setOrderReportOptions] = useState({
    allOrders: true,
    completedOnly: false,
    pendingOrders: false,
    cancelledOrders: false
  });
  
  const [revenueReportOptions, setRevenueReportOptions] = useState({
    totalRevenue: true,
    serviceCharges: true,
    deliveryFees: false,
    farmerEarnings: false
  });
  
  const [performanceReportOptions, setPerformanceReportOptions] = useState({
    deliveryPerformance: true,
    qaMetrics: false,
    driverEfficiency: false,
    userSatisfaction: false
  });
  
  const [inventoryReportOptions, setInventoryReportOptions] = useState({
    stockLevels: true,
    popularProducts: false,
    seasonalTrends: false,
    lowStockAlerts: false
  });
  
  const [customReportOptions, setCustomReportOptions] = useState({
    customFields: false,
    advancedFilters: false,
    comparativeAnalysis: false,
    excelExport: false
  });
  
  const [reportPeriods, setReportPeriods] = useState({
    user: 'Last 30 Days',
    order: 'Last 30 Days',
    revenue: 'Last 30 Days',
    performance: 'Last 30 Days',
    inventory: 'Last 30 Days',
    custom: 'Last 30 Days'
  });
  
  // Handlers for generating reports
  const handleGenerateUserReport = () => {
    generateUserReport(userReportOptions, reportPeriods.user);
  };
  
  const handleGenerateOrderReport = () => {
    generateOrderReport(orderReportOptions, reportPeriods.order);
  };
  
  const handleGenerateRevenueReport = () => {
    generateRevenueReport(revenueReportOptions, reportPeriods.revenue);
  };
  
  const handleGeneratePerformanceReport = () => {
    generatePerformanceReport(performanceReportOptions, reportPeriods.performance);
  };
  
  const handleGenerateInventoryReport = () => {
    generateInventoryReport(inventoryReportOptions, reportPeriods.inventory);
  };
  
  const handleGenerateCustomReport = () => {
    generateCustomReport(customReportOptions, reportPeriods.custom);
  };

  useEffect(() => {
    setTimeout(() => {
      setStats({
        ordersCount: 123,
        farmersCount: 45,
        vendorsCount: 30,
        driversCount: 15,
        qasCount: 10,
        pendingQA: 8,
        activeDrivers: 5,
        totalRevenue: 2547800,
        monthlyGrowth: 12.5,
        activeUsers: 78,
        completedOrders: 98,
      });
    }, 500);
  }, []);

  if (!stats) return (
    <div className="dashboard-loading">
      <div className="loading-spinner"></div>
      <p>Loading dashboard...</p>
    </div>
  );

  const revenueData = [
    { day: 'Mon', revenue: 45000, orders: 12 },
    { day: 'Tue', revenue: 52000, orders: 15 },
    { day: 'Wed', revenue: 38000, orders: 10 },
    { day: 'Thu', revenue: 61000, orders: 18 },
    { day: 'Fri', revenue: 75000, orders: 22 },
    { day: 'Sat', revenue: 89000, orders: 28 },
    { day: 'Sun', revenue: 67000, orders: 20 },
  ];

  const userDistribution = [
    { name: 'Farmers', value: stats.farmersCount, color: '#27ae60' },
    { name: 'Vendors', value: stats.vendorsCount, color: '#3498db' },
    { name: 'Drivers', value: stats.driversCount, color: '#f39c12' },
    { name: 'QA Staff', value: stats.qasCount, color: '#9b59b6' },
  ];

  const orderStatusData = [
    { status: 'Completed', count: 98, color: '#27ae60' },
    { status: 'Processing', count: 15, color: '#3498db' },
    { status: 'Pending', count: 8, color: '#f39c12' },
    { status: 'Cancelled', count: 2, color: '#e74c3c' },
  ];

  const formatCurrency = (value) => {
    return `Rs. ${value.toLocaleString()}`;
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <i className="fas fa-chart-line"></i>
            Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-actions">
          <div className="time-range-selector">
            <button 
              className={timeRange === 'week' ? 'active' : ''} 
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={timeRange === 'month' ? 'active' : ''} 
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={timeRange === 'year' ? 'active' : ''} 
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card success">
          <div className="metric-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="metric-details">
            <h3 className="metric-title">Total Orders</h3>
            <p className="metric-value">{stats.ordersCount}</p>
            <span className="metric-change positive">
              <i className="fas fa-arrow-up"></i> {stats.completedOrders} completed
            </span>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="metric-details">
            <h3 className="metric-title">Active Users</h3>
            <p className="metric-value">{stats.activeUsers}</p>
            <span className="metric-change neutral">
              <i className="fas fa-circle"></i> Online now
            </span>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="metric-details">
            <h3 className="metric-title">Pending Tasks</h3>
            <p className="metric-value">{stats.pendingQA}</p>
            <span className="metric-change neutral">
              <i className="fas fa-clipboard-check"></i> QA assignments
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon farmers">
            <i className="fas fa-tractor"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Total Farmers</h4>
            <p className="stat-value">{stats.farmersCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon vendors">
            <i className="fas fa-store"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Total Vendors</h4>
            <p className="stat-value">{stats.vendorsCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon drivers">
            <i className="fas fa-truck"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Total Drivers</h4>
            <p className="stat-value">{stats.driversCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon qa">
            <i className="fas fa-user-shield"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">QA Staff</h4>
            <p className="stat-value">{stats.qasCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Buyer Orders</h4>
            <p className="stat-value">{stats.ordersCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-hourglass-half"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Pending QA</h4>
            <p className="stat-value">{stats.pendingQA}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-drivers">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Active Drivers</h4>
            <p className="stat-value">{stats.activeDrivers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h4 className="stat-label">Completed Orders</h4>
            <p className="stat-value">{stats.completedOrders}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Revenue Chart */}
        <div className="chart-card large">
          <div className="chart-header">
            <h3 className="chart-title">
              <i className="fas fa-chart-area"></i>
              Weekly Revenue Overview
            </h3>
            <div className="chart-legend-info">
              <span className="legend-item">
                <span className="legend-dot revenue"></span>
                Revenue
              </span>
              <span className="legend-item">
                <span className="legend-dot orders"></span>
                Orders
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004d40" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#004d40" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={(value) => `Rs. ${value/1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '10px'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? formatCurrency(value) : value,
                  name === 'revenue' ? 'Revenue' : 'Orders'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#004d40" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="chart-card medium">
          <div className="chart-header">
            <h3 className="chart-title">
              <i className="fas fa-chart-pie"></i>
              User Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {userDistribution.map((item, index) => (
              <div key={index} className="pie-legend-item">
                <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                <span className="legend-text">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Bar Chart */}
        <div className="chart-card medium">
          <div className="chart-header">
            <h3 className="chart-title">
              <i className="fas fa-chart-bar"></i>
              Order Status Overview
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="status" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3 className="section-title">
          <i className="fas fa-bolt"></i>
          Quick Actions
        </h3>
        <div className="quick-actions-grid">
          <button className="action-btn primary">
            <i className="fas fa-user-plus"></i>
            <span>Add New User</span>
          </button>
          <button className="action-btn success">
            <i className="fas fa-file-invoice"></i>
            <span>View Reports</span>
          </button>
          <button className="action-btn info">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </button>
          <button className="action-btn warning">
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
          </button>
        </div>
      </div>

      {/* Report Generation Section */}
      <div className="report-generation-section">
        <h3 className="section-title">
          <i className="fas fa-file-alt"></i>
          Report Generation
        </h3>
        
        <div className="report-cards-grid">
          {/* User Reports */}
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon users-report">
                <i className="fas fa-users-cog"></i>
              </div>
              <h4 className="report-title">User Reports</h4>
            </div>
            <p className="report-description">
              Generate comprehensive reports on farmers, vendors, drivers, and QA staff including registration trends and activity logs.
            </p>
            <div className="report-options">
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={userReportOptions.farmers}
                  onChange={(e) => setUserReportOptions({...userReportOptions, farmers: e.target.checked})}
                />
                <span>Farmers Report</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={userReportOptions.vendors}
                  onChange={(e) => setUserReportOptions({...userReportOptions, vendors: e.target.checked})}
                />
                <span>Vendors Report</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={userReportOptions.drivers}
                  onChange={(e) => setUserReportOptions({...userReportOptions, drivers: e.target.checked})}
                />
                <span>Drivers Report</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={userReportOptions.qaStaff}
                  onChange={(e) => setUserReportOptions({...userReportOptions, qaStaff: e.target.checked})}
                />
                <span>QA Staff Report</span>
              </label>
            </div>
            <div className="report-actions">
              <select 
                className="report-period"
                value={reportPeriods.user}
                onChange={(e) => setReportPeriods({...reportPeriods, user: e.target.value})}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Last Year">Last Year</option>
              </select>
              <button className="generate-btn users" onClick={handleGenerateUserReport}>
                <i className="fas fa-download"></i>
                Generate PDF
              </button>
            </div>
          </div>

          {/* Order Reports */}
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon orders-report">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <h4 className="report-title">Order Reports</h4>
            </div>
            <p className="report-description">
              Detailed order analytics including completed, pending, and cancelled orders with revenue breakdown.
            </p>
            <div className="report-options">
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={orderReportOptions.allOrders}
                  onChange={(e) => setOrderReportOptions({...orderReportOptions, allOrders: e.target.checked})}
                />
                <span>All Orders</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={orderReportOptions.completedOnly}
                  onChange={(e) => setOrderReportOptions({...orderReportOptions, completedOnly: e.target.checked})}
                />
                <span>Completed Only</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={orderReportOptions.pendingOrders}
                  onChange={(e) => setOrderReportOptions({...orderReportOptions, pendingOrders: e.target.checked})}
                />
                <span>Pending Orders</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={orderReportOptions.cancelledOrders}
                  onChange={(e) => setOrderReportOptions({...orderReportOptions, cancelledOrders: e.target.checked})}
                />
                <span>Cancelled Orders</span>
              </label>
            </div>
            <div className="report-actions">
              <select 
                className="report-period"
                value={reportPeriods.order}
                onChange={(e) => setReportPeriods({...reportPeriods, order: e.target.value})}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Last Year">Last Year</option>
              </select>
              <button className="generate-btn orders" onClick={handleGenerateOrderReport}>
                <i className="fas fa-download"></i>
                Generate PDF
              </button>
            </div>
          </div>

          {/* Revenue Reports */}
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon revenue-report">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4 className="report-title">Revenue Reports</h4>
            </div>
            <p className="report-description">
              Financial reports with revenue breakdowns, service charges, delivery fees, and farmer earnings.
            </p>
            <div className="report-options">
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={revenueReportOptions.totalRevenue}
                  onChange={(e) => setRevenueReportOptions({...revenueReportOptions, totalRevenue: e.target.checked})}
                />
                <span>Total Revenue</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={revenueReportOptions.serviceCharges}
                  onChange={(e) => setRevenueReportOptions({...revenueReportOptions, serviceCharges: e.target.checked})}
                />
                <span>Service Charges</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={revenueReportOptions.deliveryFees}
                  onChange={(e) => setRevenueReportOptions({...revenueReportOptions, deliveryFees: e.target.checked})}
                />
                <span>Delivery Fees</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={revenueReportOptions.farmerEarnings}
                  onChange={(e) => setRevenueReportOptions({...revenueReportOptions, farmerEarnings: e.target.checked})}
                />
                <span>Farmer Earnings</span>
              </label>
            </div>
            <div className="report-actions">
              <select 
                className="report-period"
                value={reportPeriods.revenue}
                onChange={(e) => setReportPeriods({...reportPeriods, revenue: e.target.value})}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Last Year">Last Year</option>
              </select>
              <button className="generate-btn revenue" onClick={handleGenerateRevenueReport}>
                <i className="fas fa-download"></i>
                Generate PDF
              </button>
            </div>
          </div>

          {/* Performance Reports */}
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon performance-report">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <h4 className="report-title">Performance Reports</h4>
            </div>
            <p className="report-description">
              System performance metrics including delivery times, QA response rates, and user satisfaction.
            </p>
            <div className="report-options">
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={performanceReportOptions.deliveryPerformance}
                  onChange={(e) => setPerformanceReportOptions({...performanceReportOptions, deliveryPerformance: e.target.checked})}
                />
                <span>Delivery Performance</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={performanceReportOptions.qaMetrics}
                  onChange={(e) => setPerformanceReportOptions({...performanceReportOptions, qaMetrics: e.target.checked})}
                />
                <span>QA Metrics</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={performanceReportOptions.driverEfficiency}
                  onChange={(e) => setPerformanceReportOptions({...performanceReportOptions, driverEfficiency: e.target.checked})}
                />
                <span>Driver Efficiency</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={performanceReportOptions.userSatisfaction}
                  onChange={(e) => setPerformanceReportOptions({...performanceReportOptions, userSatisfaction: e.target.checked})}
                />
                <span>User Satisfaction</span>
              </label>
            </div>
            <div className="report-actions">
              <select 
                className="report-period"
                value={reportPeriods.performance}
                onChange={(e) => setReportPeriods({...reportPeriods, performance: e.target.value})}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Last Year">Last Year</option>
              </select>
              <button className="generate-btn performance" onClick={handleGeneratePerformanceReport}>
                <i className="fas fa-download"></i>
                Generate PDF
              </button>
            </div>
          </div>

          {/* Inventory Reports */}
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon inventory-report">
                <i className="fas fa-boxes"></i>
              </div>
              <h4 className="report-title">Inventory Reports</h4>
            </div>
            <p className="report-description">
              Product inventory tracking with stock levels, popular items, and seasonal trends analysis.
            </p>
            <div className="report-options">
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={inventoryReportOptions.stockLevels}
                  onChange={(e) => setInventoryReportOptions({...inventoryReportOptions, stockLevels: e.target.checked})}
                />
                <span>Stock Levels</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={inventoryReportOptions.popularProducts}
                  onChange={(e) => setInventoryReportOptions({...inventoryReportOptions, popularProducts: e.target.checked})}
                />
                <span>Popular Products</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={inventoryReportOptions.seasonalTrends}
                  onChange={(e) => setInventoryReportOptions({...inventoryReportOptions, seasonalTrends: e.target.checked})}
                />
                <span>Seasonal Trends</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={inventoryReportOptions.lowStockAlerts}
                  onChange={(e) => setInventoryReportOptions({...inventoryReportOptions, lowStockAlerts: e.target.checked})}
                />
                <span>Low Stock Alerts</span>
              </label>
            </div>
            <div className="report-actions">
              <select 
                className="report-period"
                value={reportPeriods.inventory}
                onChange={(e) => setReportPeriods({...reportPeriods, inventory: e.target.value})}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Last Year">Last Year</option>
              </select>
              <button className="generate-btn inventory" onClick={handleGenerateInventoryReport}>
                <i className="fas fa-download"></i>
                Generate PDF
              </button>
            </div>
          </div>

          {/* Custom Reports */}
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon custom-report">
                <i className="fas fa-sliders-h"></i>
              </div>
              <h4 className="report-title">Custom Reports</h4>
            </div>
            <p className="report-description">
              Create custom reports with specific parameters, date ranges, and data points tailored to your needs.
            </p>
            <div className="report-options">
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={customReportOptions.customFields}
                  onChange={(e) => setCustomReportOptions({...customReportOptions, customFields: e.target.checked})}
                />
                <span>Select Custom Fields</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={customReportOptions.advancedFilters}
                  onChange={(e) => setCustomReportOptions({...customReportOptions, advancedFilters: e.target.checked})}
                />
                <span>Advanced Filters</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={customReportOptions.comparativeAnalysis}
                  onChange={(e) => setCustomReportOptions({...customReportOptions, comparativeAnalysis: e.target.checked})}
                />
                <span>Comparative Analysis</span>
              </label>
              <label className="report-checkbox">
                <input 
                  type="checkbox" 
                  checked={customReportOptions.excelExport}
                  onChange={(e) => setCustomReportOptions({...customReportOptions, excelExport: e.target.checked})}
                />
                <span>Export to Excel</span>
              </label>
            </div>
            <div className="report-actions">
              <select 
                className="report-period"
                value={reportPeriods.custom}
                onChange={(e) => setReportPeriods({...reportPeriods, custom: e.target.value})}
              >
                <option value="Custom Range">Custom Range</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Year">Last Year</option>
              </select>
              <button className="generate-btn custom" onClick={handleGenerateCustomReport}>
                <i className="fas fa-cog"></i>
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Report Generation */}
        <div className="bulk-report-section">
          <h4 className="bulk-report-title">
            <i className="fas fa-layer-group"></i>
            Bulk Report Generation
          </h4>
          <p className="bulk-report-description">
            Generate multiple reports at once and receive them via email or download as a ZIP file.
          </p>
          <div className="bulk-report-controls">
            <button className="bulk-action-btn select-all">
              <i className="fas fa-check-double"></i>
              Select All Reports
            </button>
            <button className="bulk-action-btn email">
              <i className="fas fa-envelope"></i>
              Email Reports
            </button>
            <button className="bulk-action-btn download">
              <i className="fas fa-file-archive"></i>
              Download ZIP
            </button>
            <button className="bulk-action-btn schedule">
              <i className="fas fa-calendar-alt"></i>
              Schedule Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

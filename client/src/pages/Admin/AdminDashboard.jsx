import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);

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
      });
    }, 500);
  }, []);

  if (!stats) return <div className="dashboard-loading">Loading dashboard...</div>;

  const chartData = [
  { day: '1', revenue: 1000 },
  { day: '2', revenue: 1200 },
  { day: '3', revenue: 800 },
  { day: '4', revenue: 1500 },
  { day: '5', revenue: 1700 },
  { day: '6', revenue: 1600 },
  { day: '7', revenue: 1800 },
  { day: '8', revenue: 2000 },
  { day: '9', revenue: 2200 },
  { day: '10', revenue: 2100 },
];


  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">Total Farmers: {stats.farmersCount}</div>
        <div className="dashboard-card">Total Vendors: {stats.vendorsCount}</div>
        <div className="dashboard-card">Total Drivers: {stats.driversCount}</div>
        <div className="dashboard-card">Total QAs: {stats.qasCount}</div>
        <div className="dashboard-card">Total Orders from buyers: {stats.ordersCount}</div>
        <div className="dashboard-card">Total Orders from farmers: {stats.ordersCount}</div>
        <div className="dashboard-card">Pending QA Assignments: {stats.pendingQA}</div>
        <div className="dashboard-card">Pending Driver Requests: {stats.activeDrivers}</div>
      </div>

    <div className="dashboard-chart">
    <h3 className="chart-title">Daily Revenue - July</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottomRight', offset: -5 }} />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
</div>

</div>    
  );
}

export default AdminDashboard;

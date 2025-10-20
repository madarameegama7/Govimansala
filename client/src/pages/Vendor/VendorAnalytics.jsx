// src/pages/vendor/VendorAnalytics.jsx
import React, { useEffect, useMemo, useState } from 'react';
import './VendorAnalytics.css';

const API_BASE = import.meta.env.VITE_ORDER_API_BASE || 'http://localhost:8080';

const parseJwt = (t) => { try {
  const p = JSON.parse(atob(t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
  return p;
} catch { return null; } };

export default function VendorAnalytics() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [topSellers, setTopSellers] = useState([]);

  const vendorUserId = useMemo(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try { const u = JSON.parse(stored); if (u?.userId) return Number(u.userId); } catch {}
    }
    const token = localStorage.getItem('accessToken');
    const payload = token ? parseJwt(token) : null;
    return payload ? Number(payload.userId ?? payload.id ?? payload.sub ?? 0) : null;
  }, []);

  useEffect(() => {
    if (!vendorUserId) return;
    const controller = new AbortController();
    (async () => {
      setLoading(true); setErr(null);
      try {
        const token = localStorage.getItem('accessToken');
        const url = `${API_BASE}/api/vendors/${vendorUserId}/analytics`;
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSummary(data.summary ?? null);
        setMonthly(data.monthly ?? []);
        setTopSellers(data.topSellers ?? []);
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Failed');
      } finally { setLoading(false); }
    })();
    return () => controller.abort();
  }, [vendorUserId]);

  // …render your same UI, but use state instead of mock data…
  // Example for chart bars:
  // monthly.map(m => <div style={{height:`${Math.min(m.value/1000*100,100)}%`}} />)

  return (
    <div className="analytics-dashboard">
      <div className="analytics-hero">
        <div className="hero-content"><div className="breadcrumb">
          <span>Home</span><span className="separator">/</span><span>Analytics</span>
        </div></div>
      </div>

      <div className="dashboard-container">
        {loading && <div>Loading…</div>}
        {err && <div style={{color:'crimson'}}>Error: {err}</div>}

        {!loading && !err && summary && (
          <div className="stats-grid">
            {[{
              title: 'Total Purchases', value: String(summary.totalPurchases),
              description: 'Total items sold', trend: '', trendColor: '#10B981'
            },{
              title: 'Orders Placed', value: String(summary.ordersPlaced),
              description: 'Total orders', trend: '', trendColor: '#10B981'
            },{
              title: 'Out for Delivery', value: String(summary.outForDelivery),
              description: 'In transit', trend: '', trendColor: '#EF4444'
            },{
              title: 'Total Revenue',
              value: `${summary.currency} ${Number(summary.totalRevenue||0).toLocaleString(undefined,{minimumFractionDigits:2})}`,
              description: 'Revenue this period', trend: '', trendColor: '#10B981'
            }].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-content">
                  <h3>{s.title}</h3>
                  <div className="stat-value-container">
                    <div className="stat-number">{s.value}</div>
                    {s.trend && <span className="stat-trend" style={{color:s.trendColor}}>{s.trend}</span>}
                  </div>
                  <div className="stat-description">{s.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !err && (
          <div className="dashboard-content">
            <div className="chart-card">
              <div className="card-header"><h2>Purchase Trend</h2></div>
              <div className="chart-container">
                <div className="y-axis">{[100,80,60,40,20,0].map((v,i)=><div key={i} className="y-label">{v}</div>)}</div>
                <div className="chart-area">
                  <div className="chart-bars">
                    {monthly.map((p, idx) => (
                      <div key={idx} className="bar-container">
                        <div className="chart-bar"
                          style={{height: `${Math.min(p.value/Math.max(...monthly.map(m=>m.value||1),1)*100,100)}%`}}
                          data-month={p.month} data-value={p.value}/>
                        <div className="x-label">{p.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="seller-card">
              <div className="card-header"><h2>Top Buyers</h2></div>
              <div className="seller-list">
                {topSellers.map((t, i) => (
                  <div key={i} className="seller-item">
                    <div className="seller-info-container">
                      <div className="seller-avatar" style={{backgroundColor:'#4F46E5'}}>{t.avatar || 'CU'}</div>
                      <div className="seller-info">
                        <div className="seller-name">{t.name}</div>
                        <div className="seller-stats">
                          <span className="orders">{t.orders} orders</span>
                          <span className="revenue">{summary?.currency} {Number(t.revenue||0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`trend-indicator ${t.trend || 'up'}`}>{(t.trend||'up')==='up'?'↑':'↓'}</div>
                  </div>
                ))}
                {topSellers.length===0 && <div style={{padding:'12px'}}>No buyers yet.</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

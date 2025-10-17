import React, { useEffect, useMemo, useState } from 'react';
import './VendorOrder.css';

const ORDER_API_BASE =
  import.meta.env.VITE_ORDER_API_BASE || 'http://localhost:8080';

const TABS = ['All', 'Placed', 'Out for Delivery', 'Delivered', 'Returned'];

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

function statusToQuery(tab) {
  if (!tab || tab === 'All') return undefined;
  return tab;
}
function getStatusColor(status) {
  const map = {
    'Placed': '#4a90e2',
    'Out for Delivery': '#f5a623',
    'Delivered': '#7ed321',
    'Returned': '#d0021b',
  };
  return map[status] || '#9b9b9b';
}
const padOrderNumber = (id) => `Order #${String(id).padStart(5, '0')}`;
const formatMoneyLKR = (n) => `LKR ${Number(n ?? 0).toFixed(2)}`;

export default function VendorOrder() {
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // 👇 Derive vendorUserId from localStorage token or currentUser
  const vendorUserId = useMemo(() => {
    // Prefer currentUser if you stored it at login time (step A)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.userId) return Number(user.userId);
      } catch {}
    }
    // Fallback: decode the accessToken directly
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    const payload = parseJwt(token);
    return payload ? Number(payload.userId ?? payload.id ?? payload.sub ?? 0) : null;
  }, []);

  useEffect(() => {
    if (!vendorUserId) return;
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const params = new URLSearchParams();
        const status = statusToQuery(activeTab);
        if (status) params.set('status', status);
        params.set('page', String(page));
        params.set('pageSize', String(pageSize));

        const url = `${ORDER_API_BASE}/api/vendors/${vendorUserId}/orders?${params.toString()}`;

        // If your order-service GET is protected, include the token:
        const token = localStorage.getItem('accessToken');
        const res = await fetch(url, {
          method: 'GET',
          
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const list = (json?.data ?? []).map(o => ({
          id: o.orderId,
          orderNumber: padOrderNumber(o.orderId),
          placedDate: new Date(o.createdAt).toISOString().slice(0, 10),
          total: formatMoneyLKR(o.totalAmount),
          status: o.uiStatus ?? 'Placed',
        }));

        setOrders(list);
        setTotal(Number(json?.total ?? list.length));
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErr(e.message || 'Failed to load orders');
          setOrders([]);
          setTotal(0);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [vendorUserId, activeTab, page, pageSize]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="vendor-orders-container">
      <h2 className="orders-title">Your Orders</h2>

      <div className="orders-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`orders-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setPage(1); setActiveTab(tab); }}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <div className="orders-loading">Loading…</div>}
      {err && !loading && <div className="orders-error">Error: {err}</div>}
      {!loading && !err && orders.length === 0 && (
        <div className="orders-empty">No orders to display.</div>
      )}

      {!loading && !err && orders.length > 0 && (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <span className="order-number">{order.orderNumber}</span>
                <span className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </span>
              </div>

              <div className="order-card-body">
                <div className="order-detail">
                  <span className="detail-label">Placed:</span>
                  <span className="detail-value">{order.placedDate}</span>
                </div>
                <div className="order-detail">
                  <span className="detail-label">Total:</span>
                  <span className="detail-value total-amount">{order.total}</span>
                </div>
              </div>

              <div className="order-card-footer">
                <button
                  className="view-order-btn"
                  onClick={() => console.log('View Order', order.id)}
                >
                  View Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !err && pageCount > 1 && (
        <div className="orders-pagination">
          <button
            className="orders-page-btn"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            ‹ Prev
          </button>
          <span className="orders-page-indicator">
            Page {page} of {pageCount}
          </span>
          <button
            className="orders-page-btn"
            disabled={page === pageCount}
            onClick={() => setPage(p => Math.min(pageCount, p + 1))}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}

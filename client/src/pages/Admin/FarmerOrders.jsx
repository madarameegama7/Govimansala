import React, { useEffect, useState } from 'react';
import './FarmerOrders.css'; 

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sampleData = [
      {
        orderId: 'F123',
        farmerName: 'Kamal Perera',
        productCategory: 'seeds',
        productName: 'Carrots',
        quantity: 50,
        status: 'pending',
        VendorName: 'Green Fields',
      },
      {
        orderId: 'F124',
        farmerName: 'Sunil Fernando',
        productCategory: 'fertilizers',
        productName: 'Dr.home organic fertilizer',
        quantity: 120,
        status: 'delivered',
        VendorName: 'Organic Farms',
      },
      {
        orderId: 'F125',
        farmerName: 'Anoma Silva',
        productCategory: 'pesticides',
        productName: 'pesti-ci 342',
        quantity: 200,
        status: 'Declined',
        VendorName: 'AgroTech',
      },
    ];

    setOrders(sampleData);
  }, []);

  return (
    <div className="farmer-orders-container">
      <h2>Farmer Orders</h2>
      <table className="farmer-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Farmer Name</th>
            <th>Vendor Name</th>
            <th>Product Category</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="6">No orders found.</td></tr>
          ) : (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.farmerName}</td>
                <td>{order.VendorName}</td>
                <td>{order.productCategory}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerOrders;

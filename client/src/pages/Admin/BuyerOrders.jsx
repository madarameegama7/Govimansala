import { useEffect, useState } from 'react';
import './BuyerOrders.css';

function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const qaOptions = ['QA Inspector Kumara', 'QA Inspector Silva', 'QA Inspector Perera'];

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          orderId: 'ORD123',
          buyerName: 'Sasha Bandara',
          itemCount: '12',
          quantity: 50,
          status: 'Delivered',
          assignedQA: 'QA Inspector Kumara',
          driverRequests: ['Driver Sanjeewa', 'Driver Nuwan'],
          approvedDriver: 'Driver Sanjeewa' 
        },
        {
          orderId: 'ORD124',
          buyerName: 'Nimal Perera',
          itemCount: '15',
          quantity: 30,
          status: 'Pending',
          assignedQA: 'QA Inspector Silva',
          driverRequests: ['Driver Mahesh'],
          approvedDriver: null 
        }
      ]);
    }, 500);
  }, []);

  const handleQAChange = (orderId, newQA) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { ...order, assignedQA: newQA } : order
      )
    );
  };

  const handleDriverApproval = (orderId, driverName) => {
    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId ? { ...order, approvedDriver: driverName } : order
      )
    );
  };

  const handleDriverDecline = (orderId, declinedDriver) => {
  setOrders(prev =>
    prev.map(order => {
      if (order.orderId === orderId) {
        const newRequests = order.driverRequests.filter(d => d !== declinedDriver);
        return {
          ...order,
          driverRequests: newRequests,
          approvedDriver: null
        };
      }
      return order;
    })
  );
};


  return (
    <div className="buyer-orders-container">
      <h2>Orders from Buyers</h2>
      <table className="buyer-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer Name</th>
            <th>No of Items</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Assigned QA</th>
            <th>Assigned Driver</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.buyerName}</td>
              <td>{order.itemCount}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.assignedQA}
                  onChange={(e) => handleQAChange(order.orderId, e.target.value)}
                >
                  {qaOptions.map(qa => (
                    <option key={qa} value={qa}>{qa}</option>
                  ))}
                </select>
              </td>
              <td>
                {order.approvedDriver ? (
                    order.approvedDriver
                ) : order.driverRequests?.length > 0 ? (
                    <div>
                    {order.driverRequests.map(driver => (
                        <div key={driver} style={{ marginBottom: '4px' }}>
                        <span>{driver}</span>
                        <button className = 'approve-btn' onClick={() => handleDriverApproval(order.orderId, driver)}>Approve</button>
                        <button className='decline-btn' onClick={() => handleDriverDecline(order.orderId, driver)}>Decline</button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <span>No driver assigned yet</span>
                )}
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuyerOrders;

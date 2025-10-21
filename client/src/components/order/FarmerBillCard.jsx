import { formatCurrency } from '../../utils/RevenueCalculator';
import PropTypes from 'prop-types';
import './FarmerBillCard.css';

/**
 * FarmerBillCard Component
 * Displays individual farmer's bill with items, crate charges, and final earnings
 */
const FarmerBillCard = ({ farmerBill }) => {
  const {
    farmerName,
    farmerId,
    items,
    itemsSubtotal,
    totalWeight,
    cratesNeeded,
    crateCharges,
    farmerEarnings
  } = farmerBill;

  return (
    <div className="farmer-bill-card">
      {/* Farmer Header */}
      <div className="farmer-bill-header">
        <div className="farmer-info">
          <i className="fas fa-user-tie farmer-bill-icon"></i>
          <div>
            <h4 className="farmer-name">{farmerName}</h4>
            <p className="farmer-id">ID: {farmerId}</p>
          </div>
        </div>
        <div className="farmer-earnings-badge">
          {formatCurrency(farmerEarnings)}
        </div>
      </div>

      {/* Farmer Items Table */}
      <div className="farmer-items-section">
        <h5 className="section-title">Items</h5>
        <table className="farmer-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="item-name">{item.productName}</td>
                <td>{item.quantity} kg</td>
                <td>{formatCurrency(item.pricePerUnit)}</td>
                <td className="item-amount">
                  {formatCurrency(item.pricePerUnit * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="subtotal-row">
              <td colSpan="3"><strong>Items Subtotal</strong></td>
              <td className="subtotal-amount"><strong>{formatCurrency(itemsSubtotal)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Crate Charges Section */}
      <div className="farmer-charges-section">
        <h5 className="section-title">Crate Charges</h5>
        <div className="charges-grid">
          <div className="charge-item">
            <i className="fas fa-box charge-icon"></i>
            <div className="charge-details">
              <span className="charge-label">Total Weight</span>
              <span className="charge-value">{totalWeight} kg</span>
            </div>
          </div>
          <div className="charge-item">
            <i className="fas fa-boxes-stacked charge-icon"></i>
            <div className="charge-details">
              <span className="charge-label">Crates Used</span>
              <span className="charge-value">{cratesNeeded} crates (25kg each)</span>
            </div>
          </div>
          <div className="charge-item">
            <i className="fas fa-rupee-sign charge-icon"></i>
            <div className="charge-details">
              <span className="charge-label">Crate Charges</span>
              <span className="charge-value negative">{formatCurrency(crateCharges)} (Rs. 20/crate)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Earnings */}
      <div className="farmer-final-earnings">
        <div className="earnings-row">
          <span className="earnings-label">Items Subtotal:</span>
          <span className="earnings-amount">{formatCurrency(itemsSubtotal)}</span>
        </div>
        <div className="earnings-row deduction">
          <span className="earnings-label">Less: Crate Charges</span>
          <span className="earnings-amount">- {formatCurrency(crateCharges)}</span>
        </div>
        <div className="earnings-row total">
          <span className="earnings-label">Farmer's Net Earnings:</span>
          <span className="earnings-amount">{formatCurrency(farmerEarnings)}</span>
        </div>
      </div>
    </div>
  );
};

FarmerBillCard.propTypes = {
  farmerBill: PropTypes.shape({
    farmerId: PropTypes.string.isRequired,
    farmerName: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        pricePerUnit: PropTypes.number.isRequired,
        farmerId: PropTypes.string,
        farmerName: PropTypes.string
      })
    ).isRequired,
    itemsSubtotal: PropTypes.number.isRequired,
    totalWeight: PropTypes.number.isRequired,
    cratesNeeded: PropTypes.number.isRequired,
    crateCharges: PropTypes.number.isRequired,
    farmerEarnings: PropTypes.number.isRequired
  }).isRequired
};

export default FarmerBillCard;

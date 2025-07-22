import { Link } from 'react-router-dom';
import './AdminHeroContent.css';
import logo from '../logo.png'; 

function AdminHeroContent() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} className="hero-logo" alt="Logo" />
      </div>
      <ul className="nav-list">
        <li><Link to="/admin/AdminDashboard">Dashboard</Link></li>
        <li><Link to="/admin/FarmerDetails">Farmers</Link></li>
        <li><Link to="/admin/BuyerDetails">Buyers</Link></li>
        <li><Link to="/admin/VendorDetails">Vendors</Link></li>
        <li><Link to="/admin/DriverDetails">Drivers</Link></li>
        <li><Link to="/admin/QADetails">QA Inspectors</Link></li>
        <li><Link to="/admin/BuyerOrders">Orders from Buyers</Link></li>
        <li><Link to="/admin/FarmerOrders">Orders from Farmers</Link></li>
      </ul>
    </nav>
  );
}

export default AdminHeroContent;

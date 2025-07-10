import React from 'react'
import '../pages/styles/Farms.css';
import { NavLink } from 'react-router-dom';

function Farms() {
  return (
   <div className="farms-page">

      {/* Header Section */}
      <div className="farms-hero">
        <h1>Farms</h1>
        <p>Home &gt; Farms</p>
    </div>

        <div className="search-bar-wrapper">
            <div className="search-bar-container">
                <input type="text" placeholder="Search for farms..." className="search-input" />
                <button className="search-button">Search</button>
            </div>
        </div>
        
        <div className="farm-card">
            <NavLink to="/FarmPage" className="card-content">
            <div className="left-section">
                <img src="/profile-icon.png" alt="Farm" className="farm-image" />
                <h3 className="farm-name">Green Valley Farms</h3>
            </div>
            <div className="right-section">
                <img src="/location-icon.png" alt="Location" className="location-icon" />
                <p className="location">Nuwara Eliya</p>
            </div>
            </NavLink>
        </div>

        <div className="farm-card">
            <a href="/farm/green-valley" className="card-content">
            <div className="left-section">
                <img src="/profile-icon.png" alt="Farm" className="farm-image" />
                <h3 className="farm-name">Fresh & Co </h3>
            </div>
            <div className="right-section">
                <img src="/location-icon.png" alt="Location" className="location-icon" />
                <p className="location">Elpitiya</p>
            </div>
            </a>
        </div>

        <div className="farm-card">
            <a href="/farm/green-valley" className="card-content">
            <div className="left-section">
                <img src="/profile-icon.png" alt="Farm" className="farm-image" />
                <h3 className="farm-name">Saman Bandara's Farm</h3>
            </div>
            <div className="right-section">
                <img src="/location-icon.png" alt="Location" className="location-icon" />
                <p className="location">Bandarawela</p>
            </div>
            </a>
        </div>

        <div className="farm-card">
            <a href="/farm/green-valley" className="card-content">
            <div className="left-section">
                <img src="/profile-icon.png" alt="Farm" className="farm-image" />
                <h3 className="farm-name">Chethi Vegies</h3>
            </div>
            <div className="right-section">
                <img src="/location-icon.png" alt="Location" className="location-icon" />
                <p className="location">Hatton</p>
            </div>
            </a>
        </div>

        <div className="farm-card">
            <a href="/farm/green-valley" className="card-content">
            <div className="left-section">
                <img src="/profile-icon.png" alt="Farm" className="farm-image" />
                <h3 className="farm-name">FruityCo</h3>
            </div>
            <div className="right-section">
                <img src="/location-icon.png" alt="Location" className="location-icon" />
                <p className="location">Meegoda</p>
            </div>
            </a>
        </div>

    </div>
  );
}

export default Farms

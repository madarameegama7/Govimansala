import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavigationPage.css';

const NavigationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, route, orderDetails } = location.state || {};
  
  // Support both data formats - use orderData as primary, orderDetails as fallback
  const currentOrderData = orderData || orderDetails;

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [showRouteOverview, setShowRouteOverview] = useState(true);
  const [driverLocation, setDriverLocation] = useState({ lat: 6.9271, lng: 79.8612 }); // Default Colombo location
  const mapRef = useRef(null);

  useEffect(() => {
    const drawRoute = async (mapInstance, locations) => {
      try {
        // Using OSRM for routing (free alternative to OpenRouteService)
        const coordinates = locations.map(loc => `${loc.coordinates.lng},${loc.coordinates.lat}`).join(';');
        
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`);

        if (response.ok) {
          const data = await response.json();
          const routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          
          // Draw route on map
          const L = await import('leaflet');
          L.polyline(routeCoords, {
            color: '#ff6b35',
            weight: 5,
            opacity: 0.8
          }).addTo(mapInstance);
          
          // Update distance and time from API response
          const apiDistance = (data.routes[0].distance / 1000).toFixed(1);
          const apiDuration = Math.ceil(data.routes[0].duration / 60);
          
          console.log(`Route: ${apiDistance} km, ${apiDuration} minutes`);
        } else {
          // Fallback: draw straight lines between points
          drawFallbackRoute(mapInstance, locations);
        }
      } catch (error) {
        console.error('Route API error:', error);
        drawFallbackRoute(mapInstance, locations);
      }
    };

    const drawFallbackRoute = async (mapInstance, locations) => {
      const L = await import('leaflet');
      const routeCoords = locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng]);
      
      L.polyline(routeCoords, {
        color: '#ff6b35',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10'
      }).addTo(mapInstance);
    };

    const initializeMap = async () => {
      if (!mapRef.current || !currentOrderData) return;

      // Create Leaflet map
      const L = await import('leaflet');
      
      // Fix for default markers
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      const optimizedRoute = route || optimizeRoute(currentOrderData.locations);
      
      // Calculate center point
      const lats = optimizedRoute.map(loc => loc.coordinates.lat);
      const lngs = optimizedRoute.map(loc => loc.coordinates.lng);
      const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
      const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;

      const mapInstance = L.map(mapRef.current).setView([centerLat, centerLng], 10);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      // Add markers for each location
      optimizedRoute.forEach((location) => {
        const icon = location.type === 'pickup' 
          ? L.divIcon({
              html: `<div class="custom-marker pickup-marker"><i class="fas fa-store"></i></div>`,
              className: 'custom-div-icon',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })
          : L.divIcon({
              html: `<div class="custom-marker delivery-marker"><i class="fas fa-home"></i></div>`,
              className: 'custom-div-icon',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

        L.marker([location.coordinates.lat, location.coordinates.lng], { icon })
          .addTo(mapInstance)
          .bindPopup(`
            <div class="map-popup">
              <h4>${location.name}</h4>
              <p>${location.address}</p>
              <span class="location-type">${location.type === 'pickup' ? 'Pickup' : 'Delivery'}</span>
            </div>
          `);
      });

      // Get route from OpenRouteService or similar
      await drawRoute(mapInstance, optimizedRoute);

      // Fit map to show all markers
      const markers = [];
      mapInstance.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          markers.push(layer);
        }
      });
      
      if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        mapInstance.fitBounds(group.getBounds().pad(0.1));
      }
    };

    const setupMap = async () => {
      if (!currentOrderData) {
        navigate('/order-dashboard');
        return;
      }
      
      // Calculate estimated time based on distance
      const totalDistance = currentOrderData.totalDistance;
      const estimatedHours = Math.floor(totalDistance / 40); // Assuming 40 km/h average speed
      const estimatedMinutes = Math.ceil((totalDistance % 40) / 40 * 60);
      setEstimatedTime(`${estimatedHours}h ${estimatedMinutes}min`);
      
      // Initialize map
      await initializeMap();
    };
    
    setupMap();
  }, [currentOrderData, route, navigate]);

  if (!currentOrderData) {
    return <div>Loading...</div>;
  }

  const optimizeRoute = (locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    // Sort pickups by distance (nearest first)
    const sortedPickups = pickups.sort((a, b) => a.distance - b.distance);
    
    // Return optimized route: pickups first, then deliveries
    return [...sortedPickups, ...deliveries];
  };

  const optimizedRoute = route || optimizeRoute(currentOrderData.locations);
  const currentLocation = optimizedRoute[currentLocationIndex];

  // Calculate distance from driver location to each place
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Get all locations with distances from driver location
  const locationsWithDistance = optimizedRoute.map(location => ({
    ...location,
    distanceFromDriver: calculateDistance(
      driverLocation.lat, driverLocation.lng,
      location.coordinates.lat, location.coordinates.lng
    )
  }));

  const handleStartNavigation = () => {
    setNavigationStarted(true);
    setShowRouteOverview(false);
    // Start navigation to the first location
    startNavigationToLocation(currentLocation);
  };

  const startNavigationToLocation = (location) => {
    const destination = encodeURIComponent(location.address);
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open navigation in a new tab (in a real app, this would open the navigation app)
    window.open(navigationUrl, '_blank');
  };

  const handleArriveAtLocation = () => {
    if (currentLocation.type === 'pickup') {
      alert(`Arrived at pickup location: ${currentLocation.name}\nPlease collect the items and proceed to next location.`);
    } else {
      alert(`Arrived at delivery location: ${currentLocation.name}\nPlease deliver the items to the customer.`);
    }
    
    // Check if this is the last location
    if (currentLocationIndex === optimizedRoute.length - 1) {
      // All locations completed
      alert('Order completed successfully!');
      navigate('/order-dashboard');
    } else {
      // Move to next location
      setCurrentLocationIndex(currentLocationIndex + 1);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/order-dashboard');
  };

  return (
    <div className="navigation-page">
      {/* Header */}
      <div className="nav-header">
        <div className="nav-header-left">
          <button className="back-btn" onClick={handleBackToDashboard}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="nav-title">
            <h1>{showRouteOverview ? 'Route Overview' : 'Navigation'}</h1>
            <span className="order-number">{currentOrderData.orderNumber}</span>
          </div>
        </div>
        
        <div className="nav-header-right">
          <button 
            className="route-details-btn"
            onClick={() => setShowRouteDetails(!showRouteDetails)}
          >
            <i className="fas fa-list"></i>
            Route Details
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="navigation-progress">
        <div className="progress-info">
          <span>Location {currentLocationIndex + 1} of {optimizedRoute.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentLocationIndex + 1) / optimizedRoute.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="nav-content">
        {/* Map and Places Layout */}
        <div className="map-places-container">
          {/* Map Section */}
          <div className="map-section">
            <div id="map" ref={mapRef}></div>
          </div>
          
          {/* Places List Section */}
          <div className="places-section">
            <div className="places-header">
              <h3>Delivery Locations</h3>
              <div className="order-info">
                <span className="order-number">{currentOrderData.orderNumber}</span>
                <span className="customer-name">{currentOrderData.customerName}</span>
              </div>
            </div>
            
            <div className="places-list">
              {locationsWithDistance.map((location, index) => (
                <div key={index} className={`place-item ${location.type}`}>
                  <div className="place-number">{index + 1}</div>
                  <div className="place-icon">
                    <i className={location.type === 'pickup' ? 'fas fa-store' : 'fas fa-home'}></i>
                  </div>
                  <div className="place-details">
                    <h4>{location.name}</h4>
                    <p className="place-address">{location.address}</p>
                    <div className="place-meta">
                      <span className={`type-badge ${location.type}`}>
                        {location.type === 'pickup' ? 'Pickup' : 'Delivery'}
                      </span>
                      <span className="distance-badge">
                        {location.distanceFromDriver.toFixed(1)} km away
                      </span>
                    </div>
                    {location.contactPhone && (
                      <div className="contact-info">
                        <i className="fas fa-phone"></i>
                        <span>{location.contactPhone}</span>
                      </div>
                    )}
                    {location.deliveryInstructions && (
                      <div className="instructions">
                        <i className="fas fa-info-circle"></i>
                        <span>{location.deliveryInstructions}</span>
                      </div>
                    )}
                  </div>
                  <div className="place-actions">
                    <button 
                      className="call-btn"
                      onClick={() => window.open(`tel:${location.contactPhone || currentOrderData.customerPhone}`)}
                    >
                      <i className="fas fa-phone"></i>
                    </button>
                    <button 
                      className="navigate-btn"
                      onClick={() => startNavigationToLocation(location)}
                    >
                      <i className="fas fa-directions"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="route-summary-footer">
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-label">Total Distance</span>
                  <span className="stat-value">{currentOrderData.totalDistance} km</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Est. Time</span>
                  <span className="stat-value">{currentOrderData.estimatedTime}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Weight</span>
                  <span className="stat-value">{currentOrderData.totalWeight}</span>
                </div>
              </div>
              
              <button 
                className="start-delivery-btn"
                onClick={() => startNavigationToLocation(locationsWithDistance[0])}
              >
                <i className="fas fa-route"></i>
                Start Delivery Route
              </button>
            </div>
          </div>
        </div>
      </div>
              
              <div className="destination-actions">
                <button 
                  className="nav-action-btn primary"
                  onClick={handleStartNavigation}
                >
                  <i className="fas fa-navigation"></i>
                  {navigationStarted ? 'Open Maps' : 'Start Navigation'}
                </button>
                <button 
                  className="nav-action-btn secondary"
                  onClick={handleArriveAtLocation}
                >
                  <i className="fas fa-check-circle"></i>
                  I've Arrived
                </button>
              </div>
            </div>
          </>
        )}

        {/* Map Container (shown in both modes) */}
        <div className="map-container">
          <div 
            ref={mapRef} 
            className="leaflet-map"
            style={{ height: '100%', width: '100%', minHeight: '400px' }}
          ></div>
          
          {/* Map overlay with stats */}
          <div className="map-overlay">
            <div className="map-stats">
              <div className="stat">
                <i className="fas fa-route"></i>
                <span>{currentOrderData.totalDistance} km</span>
              </div>
              <div className="stat">
                <i className="fas fa-clock"></i>
                <span>{estimatedTime}</span>
              </div>
              <div className="stat">
                <i className="fas fa-map-marker-alt"></i>
                <span>{optimizedRoute.length} stops</span>
              </div>
            </div>
            
            <button 
              className="open-maps-btn"
              onClick={() => startNavigationToLocation(currentLocation)}
            >
              <i className="fas fa-external-link-alt"></i>
              Open in Maps
            </button>
          </div>
        </div>

        {/* Route Details Sidebar */}
        {showRouteDetails && (
          <div className="route-details-panel">
            <div className="route-details-header">
              <h4>Route Overview</h4>
              <button 
                className="close-details-btn"
                onClick={() => setShowRouteDetails(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="route-steps">
              {optimizedRoute.map((location, index) => (
                <div 
                  key={index}
                  className={`route-step ${index === currentLocationIndex ? 'active' : ''} ${index < currentLocationIndex ? 'completed' : ''}`}
                >
                  <div className="step-icon">
                    <i className={location.type === 'pickup' ? 'fas fa-store' : 'fas fa-home'}></i>
                  </div>
                  <div className="step-content">
                    <div className="step-title">{location.name}</div>
                    <div className="step-address">{location.address}</div>
                    <div className="step-type">
                      {location.type === 'pickup' ? 'Pickup' : 'Delivery'}
                    </div>
                    {location.distance > 0 && (
                      <div className="step-distance">{location.distance} km from previous</div>
                    )}
                  </div>
                  <div className="step-status">
                    {index < currentLocationIndex && <i className="fas fa-check-circle"></i>}
                    {index === currentLocationIndex && <i className="fas fa-navigation"></i>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="route-summary">
              <h5>Order Summary</h5>
              <div className="summary-items">
                {currentOrderData.products.map((product, index) => (
                  <div key={index} className="summary-item">
                    <span className="item-name">{product.name}</span>
                    <span className="item-quantity">{product.quantity}</span>
                    <span className="item-location">From: {product.location}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <strong>Total: Rs. {currentOrderData.totalWithDelivery.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-stats">
          <div className="nav-stat">
            <i className="fas fa-route"></i>
            <span>Distance: {currentOrderData.totalDistance} km</span>
          </div>
          <div className="nav-stat">
            <i className="fas fa-clock"></i>
            <span>ETA: {estimatedTime}</span>
          </div>
          <div className="nav-stat">
            <i className="fas fa-user"></i>
            <span>{currentOrderData.customerName}</span>
          </div>
        </div>
        
        <div className="emergency-actions">
          <button className="emergency-btn">
            <i className="fas fa-phone"></i>
            Call Customer
          </button>
          <button className="emergency-btn">
            <i className="fas fa-exclamation-triangle"></i>
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;

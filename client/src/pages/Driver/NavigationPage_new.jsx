import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavigationPage.css';

const NavigationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, route, orderDetails } = location.state || {};
  
  // Support both data formats - use orderData as primary, orderDetails as fallback
  const currentOrderData = orderData || orderDetails;

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

    const drawFallbackRoute = (mapInstance, locations) => {
      // Import Leaflet dynamically
      import('leaflet').then(L => {
        const routeCoords = locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng]);
        
        L.polyline(routeCoords, {
          color: '#ff6b35',
          weight: 4,
          opacity: 0.6,
          dashArray: '5, 10'
        }).addTo(mapInstance);
      });
    };

    const initializeMap = async () => {
      if (!currentOrderData || !currentOrderData.locations) {
        console.error('No order data available');
        return;
      }

      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');
        
        // Import CSS
        await import('leaflet/dist/leaflet.css');
        
        // Fix marker icons issue with Webpack
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (mapRef.current) {
          // Clear any existing map
          mapRef.current.innerHTML = '';
          
          // Calculate center point from all locations
          const allLocations = currentOrderData.locations;
          const centerLat = allLocations.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / allLocations.length;
          const centerLng = allLocations.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / allLocations.length;

          // Initialize map
          const map = L.map(mapRef.current).setView([centerLat, centerLng], 12);

          // Add OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Add markers for all locations
          allLocations.forEach((location, index) => {
            const icon = L.divIcon({
              html: `<div style="background-color: ${location.type === 'pickup' ? '#0A5446' : '#ff6b35'}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${index + 1}</div>`,
              className: 'custom-div-icon',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

            const marker = L.marker([location.coordinates.lat, location.coordinates.lng], { icon })
              .addTo(map)
              .bindPopup(`
                <div style="min-width: 200px;">
                  <h4 style="margin: 0 0 8px 0; color: #333;">${location.name}</h4>
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${location.address}</p>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="background-color: ${location.type === 'pickup' ? '#0A5446' : '#ff6b35'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; text-transform: uppercase;">
                      ${location.type}
                    </span>
                  </div>
                  ${location.contactPhone ? `<p style="margin: 4px 0; color: #666; font-size: 13px;"><i class="fas fa-phone" style="margin-right: 5px;"></i>${location.contactPhone}</p>` : ''}
                  ${location.deliveryInstructions ? `<p style="margin: 4px 0; color: #666; font-size: 13px;"><i class="fas fa-info-circle" style="margin-right: 5px;"></i>${location.deliveryInstructions}</p>` : ''}
                </div>
              `);
          });

          // Draw route between locations
          await drawRoute(map, allLocations);

          // Fit map to show all markers
          const group = new L.featureGroup(allLocations.map(location => 
            L.marker([location.coordinates.lat, location.coordinates.lng])
          ));
          map.fitBounds(group.getBounds().pad(0.1));
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, [currentOrderData]);

  if (!currentOrderData) {
    return (
      <div className="navigation-page">
        <div className="error-message">
          <h2>No Order Data</h2>
          <p>Unable to load navigation data. Please go back and try again.</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Optimize route function
  const optimizeRoute = (locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    // Function to calculate distance between two coordinates
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

    // Starting point (driver's current location)
    const startPoint = driverLocation;
    
    // Calculate distances from driver location to each pickup location
    const pickupsWithCalculatedDistance = pickups.map(pickup => ({
      ...pickup,
      calculatedDistance: calculateDistance(
        startPoint.lat, startPoint.lng,
        pickup.coordinates.lat, pickup.coordinates.lng
      )
    }));

    // Sort pickups by calculated distance (nearest first for efficiency)
    const sortedPickups = pickupsWithCalculatedDistance.sort((a, b) => 
      a.calculatedDistance - b.calculatedDistance
    );
    
    // Return optimized route: pickups first, then deliveries
    return [...sortedPickups, ...deliveries];
  };

  const optimizedRoute = route || optimizeRoute(currentOrderData.locations);

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

  const startNavigationToLocation = (location) => {
    const destination = encodeURIComponent(location.address);
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open navigation in a new tab (in a real app, this would open the navigation app)
    window.open(navigationUrl, '_blank');
  };

  return (
    <div className="navigation-page">
      {/* Header */}
      <div className="nav-header">
        <div className="nav-header-left">
          <button 
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="nav-title">
            <h2>Delivery Navigation</h2>
            <span className="order-info">{currentOrderData.orderNumber} • {currentOrderData.customerName}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Map and Places */}
      <div className="nav-content">
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
    </div>
  );
};

export default NavigationPage;

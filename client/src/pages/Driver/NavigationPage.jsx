import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDriverLocation } from '../../contexts/DriverLocationContext';
import './NavigationPage.css';

const NavigationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, route, orderDetails } = location.state || {};
  
  // Support both data formats - use orderData as primary, orderDetails as fallback
  const currentOrderData = orderData || orderDetails;

  // Use driver location context
  const { driverLocation, locationLoading, locationError, refreshLocation } = useDriverLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    // Optimize route function inside useEffect to avoid dependency issues
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

    const drawRoute = async (mapInstance, locations) => {
      try {
        // Using OpenRouteService API for better routing
        const coordinates = locations.map(loc => [loc.coordinates.lng, loc.coordinates.lat]);
        
        const requestBody = {
          coordinates: coordinates,
          format: 'geojson',
          instructions: true,
          geometry: true
        };
        
        const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '5b3ce3597851110001cf6248a1f4b2b0e32c4f0dbd574bfaa2c79b16' // Free API key
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          const routeCoords = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          
          // Draw route on map with better styling
          const L = await import('leaflet');
          const routeLine = L.polyline(routeCoords, {
            color: '#ff6b35',
            weight: 6,
            opacity: 0.8,
            lineJoin: 'round',
            lineCap: 'round'
          }).addTo(mapInstance);
          
          // Add route animation effect
          let animationOffset = 0;
          const animateRoute = () => {
            animationOffset += 2;
            routeLine.setStyle({
              dashArray: `10, 10`,
              dashOffset: animationOffset
            });
            if (animationOffset < 1000) {
              requestAnimationFrame(animateRoute);
            }
          };
          setTimeout(() => animateRoute(), 1000);
          
          // Get distance and time from API response
          const routeInfo = data.features[0].properties;
          const apiDistance = (routeInfo.segments[0].distance / 1000).toFixed(1);
          const apiDuration = Math.ceil(routeInfo.segments[0].duration / 60);
          
          console.log(`OpenRouteService Route: ${apiDistance} km, ${apiDuration} minutes`);
        } else {
          // Fallback: draw straight lines between points
          console.warn('OpenRouteService API failed, using fallback routing');
          drawFallbackRoute(mapInstance, locations);
        }
      } catch (error) {
        console.error('OpenRouteService API error:', error);
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
          
          // Calculate center point from driver location and all destinations
          const allLocations = currentOrderData.locations;
          const allCoordinates = [driverLocation, ...allLocations.map(loc => loc.coordinates)];
          const centerLat = allCoordinates.reduce((sum, coord) => sum + coord.lat, 0) / allCoordinates.length;
          const centerLng = allCoordinates.reduce((sum, coord) => sum + coord.lng, 0) / allCoordinates.length;

          // Initialize map with better zoom level
          const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: true
          }).setView([centerLat, centerLng], 11);

          // Add high-quality map tiles with multiple options
          const tileOptions = {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            tileSize: 256,
            zoomOffset: 0
          };

          // Use CartoDB tiles for better visibility
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            ...tileOptions,
            attribution: '© OpenStreetMap contributors © CARTO'
          }).addTo(map);

          // Add driver's current location marker with enhanced styling
          const driverIcon = L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); 
                color: white; 
                border-radius: 50%; 
                width: 40px; 
                height: 40px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-weight: bold; 
                border: 3px solid white; 
                box-shadow: 0 4px 12px rgba(0,123,255,0.4);
                animation: pulse 2s infinite;
              ">
                <i class="fas fa-car" style="font-size: 14px;"></i>
              </div>
              <style>
                @keyframes pulse {
                  0% { box-shadow: 0 4px 12px rgba(0,123,255,0.4); }
                  50% { box-shadow: 0 4px 20px rgba(0,123,255,0.8); }
                  100% { box-shadow: 0 4px 12px rgba(0,123,255,0.4); }
                }
              </style>
            `,
            className: 'driver-location-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });

          L.marker([driverLocation.lat, driverLocation.lng], { icon: driverIcon })
            .addTo(map)
            .bindPopup(`
              <div style="min-width: 180px; text-align: center;">
                <h4 style="margin: 0 0 12px 0; color: #007bff; font-size: 16px;">
                  <i class="fas fa-map-marker-alt"></i> Your Current Location
                </h4>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">Driver Position</p>
                <div style="margin-top: 12px; padding: 6px 12px; background: linear-gradient(135deg, #007bff, #0056b3); color: white; border-radius: 15px; font-size: 11px; font-weight: 600;">
                  🚗 STARTING POINT
                </div>
                <div style="margin-top: 8px; font-size: 11px; color: #999;">
                  Lat: ${driverLocation.lat.toFixed(6)}<br/>
                  Lng: ${driverLocation.lng.toFixed(6)}
                </div>
              </div>
            `, {
              closeButton: true,
              autoClose: false
            });

          // Get optimized route based on driver location
          const optimizedLocations = optimizeRoute(allLocations);

          // Add markers for all locations with optimized numbering and enhanced styling
          optimizedLocations.forEach((location, index) => {
            const isPickup = location.type === 'pickup';
            const markerColor = isPickup ? '#0A5446' : '#ff6b35';
            const bgGradient = isPickup ? 'linear-gradient(135deg, #0A5446 0%, #0d6654 100%)' : 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)';
            
            const icon = L.divIcon({
              html: `
                <div style="
                  background: ${bgGradient}; 
                  color: white; 
                  border-radius: 50%; 
                  width: 35px; 
                  height: 35px; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  font-weight: bold; 
                  border: 3px solid white; 
                  box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                  font-size: 14px;
                ">${index + 1}</div>
              `,
              className: 'custom-location-icon',
              iconSize: [35, 35],
              iconAnchor: [17.5, 17.5]
            });

            const distanceFromDriver = calculateDistance(
              driverLocation.lat, driverLocation.lng,
              location.coordinates.lat, location.coordinates.lng
            );

            L.marker([location.coordinates.lat, location.coordinates.lng], { icon })
              .addTo(map)
              .bindPopup(`
                <div style="min-width: 250px; max-width: 300px;">
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                    <div style="
                      background: ${bgGradient}; 
                      color: white; 
                      width: 24px; 
                      height: 24px; 
                      border-radius: 50%; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      font-size: 12px; 
                      font-weight: bold;
                    ">${index + 1}</div>
                    <h4 style="margin: 0; color: #333; font-size: 16px;">${location.name}</h4>
                  </div>
                  
                  <p style="margin: 0 0 10px 0; color: #666; font-size: 13px; line-height: 1.4;">
                    📍 ${location.address}
                  </p>
                  
                  <div style="display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap;">
                    <span style="
                      background: ${markerColor}; 
                      color: white; 
                      padding: 3px 10px; 
                      border-radius: 12px; 
                      font-size: 11px; 
                      text-transform: uppercase; 
                      font-weight: 600;
                      letter-spacing: 0.5px;
                    ">
                      ${isPickup ? '📦 PICKUP' : '🏠 DELIVERY'}
                    </span>
                    <span style="
                      background: rgba(108, 117, 125, 0.1); 
                      color: #6c757d; 
                      padding: 3px 10px; 
                      border-radius: 12px; 
                      font-size: 11px; 
                      font-weight: 500;
                    ">
                      📏 ${distanceFromDriver.toFixed(1)} km away
                    </span>
                  </div>
                  
                  ${location.contactPhone ? `
                    <div style="margin: 8px 0; display: flex; align-items: center; gap: 6px;">
                      <i class="fas fa-phone" style="color: #28a745; font-size: 12px;"></i>
                      <span style="color: #666; font-size: 12px; font-weight: 500;">${location.contactPhone}</span>
                    </div>
                  ` : ''}
                  
                  ${location.deliveryInstructions ? `
                    <div style="margin: 8px 0; padding: 8px 10px; background: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107; border-radius: 4px;">
                      <div style="display: flex; align-items: flex-start; gap: 6px;">
                        <i class="fas fa-info-circle" style="color: #ffc107; font-size: 12px; margin-top: 2px;"></i>
                        <span style="color: #856404; font-size: 12px; line-height: 1.3;">${location.deliveryInstructions}</span>
                      </div>
                    </div>
                  ` : ''}
                  
                  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #eee; display: flex; gap: 8px;">
                    ${location.contactPhone ? `
                      <button onclick="window.open('tel:${location.contactPhone}')" style="
                        flex: 1; 
                        background: #28a745; 
                        color: white; 
                        border: none; 
                        padding: 6px 12px; 
                        border-radius: 6px; 
                        font-size: 11px; 
                        font-weight: 600; 
                        cursor: pointer;
                      ">
                        📞 CALL
                      </button>
                    ` : ''}
                    <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}')" style="
                      flex: 1; 
                      background: #007bff; 
                      color: white; 
                      border: none; 
                      padding: 6px 12px; 
                      border-radius: 6px; 
                      font-size: 11px; 
                      font-weight: 600; 
                      cursor: pointer;
                    ">
                      🧭 NAVIGATE
                    </button>
                  </div>
                </div>
              `, {
                closeButton: true,
                autoClose: false,
                maxWidth: 320
              });
          });

          // Draw route between locations starting from driver location
          const routeWithDriver = [{ coordinates: driverLocation }, ...optimizedLocations];
          await drawRoute(map, routeWithDriver);

          // Fit map to show all markers including driver location
          const allMarkers = [
            L.marker([driverLocation.lat, driverLocation.lng]),
            ...optimizedLocations.map(location => 
              L.marker([location.coordinates.lat, location.coordinates.lng])
            )
          ];
          const group = new L.featureGroup(allMarkers);
          map.fitBounds(group.getBounds().pad(0.1));
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, [currentOrderData, driverLocation]); // Re-initialize when driver location changes

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

  // Calculate distance function (used for displaying distances in the UI)
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

  // Create optimized route for UI display
  const createOptimizedRoute = (locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    // Calculate distances from driver location to each pickup location
    const pickupsWithCalculatedDistance = pickups.map(pickup => ({
      ...pickup,
      calculatedDistance: calculateDistance(
        driverLocation.lat, driverLocation.lng,
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

  const optimizedRoute = route || createOptimizedRoute(currentOrderData.locations);

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
            <div className="location-status">
              <span className="order-info">{currentOrderData.orderNumber} • {currentOrderData.customerName}</span>
              {locationLoading && (
                <span className="location-indicator loading">
                  <i className="fas fa-spinner fa-spin"></i> Getting your location...
                </span>
              )}
              {locationError && (
                <span className="location-indicator error">
                  <i className="fas fa-exclamation-triangle"></i> Using default location
                </span>
              )}
              {!locationLoading && !locationError && (
                <span className="location-indicator success">
                  <i className="fas fa-map-marker-alt"></i> Location detected
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="nav-header-right">
          <button 
            className="refresh-location-btn"
            onClick={refreshLocation}
            disabled={locationLoading}
            title="Refresh location"
          >
            <i className={`fas fa-location-arrow ${locationLoading ? 'fa-spin' : ''}`}></i>
          </button>
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

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDriverLocation } from '../../contexts/DriverLocationContext';
import './NavigationPage.css';

const NavigationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, route, orderDetails } = location.state || {};
  
  const currentOrderData = orderData || orderDetails;
  const { driverLocation, locationLoading, locationError } = useDriverLocation();
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [error, setError] = useState(null);


  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Optimize route by distance from driver location
  const optimizeRoute = useCallback((locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    const pickupsWithDistance = pickups.map(pickup => ({
      ...pickup,
      calculatedDistance: calculateDistance(
        driverLocation.lat, driverLocation.lng,
        pickup.coordinates.lat, pickup.coordinates.lng
      )
    }));

    const sortedPickups = pickupsWithDistance.sort((a, b) => 
      a.calculatedDistance - b.calculatedDistance
    );
    
    return [...sortedPickups, ...deliveries];
  }, [driverLocation]);

  // Main effect to initialize map
  useEffect(() => {
    const drawRoute = async (mapInstance, locations) => {
      try {
        const coordinates = locations.map(loc => [loc.coordinates.lng, loc.coordinates.lat]);
        
        const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '5b3ce3597851110001cf6248a1f4b2b0e32c4f0dbd574bfaa2c79b16'
          },
          body: JSON.stringify({
            coordinates: coordinates,
            format: 'geojson',
            instructions: true,
            geometry: true
          })
        });

        if (response.ok) {
          const data = await response.json();
          const routeCoords = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          
          const L = await import('leaflet');
          L.polyline(routeCoords, {
            color: '#ff6b35',
            weight: 6,
            opacity: 0.8,
            lineJoin: 'round',
            lineCap: 'round'
          }).addTo(mapInstance);
          
          console.log('Route added successfully');
        } else {
          console.warn('OpenRouteService API failed, using fallback');
          const routeCoords = locations.map(loc => [loc.coordinates.lat, loc.coordinates.lng]);
          const L = await import('leaflet');
          L.polyline(routeCoords, {
            color: '#ff6b35',
            weight: 4,
            opacity: 0.6,
            dashArray: '5, 10'
          }).addTo(mapInstance);
        }
      } catch (error) {
        console.error('Route drawing error:', error);
      }
    };

    const initializeMap = async () => {
      if (!currentOrderData?.locations || !mapRef.current) {
        console.error('Missing order data or map container');
        return;
      }

      // Clean up existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      try {
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // Fix marker icons
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Setup map container
        mapRef.current.innerHTML = '';
        mapRef.current.style.height = '100%';
        mapRef.current.style.width = '100%';
        mapRef.current.style.minHeight = '400px';
        
        // Calculate map center
        const allLocations = currentOrderData.locations;
        const allCoordinates = [driverLocation, ...allLocations.map(loc => loc.coordinates)];
        const centerLat = allCoordinates.reduce((sum, coord) => sum + coord.lat, 0) / allCoordinates.length;
        const centerLng = allCoordinates.reduce((sum, coord) => sum + coord.lng, 0) / allCoordinates.length;

        // Initialize map
        const map = L.map(mapRef.current, {
          zoomControl: true,
          attributionControl: true,
          preferCanvas: true,
          fadeAnimation: true,
          zoomAnimation: true,
          markerZoomAnimation: true
        }).setView([centerLat, centerLng], 12);

        // Add English-only tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);

        mapInstanceRef.current = map;

        // Add markers when map is ready
        map.whenReady(() => {
          // Add driver marker
          const driverIcon = L.divIcon({
            className: 'driver-marker',
            html: '<div class="driver-marker-inner">🚛</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          L.marker([driverLocation.lat, driverLocation.lng], { icon: driverIcon })
            .addTo(map)
            .bindPopup('<div class="marker-popup"><h4>Your Location</h4><p>Starting point</p></div>');

          // Get optimized locations
          const optimizedLocations = optimizeRoute(allLocations);

          // Add location markers
          optimizedLocations.forEach((location, index) => {
            const isPickup = location.type === 'pickup';
            const bgGradient = isPickup ? 'linear-gradient(135deg, #0A5446 0%, #0d6654 100%)' : 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)';
            
            const icon = L.divIcon({
              html: `<div style="background: ${bgGradient}; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); font-size: 14px;">${index + 1}</div>`,
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
                  <h4 style="margin: 0 0 10px 0;">${location.name}</h4>
                  <p style="margin: 0 0 10px 0;">📍 ${location.address || 'No address provided'}</p>
                  <div style="margin-bottom: 10px;">
                    <span style="background: ${isPickup ? '#0A5446' : '#ff6b35'}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; text-transform: uppercase; font-weight: 600;">
                      ${isPickup ? '📦 PICKUP' : '🏠 DELIVERY'}
                    </span>
                    <span style="margin-left: 8px; background: rgba(108, 117, 125, 0.1); color: #6c757d; padding: 3px 10px; border-radius: 12px; font-size: 11px;">
                      📏 ${distanceFromDriver.toFixed(1)} km away
                    </span>
                  </div>
                  <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address || location.name)}')" style="background: #007bff; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; cursor: pointer;">
                    🧭 NAVIGATE
                  </button>
                </div>
              `);
          });

          // Draw route
          const routeWithDriver = [{ coordinates: driverLocation }, ...optimizedLocations];
          drawRoute(map, routeWithDriver);

          // Fit map bounds
          const allMarkers = [
            [driverLocation.lat, driverLocation.lng],
            ...optimizedLocations.map(location => [location.coordinates.lat, location.coordinates.lng])
          ];
          
          setTimeout(() => {
            if (mapInstanceRef.current) {
              try {
                const group = L.featureGroup(allMarkers.map(coords => L.marker(coords)));
                map.fitBounds(group.getBounds().pad(0.1));
              } catch (boundsError) {
                console.warn('Error setting map bounds:', boundsError);
                map.setView([centerLat, centerLng], 12);
              }
            }
          }, 500);
        });

        // Force map resize
        setTimeout(() => {
          if (mapInstanceRef.current) {
            map.invalidateSize();
          }
        }, 200);

      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to load map. Please refresh the page.');
      }
    };

    if (driverLocation && currentOrderData) {
      initializeMap();
    }
  }, [currentOrderData, driverLocation, optimizeRoute]);

  // Cleanup effect for map
  useEffect(() => {
    return () => {
      // Cleanup map on component unmount
      if (mapInstanceRef.current) {
        console.log('Cleaning up map instance');
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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

  // Create optimized route for UI display
  const createOptimizedRoute = (locations) => {
    const pickups = locations.filter(loc => loc.type === 'pickup');
    const deliveries = locations.filter(loc => loc.type === 'delivery');
    
    const pickupsWithCalculatedDistance = pickups.map(pickup => ({
      ...pickup,
      calculatedDistance: calculateDistance(
        driverLocation.lat, driverLocation.lng,
        pickup.coordinates.lat, pickup.coordinates.lng
      )
    }));

    const sortedPickups = pickupsWithCalculatedDistance.sort((a, b) => 
      a.calculatedDistance - b.calculatedDistance
    );
    
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
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="nav-title">
            <h2>Delivery Navigation</h2>
            <div className="location-status">
              <span className="order-info">{currentOrderData.orderNumber} • {currentOrderData.customerName}</span>
              {locationLoading && <span className="location-indicator loading"><i className="fas fa-spinner fa-spin"></i> Getting location...</span>}
              {locationError && <span className="location-indicator error"><i className="fas fa-exclamation-triangle"></i> Using Nuwara Eliya</span>}
              {!locationLoading && !locationError && <span className="location-indicator success"><i className="fas fa-map-marker-alt"></i> Nuwara Eliya</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Map and Places */}
      <div className="nav-content">
        <div className="map-places-container">
          {/* Map Section */}
          <div className="map-section">
            <div 
              id="map" 
              ref={mapRef}
              style={{ 
                height: '100%', 
                width: '100%', 
                minHeight: '500px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {!mapInstanceRef.current && (
                <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                  <p>Loading map...</p>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
              )}
            </div>
          </div>          {/* Places List Section */}
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

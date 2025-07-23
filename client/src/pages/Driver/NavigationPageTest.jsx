import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDriverLocation } from '../../contexts/DriverLocationContext';
import './NavigationPage.css';

const NavigationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, orderDetails } = location.state || {};
  
  const currentOrderData = orderData || orderDetails;

  const { driverLocation, locationLoading, locationError, refreshLocation } = useDriverLocation();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [error, setError] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    const initializeSimpleMap = async () => {
      if (mapInitialized || !currentOrderData || !driverLocation || !mapRef.current) {
        console.log('Skipping map initialization:', {
          mapInitialized,
          orderData: !!currentOrderData,
          driverLocation: !!driverLocation,
          mapRef: !!mapRef.current
        });
        return;
      }

      if (mapInstanceRef.current) {
        console.log('Map instance already exists, skipping...');
        return;
      }

      try {
        console.log('Starting map initialization...');
        
        setMapInitialized(true);
        
        const L = await import('leaflet');
        
        await import('leaflet/dist/leaflet.css');
        
        console.log('Leaflet loaded successfully');
        
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (mapRef.current && mapRef.current._leaflet_id === undefined) {
          mapRef.current.innerHTML = '';
          
          mapRef.current.style.height = '100%';
          mapRef.current.style.width = '100%';
          mapRef.current.style.minHeight = '400px';
        
          console.log('Initializing map with driver location:', driverLocation);
          
          const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: true
          }).setView([driverLocation.lat, driverLocation.lng], 12);

          console.log('Map instance created');

          const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors © CARTO',
            maxZoom: 19,
            subdomains: 'abcd'
          });
          
          tileLayer.addTo(map);
          console.log('Tile layer added');

          const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = 
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
          };

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
                box-shadow: 0 4px 12px rgba(0,123,255,0.6);
                animation: pulse 2s infinite;
              ">
                🚛
              </div>
              <style>
                @keyframes pulse {
                  0% { box-shadow: 0 4px 12px rgba(0,123,255,0.6); }
                  50% { box-shadow: 0 4px 20px rgba(0,123,255,1); }
                  100% { box-shadow: 0 4px 12px rgba(0,123,255,0.6); }
                }
              </style>
            `,
            className: 'driver-location-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });

          L.marker([driverLocation.lat, driverLocation.lng], { icon: driverIcon })
            .addTo(map)
            .bindPopup(`
              <div style="text-align: center; min-width: 200px;">
                <h4 style="margin: 0 0 10px 0; color: #007bff;">🚛 Your Location</h4>
                <p style="margin: 0; color: #666;">Driver Starting Point</p>
                <p style="margin: 5px 0; color: #28a745; font-weight: 600;">📍 Nuwara Eliya</p>
                <div style="margin-top: 10px; padding: 5px 10px; background: #007bff; color: white; border-radius: 15px; font-size: 12px;">
                  Current Position
                </div>
              </div>
            `)
            .openPopup();

          console.log('Driver marker added');

          if (currentOrderData.locations) {
            console.log('Processing locations:', currentOrderData.locations);
            
            const locationsWithDistance = currentOrderData.locations.map((location, index) => ({
              ...location,
              originalIndex: index,
              distance: calculateDistance(
                driverLocation.lat, 
                driverLocation.lng,
                location.coordinates.lat, 
                location.coordinates.lng
              )
            })).sort((a, b) => a.distance - b.distance); // Sort by distance (nearest first)

            console.log('Locations ordered by distance:', locationsWithDistance);

            // Add markers for each location with distance-based styling
            locationsWithDistance.forEach((location, sortedIndex) => {
              console.log('Adding marker for location:', location.name, 'at coordinates:', location.coordinates);
              
              try {
                const isClosest = sortedIndex === 0;
                const isFarthest = sortedIndex === locationsWithDistance.length - 1;
              
              // Color coding: Green for closest, Red for farthest, Orange for middle
              let markerColor = '#ff6b35'; // Default orange
              let markerText = sortedIndex + 1;
              let priorityLabel = 'Medium Priority';
              
              if (isClosest) {
                markerColor = '#28a745'; // Green for closest
                priorityLabel = 'NEXT STOP';
              } else if (isFarthest) {
                markerColor = '#dc3545'; // Red for farthest
                priorityLabel = 'Farthest Stop';
              }

              const locationIcon = L.divIcon({
                html: `
                  <div style="
                    background: linear-gradient(135deg, ${markerColor} 0%, ${markerColor}dd 100%); 
                    color: white; 
                    border-radius: 50%; 
                    width: 35px; 
                    height: 35px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-weight: bold; 
                    border: 3px solid white; 
                    box-shadow: 0 3px 10px rgba(0,0,0,0.4);
                    font-size: 14px;
                    ${isClosest ? 'animation: bounce 2s infinite;' : ''}
                  ">
                    ${markerText}
                  </div>
                  ${isClosest ? `
                    <style>
                      @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-10px); }
                        60% { transform: translateY(-5px); }
                      }
                    </style>
                  ` : ''}
                `,
                className: 'destination-marker',
                iconSize: [35, 35],
                iconAnchor: [17.5, 17.5]
              });

              L.marker([location.coordinates.lat, location.coordinates.lng], { icon: locationIcon })
                .addTo(map)
                .bindPopup(`
                  <div style="min-width: 280px; max-width: 320px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                      <div style="
                        background: linear-gradient(135deg, ${markerColor} 0%, ${markerColor}dd 100%); 
                        color: white; 
                        width: 30px; 
                        height: 30px; 
                        border-radius: 50%; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        font-size: 14px; 
                        font-weight: bold;
                      ">${markerText}</div>
                      <div>
                        <h4 style="margin: 0; color: #333; font-size: 16px;">${location.name}</h4>
                        <p style="margin: 0; color: #666; font-size: 12px;">${location.address || 'No address provided'}</p>
                      </div>
                    </div>
                    
                    <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
                      <span style="
                        background: ${markerColor}; 
                        color: white; 
                        padding: 4px 12px; 
                        border-radius: 15px; 
                        font-size: 11px; 
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                      ">
                        ${priorityLabel}
                      </span>
                      <span style="
                        background: rgba(108, 117, 125, 0.1); 
                        color: #6c757d; 
                        padding: 4px 12px; 
                        border-radius: 15px; 
                        font-size: 11px; 
                        font-weight: 500;
                      ">
                        📏 ${location.distance.toFixed(1)} km away
                      </span>
                    </div>

                    ${location.type ? `
                      <div style="margin: 8px 0;">
                        <span style="
                          background: ${location.type === 'pickup' ? '#0A5446' : '#ff6b35'}; 
                          color: white; 
                          padding: 3px 10px; 
                          border-radius: 12px; 
                          font-size: 10px; 
                          text-transform: uppercase; 
                          font-weight: 600;
                        ">
                          ${location.type === 'pickup' ? '📦 PICKUP' : '🏠 DELIVERY'}
                        </span>
                      </div>
                    ` : ''}

                    ${location.items ? `
                      <div style="margin: 10px 0; padding: 8px 10px; background: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107; border-radius: 4px;">
                        <div style="display: flex; align-items: flex-start; gap: 6px;">
                          <span style="color: #856404; font-size: 11px; font-weight: 600;">📦 Items:</span>
                          <span style="color: #856404; font-size: 11px;">${location.items}</span>
                        </div>
                      </div>
                    ` : ''}
                    
                    <div style="margin-top: 15px; padding-top: 12px; border-top: 1px solid #eee; display: flex; gap: 8px;">
                      <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address || location.name)}')" style="
                        flex: 1; 
                        background: #007bff; 
                        color: white; 
                        border: none; 
                        padding: 8px 12px; 
                        border-radius: 6px; 
                        font-size: 11px; 
                        font-weight: 600; 
                        cursor: pointer;
                      ">
                        🧭 Navigate Here
                      </button>
                    </div>
                  </div>
                `, {
                  closeButton: true,
                  autoClose: false,
                  maxWidth: 350
                });

              console.log('Marker added successfully for:', location.name);

              // Add highlighting circle for the closest location
              if (isClosest) {
                L.circle([location.coordinates.lat, location.coordinates.lng], {
                  color: '#28a745',
                  fillColor: '#28a745',
                  fillOpacity: 0.1,
                  radius: 500, // 500 meter radius
                  weight: 2,
                  dashArray: '5, 5'
                }).addTo(map);
              }
              
              } catch (markerError) {
                console.error('Error adding marker for location:', location.name, markerError);
              }
            });
            
            console.log('Destination markers added with distance ordering');

            // Draw route line connecting driver location to all destinations in distance order
            const routeCoordinates = [
              [driverLocation.lat, driverLocation.lng], // Start from driver location
              ...locationsWithDistance.map(loc => [loc.coordinates.lat, loc.coordinates.lng])
            ];

            L.polyline(routeCoordinates, {
              color: '#007bff',
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 5',
              lineJoin: 'round',
              lineCap: 'round'
            }).addTo(map);

            console.log('Route line added connecting all locations');

            // Fit map to show all markers including driver location
            const allCoordinates = [
              [driverLocation.lat, driverLocation.lng],
              ...locationsWithDistance.map(loc => [loc.coordinates.lat, loc.coordinates.lng])
            ];
            
            const group = new L.featureGroup(allCoordinates.map(coord => L.marker(coord)));
            map.fitBounds(group.getBounds().pad(0.1));
            
            console.log('Map bounds adjusted to show all locations');
          }

          // Force map to resize and invalidate
          setTimeout(() => {
            map.invalidateSize();
            console.log('Map size invalidated and resized');
          }, 100);

          // Store map instance
          mapInstanceRef.current = map;
          console.log('Map initialization complete');
        } else {
          console.log('Map container already has Leaflet instance or is invalid');
          setMapInitialized(false); // Reset if container is invalid
        }

      } catch (error) {
        console.error('Error initializing map:', error);
        setError(`Failed to load map: ${error.message}`);
        setMapInitialized(false); // Reset on error
      }
    };

    console.log('useEffect triggered - checking map initialization');
    initializeSimpleMap();

    // Cleanup function to prevent memory leaks
    return () => {
      if (mapInstanceRef.current) {
        console.log('Cleaning up map instance');
        try {
          mapInstanceRef.current.off();
          mapInstanceRef.current.remove();
        } catch (cleanupError) {
          console.log('Error during map cleanup:', cleanupError);
        } finally {
          mapInstanceRef.current = null;
          setMapInitialized(false);
        }
      }
    };
  }, [driverLocation, currentOrderData, mapInitialized]); // Add mapInitialized to dependencies

  if (!currentOrderData) {
    return (
      <div className="navigation-page">
        <div className="error-message">
          <h2>No Order Data</h2>
          <p>Please navigate from the order dashboard.</p>
          <button onClick={() => navigate('/driverhome')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

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
          <h2>Navigation - Order #{currentOrderData.orderNumber || currentOrderData.orderId || 'N/A'}</h2>
        </div>
        <div className="nav-header-right">
          <button 
            className="refresh-location-btn"
            onClick={refreshLocation}
            disabled={locationLoading}
          >
            {locationLoading ? '📍' : '🔄'} Refresh Location
          </button>
          <div className={`location-indicator ${
            locationError ? 'error' : 
            driverLocation ? 'success' : 
            'loading'
          }`}>
            {locationError ? '❌ Location Error' : 
             driverLocation ? '✅ Location Found' : 
             '📍 Getting Location...'}
          </div>
        </div>
      </div>

      {/* Main Content */}
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
              {(!mapInstanceRef.current && !error && !mapInitialized) && (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#666',
                  padding: '20px'
                }}>
                  <p>Loading map...</p>
                  {locationLoading && <p>Getting your location...</p>}
                </div>
              )}
              {error && (
                <div style={{ 
                  textAlign: 'center', 
                  color: 'red',
                  padding: '20px',
                  maxWidth: '300px'
                }}>
                  <p>{error}</p>
                  <button onClick={() => {
                    setError(null);
                    setMapInitialized(false);
                    window.location.reload();
                  }}>
                    Refresh Page
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Places Section */}
          <div className="places-section">
            <div className="places-header">
              <h3>Route Stops</h3>
              <span className="total-stops">
                {currentOrderData.locations ? currentOrderData.locations.length : 0} stops
              </span>
            </div>
            
            <div className="places-list">
              {currentOrderData.locations?.map((location, index) => (
                <div key={index} className="place-card">
                  <div className="place-number">{index + 1}</div>
                  <div className="place-info">
                    <h4>{location.name}</h4>
                    <p className="place-type">{location.type || 'Pickup'}</p>
                    {location.items && (
                      <p className="place-items">
                        Items: {location.items}
                      </p>
                    )}
                    {location.distance && (
                      <p className="place-distance">
                        Distance: {location.distance.toFixed(1)} km
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;

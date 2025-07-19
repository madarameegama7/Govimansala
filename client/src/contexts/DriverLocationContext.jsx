import React, { createContext, useContext, useState, useEffect } from 'react';

const DriverLocationContext = createContext();

export const useDriverLocation = () => {
  const context = useContext(DriverLocationContext);
  if (!context) {
    throw new Error('useDriverLocation must be used within a DriverLocationProvider');
  }
  return context;
};

export const DriverLocationProvider = ({ children }) => {
  const [driverLocation, setDriverLocation] = useState({ lat: 6.9271, lng: 79.8612 }); // Default Colombo
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');

  // Get driver's current location when context initializes
  useEffect(() => {
    const getCurrentLocation = () => {
      setLocationLoading(true);
      setLocationError(null);

      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by this browser.');
        setLocationLoading(false);
        return;
      }

      // Check permission first
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          setLocationPermission(result.state);
          
          if (result.state === 'denied') {
            setLocationError('Location access denied. Using default location.');
            setLocationLoading(false);
            return;
          }
        });
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setDriverLocation({ lat: latitude, lng: longitude, accuracy });
          setLocationLoading(false);
          setLocationError(null);
          console.log('Driver location updated:', { lat: latitude, lng: longitude, accuracy });
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Unable to get your location.';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'Unknown location error.';
              break;
          }
          
          setLocationError(errorMessage);
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000 // 5 minutes
        }
      );
    };

    getCurrentLocation();

    // Watch for location changes (optional - can be enabled for real-time tracking)
    // const watchId = navigator.geolocation.watchPosition(
    //   (position) => {
    //     const { latitude, longitude, accuracy } = position.coords;
    //     setDriverLocation({ lat: latitude, lng: longitude, accuracy });
    //   },
    //   null,
    //   { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    // );

    // return () => {
    //   navigator.geolocation.clearWatch(watchId);
    // };
  }, []);

  const refreshLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setDriverLocation({ lat: latitude, lng: longitude, accuracy });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError('Failed to refresh location.');
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const value = {
    driverLocation,
    setDriverLocation,
    locationLoading,
    locationError,
    locationPermission,
    refreshLocation
  };

  return (
    <DriverLocationContext.Provider value={value}>
      {children}
    </DriverLocationContext.Provider>
  );
};

export default DriverLocationContext;

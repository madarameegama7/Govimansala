import React, { createContext, useContext, useState, useEffect } from 'react';

const DriverLocationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDriverLocation = () => {
  const context = useContext(DriverLocationContext);
  if (!context) {
    throw new Error('useDriverLocation must be used within a DriverLocationProvider');
  }
  return context;
};

export const DriverLocationProvider = ({ children }) => {
  const [driverLocation, setDriverLocation] = useState({
    lat: 6.9497, // Nuwara Eliya latitude
    lng: 80.7891, // Nuwara Eliya longitude
    accuracy: 100
  });
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [locationPermission] = useState('granted');

  // Always use Nuwara Eliya as the current location
  useEffect(() => {
    setLocationLoading(true);
    setLocationError(null);
    
    // Simulate loading for a brief moment for better UX
    setTimeout(() => {
      setDriverLocation({
        lat: 6.9497, // Nuwara Eliya latitude
        lng: 80.7891, // Nuwara Eliya longitude
        accuracy: 100
      });
      setLocationLoading(false);
      setLocationError(null);
      console.log('Driver location set to Nuwara Eliya:', { lat: 6.9497, lng: 80.7891 });
    }, 1000);
  }, []);

  const refreshLocation = () => {
    // Always use Nuwara Eliya coordinates instead of actual location
    setLocationLoading(true);
    setLocationError(null);
    
    setTimeout(() => {
      setDriverLocation({
        lat: 6.9497, // Nuwara Eliya latitude
        lng: 80.7891, // Nuwara Eliya longitude
        accuracy: 100
      });
      setLocationLoading(false);
      console.log('Location refreshed to Nuwara Eliya coordinates');
    }, 500);
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

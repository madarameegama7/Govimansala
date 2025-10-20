import React, { useState } from "react";

// Dummy drivers data
const drivers = [
  { id: 1, name: "Driver A", city: "Kandy" },
  { id: 2, name: "Driver B", city: "Colombo" },
  { id: 3, name: "Driver C", city: "Kandy" },
  { id: 4, name: "Driver D", city: "Galle" },
];


function PlaceOrder() {
  const [city, setCity] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notifiedDrivers, setNotifiedDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Find drivers in the selected city
    const nearbyDrivers = drivers.filter((d) => d.city === city);
    setNotifiedDrivers(nearbyDrivers);
    setOrderPlaced(true);
    setShowModal(true);

    // Save notification to localStorage for the city
    if (city) {
      const notifications = JSON.parse(localStorage.getItem(`driver_notifications_${city}`) || "[]");
      notifications.push({
        message: `New order placed in ${city}!`,
        time: new Date().toLocaleString(),
      });
      localStorage.setItem(`driver_notifications_${city}`, JSON.stringify(notifications));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select City</option>
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
          </select>
        </label>
        <br /><br />
        <button type="submit">Place Order</button>
      </form>
      {orderPlaced && (
        <div style={{ marginTop: 20 }}>
          <h4>Order placed for {city}!</h4>
          <p>Notified drivers in {city}:</p>
          <ul>
            {notifiedDrivers.length > 0 ? (
              notifiedDrivers.map((driver) => (
                <li key={driver.id}>{driver.name}</li>
              ))
            ) : (
              <li>No drivers found in {city}</li>
            )}
          </ul>
        </div>
      )}

      {/* Popup Modal Notification */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{ background: "#fff", padding: 30, borderRadius: 10, minWidth: 300 }}>
            <h3>Notification</h3>
            {notifiedDrivers.length > 0 ? (
              <div>
                <p>The following drivers in {city} have been notified:</p>
                <ul>
                  {notifiedDrivers.map(driver => (
                    <li key={driver.id}>{driver.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No drivers found in {city}.</p>
            )}
            <button onClick={handleCloseModal} style={{ marginTop: 20 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;

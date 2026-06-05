import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/ship";

export default function ViewShips() {

  const [ships, setShips] = useState([]);

  // ✅ Load ships
  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setShips(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load ships");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🚢 Available Ships</h2>

      <div style={styles.grid}>
        {ships.map((ship) => (
          <div key={ship.shipId} style={styles.card}>

            {/* Image */}
            <img
              src={ship.imageUrl}
              alt={ship.shipName}
              style={styles.image}
            />

            {/* Details */}
            <h3>{ship.shipName}</h3>
            <p><b>ID:</b> {ship.shipId}</p>
            <p><b>Seating:</b> {ship.seatingCapacity}</p>
            <p><b>Reservation:</b> {ship.reservationCapacity}</p>

            {/* Book Button (next feature) */}
            <button style={styles.button}>
              Book Ticket
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    padding: "20px",
    textAlign: "center"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  card: {
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080/schedule";

export default function ViewSchedule() {

  const [schedules, setSchedules] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {

    try {

      const res = await axios.get(`${API}/all`);

      setSchedules(res.data);

    } catch (err) {

      console.error(err);

      alert("Error loading schedules");
    }
  };

  // ✅ Navigate to BookTicket page
  const bookNow = (scheduleId) => {

    navigate("/user/book", {
      state: { scheduleId }
    });
  };

  return (

    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>

      <UserNavbar />

      <h2 style={{ textAlign: "center", margin: "20px" }}>
        Ship Schedule 📅
      </h2>

      <div style={styles.grid}>

        {schedules.length === 0 ? (

          <p>No schedules available</p>

        ) : (

          schedules.map((s) => (

            <div key={s.scheduleId} style={styles.card}>

              <h3>Schedule ID: {s.scheduleId}</h3>

              <p><b>Ship ID:</b> {s.shipId}</p>

              <p><b>Route ID:</b> {s.routeId}</p>

              <p><b>Date:</b> {s.startDate}</p>

              <button
                style={styles.button}
                onClick={() => bookNow(s.scheduleId)}
              >
                Book Now
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    padding: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "0.3s"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#0077ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
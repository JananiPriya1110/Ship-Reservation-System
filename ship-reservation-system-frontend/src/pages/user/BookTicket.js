import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../../components/UserNavbar";

export default function BookTicket() {

  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [noOfSeats, setNoOfSeats] = useState(1);

  const userId = localStorage.getItem("userID");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/schedule/all"
      );

      setSchedules(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const bookTicket = async () => {

    if (!selectedSchedule || !journeyDate || !noOfSeats) {
      alert("Please Fill All Fields");
      return;
    }

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const reservation = {

      reservationId: "RES" + Date.now(),

      scheduleId: selectedSchedule,

      userId: userId,

      bookingDate: new Date()
        .toISOString()
        .split("T")[0],

      journeyDate: journeyDate,

      noOfSeats: parseInt(noOfSeats),

      totalFare: parseInt(noOfSeats) * 500,

      bookingStatus: "BOOKED",

      paymentStatus: "NOT_PAID"
    };

    console.log(reservation);

    try {

      const res = await axios.post(
        "http://localhost:8080/reservation/add",
        reservation
      );

      console.log(res.data);

      alert("Ticket Reserved Successfully ✅");

      setSelectedSchedule("");
      setJourneyDate("");
      setNoOfSeats(1);

    } catch (err) {

      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Booking Failed ❌");
    }
  };

  return (
    <div>

      <UserNavbar />

      <div style={styles.container}>

        <h1 style={styles.title}>
          Reserve Ship Ticket 🚢
        </h1>

        <div style={styles.card}>

          <label style={styles.label}>
            Select Schedule
          </label>

          <select
            value={selectedSchedule}
            onChange={(e) =>
              setSelectedSchedule(e.target.value)
            }
            style={styles.input}
          >

            <option value="">
              Choose Schedule
            </option>

            {schedules.map((s) => (

              <option
                key={s.scheduleId}
                value={s.scheduleId}
              >
                {s.scheduleId} | Ship: {s.shipId}
              </option>

            ))}

          </select>

          <label style={styles.label}>
            Journey Date
          </label>

          <input
            type="date"
            value={journeyDate}
            onChange={(e) =>
              setJourneyDate(e.target.value)
            }
            style={styles.input}
          />

          <label style={styles.label}>
            Number of Seats
          </label>

          <input
            type="number"
            min="1"
            value={noOfSeats}
            onChange={(e) =>
              setNoOfSeats(e.target.value)
            }
            style={styles.input}
          />

          <h2 style={styles.fare}>
            Total Fare: ₹ {noOfSeats * 500}
          </h2>

          <button
            onClick={bookTicket}
            style={styles.button}
          >
            Reserve Ticket
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px"
  },

  title: {
    marginBottom: "20px"
  },

  card: {
    width: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  label: {
    fontWeight: "bold"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },

  fare: {
    textAlign: "center",
    color: "#0077ff"
  },

  button: {
    padding: "14px",
    background: "#0077ff",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer"
  }
};
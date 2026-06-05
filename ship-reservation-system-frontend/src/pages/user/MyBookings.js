import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

export default function MyBookings() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem("userID");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/reservation/all"
      );

      const myData = res.data.filter(
        (b) => b.userId === userId
      );

      setBookings(myData);

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD THIS FUNCTION
  const goToPayment = (booking) => {

    navigate("/user/payment", {
      state: booking
    });
  };

  const cancelTicket = async (id) => {

    try {

      const res = await axios.post(
        `http://localhost:8080/reservation/cancel/${id}`
      );

      alert(res.data);

      fetchBookings();

    } catch (err) {
      alert("Cancel Failed");
    }
  };

  return (
    <div>

      <UserNavbar />

      <div style={{ padding: "20px" }}>

        <h2 style={{ textAlign: "center" }}>
          My Bookings 🎫
        </h2>

        <table border="1" width="100%" cellPadding="10">

          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Schedule ID</th>
              <th>Journey Date</th>
              <th>Seats</th>
              <th>Fare</th>
              <th>Booking Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map((b) => (

              <tr key={b.reservationId}>

                <td>{b.reservationId}</td>
                <td>{b.scheduleId}</td>
                <td>{b.journeyDate}</td>
                <td>{b.noOfSeats}</td>
                <td>₹ {b.totalFare}</td>
                <td>{b.bookingStatus}</td>
                <td>{b.paymentStatus}</td>

                <td>

                  {b.bookingStatus === "CANCELLED" ? (

                    <button
                      style={{
                        backgroundColor: "gray",
                        color: "white",
                        border: "none",
                        padding: "8px"
                      }}
                      disabled
                    >
                      Cancelled
                    </button>

                  ) : b.paymentStatus !== "PAID" ? (

                    <button
                      onClick={() => goToPayment(b)}
                    >
                      Pay Now
                    </button>

                  ) : (

  <>
    <button disabled>
      Paid
    </button>

    <button
      style={{ marginLeft: "10px" }}
      onClick={() =>
        navigate("/user/ticket", {
          state: b
        })
      }
    >
      View Ticket
    </button>
  </>

)}

                  {b.bookingStatus !== "CANCELLED" && (
                    <button
                      onClick={() => cancelTicket(b.reservationId)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}
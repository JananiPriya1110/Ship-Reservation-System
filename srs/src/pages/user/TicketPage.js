import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import UserNavbar from "../../components/UserNavbar";

export default function TicketPage() {

  const location = useLocation();

  const booking = location.state;

  const ticketRef = useRef();

  const downloadPDF = async () => {

    const canvas = await html2canvas(ticketRef.current);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

    pdf.save(`${booking.reservationId}.pdf`);
  };

  return (
    <div>

      <UserNavbar />

      <div style={styles.container}>

        <div ref={ticketRef} style={styles.ticket}>

          <h1 style={{ textAlign: "center" }}>
            🚢 Ship Ticket
          </h1>

          <hr />

          <p><b>Reservation ID:</b> {booking.reservationId}</p>

          <p><b>User ID:</b> {booking.userId}</p>

          <p><b>Schedule ID:</b> {booking.scheduleId}</p>

          <p><b>Journey Date:</b> {booking.journeyDate}</p>

          <p><b>Seats:</b> {booking.noOfSeats}</p>

          <p><b>Total Fare:</b> ₹ {booking.totalFare}</p>

          <p><b>Booking Status:</b> {booking.bookingStatus}</p>

          <p><b>Payment Status:</b> {booking.paymentStatus}</p>

          <hr />

          <h3 style={{ textAlign: "center", color: "green" }}>
            Payment Successful ✅
          </h3>

        </div>

        <button
          onClick={downloadPDF}
          style={styles.button}
        >
          Download Ticket PDF
        </button>

      </div>
    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px"
  },

  ticket: {
    width: "500px",
    padding: "30px",
    border: "2px dashed #333",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)"
  },

  button: {
    marginTop: "20px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#0077ff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};
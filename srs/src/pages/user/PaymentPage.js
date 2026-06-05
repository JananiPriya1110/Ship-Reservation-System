import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

export default function PaymentPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const reservation = location.state;

  const [method, setMethod] = useState("CARD");

  const [cardNumber, setCardNumber] = useState("");
  const [upi, setUpi] = useState("");

  const [loading, setLoading] = useState(false);

  const payNow = async () => {

    if (method === "CARD" && cardNumber.length < 16) {
      alert("Enter valid card number");
      return;
    }

    if (method === "UPI" && !upi.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }

    try {

      setLoading(true);

      // ⏳ Fake processing delay
      setTimeout(async () => {

        await axios.post(
          `http://localhost:8080/reservation/pay/${reservation.reservationId}`
        );

        setLoading(false);

        alert(
          "Payment Successful ✅\nTransaction ID: TXN" + Date.now()
        );

        navigate("/user/my-bookings");

      }, 3000);

    } catch (err) {

      setLoading(false);

      alert("Payment Failed");
    }
  };

  return (
    <div>

      <UserNavbar />

      <div style={styles.container}>

        <div style={styles.card}>

          <h2>Secure Payment 💳</h2>

          <h3>Amount: ₹ {reservation.totalFare}</h3>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={styles.input}
          >
            <option value="CARD">Debit/Credit Card</option>
            <option value="UPI">UPI Payment</option>
          </select>

          {method === "CARD" && (

            <>
              <input
                placeholder="Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={styles.input}
              />

              <input
                placeholder="CVV"
                maxLength="3"
                style={styles.input}
              />
            </>
          )}

          {method === "UPI" && (

            <input
              placeholder="Enter UPI ID"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              style={styles.input}
            />
          )}

          <button
            onClick={payNow}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  },

  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "white"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid gray"
  },

  button: {
    padding: "14px",
    background: "#0077ff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};
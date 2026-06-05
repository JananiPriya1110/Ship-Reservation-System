import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./PassengerManager.css";

const API = "http://localhost:8080/passenger";

export default function PassengerManager() {
  const [passengers, setPassengers] = useState([]);

  // form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [reservationId, setReservationId] = useState("");

  const userType = localStorage.getItem("userType") || "U";
  const username = localStorage.getItem("userID") || "Admin";

  useEffect(() => {
    if (userType === "A") {
      fetchPassengers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPassengers = async () => {
    try {
      const res = await axios.get(`${API}/all?userType=${userType}`);
      setPassengers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setName("");
    setAge("");
    setGender("");
    setContactNumber("");
    setReservationId("");
  };

  const addPassenger = async () => {
    if (!name || !age || !gender || !contactNumber) {
      alert("Fill all required fields");
      return;
    }

    const payload = {
      name,
      age: parseInt(age, 10),
      gender,
      contactNumber,
      reservation: reservationId ? { reservationId: reservationId } : null
    };

    try {
      await axios.post(`${API}/add`, payload);
      alert("Passenger Added");
      await fetchPassengers();
      clearForm();
    } catch (err) {
      console.error(err);
      alert("Error adding passenger");
    }
  };

  const deletePassenger = async (passengerId) => {
    try {
      await axios.delete(`${API}/delete/${passengerId}?userType=${userType}`);
      await fetchPassengers();
    } catch (err) {
      console.error(err);
      alert("Error deleting passenger");
    }
  };

  const listCount = useMemo(() => passengers?.length || 0, [passengers]);

  return (
    <div className="pmPage">
      <div className="pmWrap">
        {/* Top bar */}
        <div className="pmTopBar" role="banner" aria-label="Passenger manager top bar">
          <div className="pmTopLeft">
            <div className="pmLogo" aria-hidden="true">
              
            </div>
            <div className="pmTopMeta">
              <h1>Ship Reservation System</h1>
              <p>Admin • Passenger management</p>
            </div>
          </div>

          <div className="pmTopRight">
            <div className="pmProfile" aria-label="Admin profile">
              <div className="pmProfileIcon" aria-hidden="true">
                
              </div>
              <div className="pmProfileMeta">
                <span>{username}</span>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title + subtitle */}
        <section className="pmHero" aria-label="Passenger manager hero">
          <div className="pmKicker">
            9a0 Passenger Manager
          </div>
          <h2>Manage passengers across reservations</h2>
          <p>
            Add new passengers, view all passenger records, and remove passengers when necessary.
            Designed for an enterprise-grade admin workflow with smooth animations and a responsive
            layout.
          </p>
        </section>

        <div className="pmGrid">
          {/* Form */}
          <div className="pmCard pmFormCard" aria-label="Add passenger form">
            <div className="pmCardHeader">
              <h3>Add Passenger</h3>
              <p>Enter passenger details and link them to a reservation if available.</p>
            </div>

            <div className="pmForm">
              {userType === "A" ? (
                <>
                  <div>
                    <div className="pmLabel">
                      <span>Passenger Name</span>
                      <span style={{ color: "var(--pm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="pmInput"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="pmLabel">
                      <span>Age</span>
                      <span style={{ color: "var(--pm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="pmInput"
                      placeholder="e.g. 28"
                      inputMode="numeric"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="pmLabel">
                      <span>Gender</span>
                      <span style={{ color: "var(--pm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <select className="pmSelect" value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <div className="pmLabel">
                      <span>Contact Number</span>
                      <span style={{ color: "var(--pm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="pmInput"
                      placeholder="e.g. 9876543210"
                      inputMode="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="pmLabel">
                      <span>Reservation ID</span>
                      <span style={{ color: "var(--pm-muted)", fontWeight: 900 }}>Optional</span>
                    </div>
                    <input
                      className="pmInput"
                      placeholder="Link to reservation (optional)"
                      value={reservationId}
                      onChange={(e) => setReservationId(e.target.value)}
                    />
                  </div>

                  <div className="pmActions">
                    <button className="pmBtn" onClick={addPassenger} type="button">
                      Add Passenger
                    </button>
                    <button className="pmBtn pmBtnSecondary" onClick={clearForm} type="button">
                      Clear
                    </button>
                  </div>
                </>
              ) : (
                <div className="pmEmpty">
                  <div aria-hidden="true" style={{ fontSize: 22 }}>
                    6d1
                  </div>
                  <strong>Admin access required</strong>
                  <div style={{ marginTop: 6 }}>You must be an administrator to manage passengers.</div>
                </div>
              )}
            </div>
          </div>

          {/* List */}
          <div className="pmCard pmListCard" aria-label="All passengers list">
            <div className="pmTableTitle">
              <div>
                <h3>All Passengers</h3>
                <p>
                  {userType === "A" ? `${listCount} record${listCount === 1 ? "" : "s"}` : "—"}
                </p>
              </div>
            </div>

            {userType === "A" ? (
              passengers.length === 0 ? (
                <div className="pmEmpty">
                  <div aria-hidden="true" style={{ fontSize: 22 }}>
                    6d2
                  </div>
                  <strong>No Passengers Available</strong>
                </div>
              ) : (
                <table className="pmTable" role="table" aria-label="Passengers table">
                  <thead>
                    <tr>
                      <th style={{ width: 120 }}>Passenger ID</th>
                      <th>Passenger Name</th>
                      <th style={{ width: 90 }}>Age</th>
                      <th style={{ width: 110 }}>Gender</th>
                      <th style={{ width: 170 }}>Contact Number</th>
                      <th style={{ width: 160 }}>Reservation ID</th>
                      <th style={{ width: 150 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passengers.map((p, idx) => (
                      <tr key={p.passengerId ?? idx} className="pmRowHover">
                        <td data-label="Passenger ID">{p.passengerId}</td>
                        <td data-label="Passenger Name">{p.name}</td>
                        <td data-label="Age">{p.age}</td>
                        <td data-label="Gender">{p.gender}</td>
                        <td data-label="Contact Number">{p.contactNumber}</td>
                        <td data-label="Reservation ID">
                          {p.reservation ? p.reservation.reservationId : "-"}
                        </td>
                        <td data-label="Actions">
                          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
                            <button
                              type="button"
                              className="pmDeleteBtn"
                              onClick={() => deletePassenger(p.passengerId)}
                              aria-label={`Delete passenger ${p.name}`}
                            >
                              <span className="pmDeleteIcon" aria-hidden="true">
                              
                              </span>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : (
              <div className="pmEmpty">
                <div aria-hidden="true" style={{ fontSize: 22 }}>
                
                </div>
                <strong>Admin access required</strong>
                <div style={{ marginTop: 6 }}>You must be an administrator to view passenger records.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


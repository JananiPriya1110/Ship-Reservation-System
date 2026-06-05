import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./ShipManager.css";

const API = "http://localhost:8080/ship";

export default function ShipManager() {
  const [ships, setShips] = useState([]);

  // form fields
  const [shipId, setShipId] = useState("");
  const [shipName, setShipName] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [reservationCapacity, setReservationCapacity] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // update mode
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");

  const userType = localStorage.getItem("userType") || "U";
  const username = localStorage.getItem("userID") || "Admin";

  useEffect(() => {
    fetchShips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchShips = async () => {
    const res = await axios.get(`${API}/all`);
    setShips(res.data);
  };

  // ✅ ADD SHIP
  const addShip = async () => {
    if (!shipId || !shipName || !seatingCapacity || !reservationCapacity || !selectedFile) {
      alert("Fill all fields (including image)");
      return;
    }

    const formData = new FormData();
    formData.append("shipId", shipId);
    formData.append("shipName", shipName);
    formData.append("seatingCapacity", seatingCapacity);
    formData.append("reservationCapacity", reservationCapacity);
    formData.append("image", selectedFile);
    formData.append("userType", userType);

    await axios.post(`${API}/add`, formData);
    alert("Ship Added");
    fetchShips();
    clearForm();
  };

  // ✅ UPDATE SHIP (WITH OPTIONAL IMAGE)
  const updateShip = async () => {
    if (!id) {
      alert("Select ship to update");
      return;
    }

    const formData = new FormData();
    formData.append("shipName", shipName);
    formData.append("seatingCapacity", seatingCapacity);
    formData.append("reservationCapacity", reservationCapacity);
    formData.append("userType", "A");

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    await axios.put(`${API}/update/${id}`, formData);

    alert("Ship Updated");
    fetchShips();
    clearForm();
  };

  // ✅ DELETE
  const deleteShip = async (shipIdToDelete) => {
    await axios.delete(`${API}/delete/${shipIdToDelete}?userType=${userType}`);
    fetchShips();
  };

  // ✅ EDIT CLICK
  const editShip = (ship) => {
    setEditMode(true);
    setId(ship.shipId);

    setShipId(ship.shipId);
    setShipName(ship.shipName);
    setSeatingCapacity(ship.seatingCapacity);
    setReservationCapacity(ship.reservationCapacity);

    setSelectedFile(null);
  };

  const clearForm = () => {
    setEditMode(false);
    setId("");

    setShipId("");
    setShipName("");
    setSeatingCapacity("");
    setReservationCapacity("");
    setSelectedFile(null);
  };

  const listCount = useMemo(() => ships?.length || 0, [ships]);

  return (
    <div className="smPage">
      <div className="smWrap">
        {/* Top bar */}
        <div className="smTopBar" role="banner" aria-label="Ship manager top bar">
          <div className="smTopLeft">
            <div className="smLogo" aria-hidden="true">
              ⚓
            </div>
            <div className="smTopMeta">
              <h1>Ship Reservation System</h1>
              <p>Admin • Fleet management</p>
            </div>
          </div>

          <div className="smTopRight">
            <div className="smProfile" aria-label="Admin profile">
              <div className="smProfileIcon" aria-hidden="true">
                👤
              </div>
              <div className="smProfileMeta">
                <span>{username}</span>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title + subtitle */}
        <section className="smHero" aria-label="Ship manager hero">
          <div className="smKicker">✨ Ship Manager</div>
          <h2>Manage ships with precision</h2>
          <p>
            Add new vessels, maintain capacities, and remove ships when needed. Built for a smooth admin
            workflow with responsive layout and modern animations.
          </p>
        </section>

        {/* Main content */}
        <div className="smGrid">
          {/* Form */}
          <div className="smCard smFormCard" aria-label="Add or update ship form">
            <div className="smCardHeader">
              <h3>{editMode ? "Update Ship" : "Add Ship"}</h3>
              <p>
                {editMode
                  ? "Update details for the selected ship. Image upload is optional."
                  : "Enter ship details and upload an image."}
              </p>
            </div>

            <div className="smForm">
              {userType === "A" ? (
                <>
                  <div>
                    <div className="smLabel">
                      <span>Ship ID</span>
                      {editMode && <span style={{ color: "var(--sm-muted)", fontWeight: 900 }}>Locked</span>}
                    </div>
                    <input
                      className="smInput"
                      placeholder="e.g. S-101"
                      value={shipId}
                      disabled={editMode}
                      onChange={(e) => setShipId(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="smLabel">
                      <span>Ship Name</span>
                      <span style={{ color: "var(--sm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="smInput"
                      placeholder="e.g. Ocean Voyager"
                      value={shipName}
                      onChange={(e) => setShipName(e.target.value)}
                    />
                  </div>

                  <div className="smRow">
                    <div>
                      <div className="smLabel">
                        <span>Seating Capacity</span>
                        <span style={{ color: "var(--sm-muted)", fontWeight: 900 }}>Required</span>
                      </div>
                      <input
                        className="smInput"
                        placeholder="e.g. 120"
                        value={seatingCapacity}
                        onChange={(e) => setSeatingCapacity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="smRow">
                    <div>
                      <div className="smLabel">
                        <span>Reservation Capacity</span>
                        <span style={{ color: "var(--sm-muted)", fontWeight: 900 }}>Required</span>
                      </div>
                      <input
                        className="smInput"
                        placeholder="e.g. 60"
                        value={reservationCapacity}
                        onChange={(e) => setReservationCapacity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="smLabel">
                      <span>Ship Image</span>
                      <span style={{ color: "var(--sm-muted)", fontWeight: 900 }}>
                        {editMode ? "Optional" : "Required"}
                      </span>
                    </div>
                    <input
                      className="smFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />

                    {selectedFile && (
                      <div className="smPreview" style={{ marginTop: 10 }}>
                        <img src={URL.createObjectURL(selectedFile)} alt="selected ship preview" />
                        <div className="smPreviewText">Preview ready. Submit to save.</div>
                      </div>
                    )}
                  </div>

                  <div className="smActions">
                    {editMode ? (
                      <button className="smBtn" onClick={updateShip} type="button">
                        Save Changes
                      </button>
                    ) : (
                      <button className="smBtn" onClick={addShip} type="button">
                        Add Ship
                      </button>
                    )}

                    <button className="smBtn smBtnSecondary" onClick={clearForm} type="button">
                      Clear
                    </button>
                  </div>
                </>
              ) : (
                <div className="smEmpty">
                  <div aria-hidden="true">🔒</div>
                  <strong>Admin access required</strong>
                  <div style={{ marginTop: 6 }}>You must be an administrator to manage ships.</div>
                </div>
              )}
            </div>
          </div>

          {/* List */}
          <div className="smCard smListCard" aria-label="Ships list">
            <div className="smTableTitle">
              <div>
                <h3>All Ships</h3>
                <p>{listCount} ship{listCount === 1 ? "" : "s"} in inventory</p>
              </div>
            </div>

            {ships.length === 0 ? (
              <div className="smEmpty">
                <div aria-hidden="true" style={{ fontSize: 22 }}>
                  ⛴️
                </div>
                <strong>No Ships Available</strong>
                <div style={{ marginTop: 6 }}>Add a ship to get started.</div>
              </div>
            ) : (
              <table className="smTable" role="table" aria-label="Ship inventory table">
                <thead>
                  <tr>
                    <th style={{ width: 110 }}>Ship ID</th>
                    <th>Ship Name</th>
                    <th style={{ width: 160 }}>Seating</th>
                    <th style={{ width: 190 }}>Reservation</th>
                    <th style={{ width: 120 }}>Image</th>
                    {userType === "A" && <th style={{ width: 170 }}>Actions</th>}
                  </tr>
                </thead>

                <tbody>
                  {ships.map((s) => (
                    <tr key={s.shipId} className="smRowHover">
                      <td data-label="Ship ID">{s.shipId}</td>
                      <td data-label="Ship Name">{s.shipName}</td>
                      <td data-label="Seating">{s.seatingCapacity}</td>
                      <td data-label="Reservation">{s.reservationCapacity}</td>
                      <td data-label="Image">
                        <img className="smShipThumb" src={s.imageUrl} alt={`ship ${s.shipName}`} />
                      </td>
                      {userType === "A" && (
                        <td data-label="Actions">
                          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
                            <button
                              type="button"
                              className="smBtn smBtnSecondary"
                              style={{ minWidth: 120, padding: "10px 12px" }}
                              onClick={() => editShip(s)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="smDeleteBtn"
                              onClick={() => deleteShip(s.shipId)}
                              aria-label={`Delete ship ${s.shipName}`}
                            >
                              <span className="smDeleteIcon" aria-hidden="true">
                                🗑️
                              </span>
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


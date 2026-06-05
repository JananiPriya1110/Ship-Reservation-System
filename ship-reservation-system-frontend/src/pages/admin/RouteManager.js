import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./RouteManager.css";

const API = "http://localhost:8080/route";

export default function RouteManager() {
  const [routes, setRoutes] = useState([]);

  const [routeId, setRouteId] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [travelDuration, setTravelDuration] = useState("");

  const userType = localStorage.getItem("userType") || "U";
  const username = localStorage.getItem("userID") || "Admin";

  // update mode (kept for compatibility with existing page behavior)
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setRoutes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD ROUTE
  const addRoute = async () => {
    if (!routeId || !source || !destination || !distance || !travelDuration) {
      alert("Fill all required fields");
      return;
    }

    try {
      // backend currently expects: routeId, source, destination, travelDuration, fare
      // We map "distance" to "fare" only if your backend uses that; otherwise keep fare separate.
      // To avoid breaking existing backend, we keep the old key name expected by the backend: fare.
      const res = await axios.post(`${API}/add?userType=${userType}`, {
        routeId,
        source,
        destination,
        travelDuration,
        fare: parseFloat(distance)
      });

      alert(res.data);
      fetchRoutes();
      clearForm();
    } catch (err) {
      console.error(err);
      alert("Error adding route");
    }
  };

  // ✅ UPDATE ROUTE (uses same backend contract as before)
  const updateRoute = async () => {
    if (!editingId) {
      alert("Select route to update");
      return;
    }

    try {
      const res = await axios.put(`${API}/update/${editingId}?userType=${userType}`, {
        routeId: editingId,
        source,
        destination,
        travelDuration,
        fare: parseFloat(distance)
      });

      alert(res.data);
      fetchRoutes();
      clearForm();
    } catch (err) {
      console.error(err);
      alert("Error updating route");
    }
  };

  // ✅ DELETE ROUTE
  const deleteRoute = async (id) => {
    try {
      const res = await axios.delete(`${API}/delete/${id}?userType=${userType}`);
      alert(res.data);
      fetchRoutes();
    } catch (err) {
      console.error(err);
      alert("Server error while deleting");
    }
  };

  const editRoute = (r) => {
    setEditMode(true);
    setEditingId(r.routeId);

    setRouteId(r.routeId);
    setSource(r.source);
    setDestination(r.destination);
    setTravelDuration(r.travelDuration);

    // backend uses r.fare; we map it back into "distance" field for UI.
    setDistance(r.fare ?? "");
  };

  const clearForm = () => {
    setEditMode(false);
    setEditingId("");

    setRouteId("");
    setSource("");
    setDestination("");
    setDistance("");
    setTravelDuration("");
  };

  const listCount = useMemo(() => routes?.length || 0, [routes]);

  return (
    <div className="rmPage">
      <div className="rmWrap">
        <div className="rmTopBar" role="banner" aria-label="Route manager top bar">
          <div className="rmTopLeft">
            <div className="rmLogo" aria-hidden="true">
              🗺️
            </div>
            <div className="rmTopMeta">
              <h1>Ship Reservation System</h1>
              <p>Admin • Route management</p>
            </div>
          </div>

          <div className="rmTopRight">
            <div className="rmProfile" aria-label="Admin profile">
              <div className="rmProfileIcon" aria-hidden="true">
                👤
              </div>
              <div className="rmProfileMeta">
                <span>{username}</span>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </div>

        <section className="rmHero" aria-label="Route manager hero">
          <div className="rmKicker">✨ Route Manager</div>
          <h2>Manage routes professionally</h2>
          <p>
            Add routes, maintain distance and travel duration, and remove routes when they’re no
            longer needed.
          </p>
        </section>

        <div className="rmGrid">
          {/* Form */}
          <div className="rmCard rmFormCard" aria-label="Add or update route form">
            <div className="rmCardHeader">
              <h3>{editMode ? "Update Route" : "Add Route"}</h3>
              <p>Rounded inputs, focus glow, and modern admin styling for faster operations.</p>
            </div>

            <div className="rmForm">
              {userType === "A" ? (
                <>
                  <div>
                    <div className="rmLabel">
                      <span>Route ID</span>
                      {editMode && (
                        <span style={{ color: "var(--rm-muted)", fontWeight: 900 }}>Locked</span>
                      )}
                    </div>
                    <input
                      className="rmInput"
                      placeholder="e.g. R-101"
                      value={routeId}
                      disabled={editMode}
                      onChange={(e) => setRouteId(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="rmLabel">
                      <span>Source</span>
                      <span style={{ color: "var(--rm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="rmInput"
                      placeholder="e.g. Port A"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="rmLabel">
                      <span>Destination</span>
                      <span style={{ color: "var(--rm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="rmInput"
                      placeholder="e.g. Port B"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="rmLabel">
                      <span>Distance</span>
                      <span style={{ color: "var(--rm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="rmInput"
                      placeholder="e.g. 250"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="rmLabel">
                      <span>Travel Duration</span>
                      <span style={{ color: "var(--rm-muted)", fontWeight: 900 }}>Required</span>
                    </div>
                    <input
                      className="rmInput"
                      placeholder="e.g. 6 hours"
                      value={travelDuration}
                      onChange={(e) => setTravelDuration(e.target.value)}
                    />
                  </div>

                  <div className="rmActions">
                    {editMode ? (
                      <button className="rmBtn" onClick={updateRoute} type="button">
                        Save Changes
                      </button>
                    ) : (
                      <button className="rmBtn" onClick={addRoute} type="button">
                        Add Route
                      </button>
                    )}

                    <button className="rmBtn rmBtnSecondary" onClick={clearForm} type="button">
                      Clear
                    </button>
                  </div>
                </>
              ) : (
                <div className="rmEmpty">
                  <div aria-hidden="true">🔒</div>
                  <strong>Admin access required</strong>
                  <div style={{ marginTop: 6 }}>You must be an administrator to manage routes.</div>
                </div>
              )}
            </div>
          </div>

          {/* List */}
          <div className="rmCard rmListCard" aria-label="Routes list">
            <div className="rmTableTitle">
              <div>
                <h3>All Routes</h3>
                <p>
                  {listCount} route{listCount === 1 ? "" : "s"} available
                </p>
              </div>
            </div>

            {routes.length === 0 ? (
              <div className="rmEmpty">
                <div aria-hidden="true" style={{ fontSize: 22 }}>
                  🛤️
                </div>
                <strong>No Routes Available</strong>
                <div style={{ marginTop: 6 }}>Add a route to get started.</div>
              </div>
            ) : (
              <table className="rmTable" aria-label="Route inventory table">
                <thead>
                  <tr>
                    <th style={{ width: 120 }}>Route ID</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th style={{ width: 160 }}>Distance</th>
                    <th style={{ width: 200 }}>Travel Duration</th>
                    {userType === "A" && <th style={{ width: 170 }}>Delete</th>}
                  </tr>
                </thead>

                <tbody>
                  {routes.map((r) => (
                    <tr key={r.routeId} className="rmRowHover">
                      <td data-label="Route ID">{r.routeId}</td>
                      <td data-label="Source">{r.source}</td>
                      <td data-label="Destination">{r.destination}</td>
                      <td data-label="Distance">{r.fare}</td>
                      <td data-label="Travel Duration">{r.travelDuration}</td>

                      {userType === "A" && (
                        <td data-label="Delete">
                          <button
                            type="button"
                            className="rmDeleteBtn"
                            onClick={() => deleteRoute(r.routeId)}
                            aria-label={`Delete route ${r.routeId}`}
                          >
                            <span className="rmDeleteIcon" aria-hidden="true">
                              🗑️
                            </span>
                            Delete
                          </button>
                          {/* keep edit capability for existing workflows */}
                          <div style={{ height: 8 }} />
                          <button
                            type="button"
                            className="rmBtn rmBtnSecondary"
                            onClick={() => editRoute(r)}
                            style={{ minWidth: 130, padding: "10px 12px" }}
                          >
                            Edit
                          </button>
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


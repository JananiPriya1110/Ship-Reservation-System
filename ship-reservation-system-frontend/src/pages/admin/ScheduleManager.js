import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./ScheduleManager.css";

const API = "http://localhost:8080/schedule";

export default function ScheduleManager() {

  const [schedules, setSchedules] = useState([]);

  // form fields
  const [scheduleId, setScheduleId] = useState("");
  const [shipId, setShipId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [startDate, setStartDate] = useState("");

  // admin
  const userType = localStorage.getItem("userType") || "U";
  const username = localStorage.getItem("userID") || "Admin";

  // edit mode
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  // FETCH
  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setSchedules(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const listCount = useMemo(
    () => schedules?.length || 0,
    [schedules]
  );

  // RESET
  const resetForm = () => {
    setScheduleId("");
    setShipId("");
    setRouteId("");
    setStartDate("");
    setEditMode(false);
  };

  // LOAD FOR EDIT
  const loadFromSchedule = (s) => {
    setScheduleId(s.scheduleId || "");
    setShipId(s.shipId || "");
    setRouteId(s.routeId || "");
    setStartDate(s.startDate || "");
    setEditMode(true);
  };

  // ADD
  const addSchedule = async () => {

    if (!scheduleId || !shipId || !routeId || !startDate) {
      alert("Fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        `${API}/add?userType=${userType}`,
        {
          scheduleId,
          shipId,
          routeId,
          startDate
        }
      );

      alert(res.data);

      fetchSchedules();
      resetForm();

    } catch (err) {
      console.error(err);
      alert("Error adding schedule");
    }
  };

  // UPDATE
  const updateSchedule = async () => {

    try {

      const res = await axios.put(
        `${API}/update/${scheduleId}?userType=${userType}`,
        {
          scheduleId,
          shipId,
          routeId,
          startDate
        }
      );

      alert(res.data);

      fetchSchedules();
      resetForm();

    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  // DELETE
  const deleteSchedule = async (id) => {

    try {

      const res = await axios.delete(
        `${API}/delete/${id}?userType=${userType}`
      );

      alert(res.data);

      fetchSchedules();

      if (editMode && scheduleId === id) {
        resetForm();
      }

    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="scPage">

      <div className="scWrap">

        {/* TOP BAR */}
        <div className="scTopBar">

          <div className="scTopLeft">

            <div className="scLogo">
              🗓️
            </div>

            <div className="scTopMeta">
              <h1>Ship Reservation System</h1>
              <p>Admin • Schedule Management</p>
            </div>

          </div>

          <div className="scTopRight">

            <div className="scProfile">

              <div className="scProfileIcon">
                👤
              </div>

              <div className="scProfileMeta">
                <span>{username}</span>
                <span>Administrator</span>
              </div>

            </div>

          </div>

        </div>

        {/* HERO */}
        <section className="scHero">

          <div className="scKicker">
            ✨ Schedule Manager
          </div>

          <h2>Manage Ship Schedules</h2>

        </section>

        <div className="scGrid">

          {/* FORM */}
          <div className="scCard scFormCard">

            <div className="scCardHeader">
              <h3>
                {editMode
                  ? "Update Schedule"
                  : "Add Schedule"}
              </h3>
            </div>

            <div className="scForm">

              {userType === "A" ? (
                <>

                  {/* Schedule ID */}
                  <input
                    className="scInput"
                    placeholder="Schedule ID"
                    value={scheduleId}
                    disabled={editMode}
                    onChange={(e) =>
                      setScheduleId(e.target.value)
                    }
                  />

                  {/* Ship ID */}
                  <input
                    className="scInput"
                    placeholder="Ship ID"
                    value={shipId}
                    onChange={(e) =>
                      setShipId(e.target.value)
                    }
                  />

                  {/* Route ID */}
                  <input
                    className="scInput"
                    placeholder="Route ID"
                    value={routeId}
                    onChange={(e) =>
                      setRouteId(e.target.value)
                    }
                  />

                  {/* Start Date */}
                  <input
                    className="scInput"
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(e.target.value)
                    }
                  />

                  <div className="scActions">

                    {editMode ? (

                      <button
                        className="scBtn"
                        onClick={updateSchedule}
                      >
                        Update
                      </button>

                    ) : (

                      <button
                        className="scBtn"
                        onClick={addSchedule}
                      >
                        Add
                      </button>

                    )}

                    <button
                      className="scBtn scBtnSecondary"
                      onClick={resetForm}
                    >
                      Clear
                    </button>

                  </div>

                </>
              ) : (
                <div className="scEmpty">
                  Admin access required
                </div>
              )}

            </div>
          </div>

          {/* TABLE */}
          <div className="scCard scListCard">

            <div className="scTableTitle">

              <div>
                <h3>All Schedules</h3>

                <p>
                  {listCount} schedules
                </p>
              </div>

            </div>

            {schedules.length === 0 ? (

              <div className="scEmpty">
                No schedules available
              </div>

            ) : (

              <table className="scTable">

                <thead>
                  <tr>
                    <th>Schedule ID</th>
                    <th>Ship ID</th>
                    <th>Route ID</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {schedules.map((s) => (

                    <tr key={s.scheduleId}>

                      <td>{s.scheduleId}</td>
                      <td>{s.shipId}</td>
                      <td>{s.routeId}</td>
                      <td>{s.startDate}</td>

                      <td>

                        <button
                          className="scBtn scBtnSecondary"
                          style={{ marginRight: "10px" }}
                          onClick={() =>
                            loadFromSchedule(s)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="scDeleteBtn"
                          onClick={() =>
                            deleteSchedule(s.scheduleId)
                          }
                        >
                          Delete
                        </button>

                      </td>

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
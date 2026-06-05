import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const userType = localStorage.getItem("userType");

  // Security check + auto redirect
  useEffect(() => {
    if (userType !== "A") {
      navigate("/");
    }
  }, [userType, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const username = localStorage.getItem("userID") || "Admin";

  return (
    <div className="adminDash">
      <div className="adminDash__wrap">
        <div className="adminDashTop" role="banner" aria-label="Admin dashboard top bar">
          <div className="adminDashTop__left">
            <div className="adminDashTop__logo" aria-hidden="true">
              ⚓
            </div>

            <div className="adminDashTop__title">
              <h1>Ship Reservation System</h1>
              <p>Admin Portal • Ocean Travel Operations</p>
            </div>
          </div>

          <div className="adminDashTop__right">
            <div className="adminDashProfile" aria-label="Admin profile">
              <div className="adminDashProfile__icon" aria-hidden="true">
                👤
              </div>
              <div className="adminDashProfile__meta">
                <span>{username}</span>
                <span>Administrator</span>
              </div>
            </div>

            <button className="adminDashBtn" onClick={logout} type="button">
              🔴 Logout
            </button>
          </div>
        </div>

        <section className="adminDashHero" aria-label="Welcome section">
          <div className="adminDashHero__kicker">✨ Welcome back</div>
          <h2>Manage your ship operations with confidence</h2>
          <p>
            Update ships, routes, schedules, and passengers from one modern admin console. Smooth
            access, responsive layout, and production-style animations.
          </p>
        </section>

        <section className="adminDashGrid" aria-label="Admin dashboard cards">
          <div
            className="adminDashCard"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/admin/ships")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/ships")}
            aria-label="Open Ship Manager"
          >
            <div className="adminDashCard__content">
              <div className="adminDashCard__icon adminDashCard__icon--ship" aria-hidden="true">
                🚢
              </div>
              <div className="adminDashCard__text">
                <h3>Ship Manager</h3>
                <p>Maintain fleets, seating, and reservation capacity.</p>
                <div className="adminDashCard__cta">Open →</div>
              </div>
            </div>
          </div>

          <div
            className="adminDashCard"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/admin/routes")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/routes")}
            aria-label="Open Route Manager"
          >
            <div className="adminDashCard__content">
              <div className="adminDashCard__icon adminDashCard__icon--route" aria-hidden="true">
                🗺️
              </div>
              <div className="adminDashCard__text">
                <h3>Route Manager</h3>
                <p>Define travel paths and keep routes organized.</p>
                <div className="adminDashCard__cta">Open →</div>
              </div>
            </div>
          </div>

          <div
            className="adminDashCard"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/admin/schedules")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/schedules")}
            aria-label="Open Schedule Manager"
          >
            <div className="adminDashCard__content">
              <div className="adminDashCard__icon adminDashCard__icon--schedule" aria-hidden="true">
                📅
              </div>
              <div className="adminDashCard__text">
                <h3>Schedule Manager</h3>
                <p>Create and control sailing timelines.</p>
                <div className="adminDashCard__cta">Open →</div>
              </div>
            </div>
          </div>

          <div
            className="adminDashCard"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/admin/passengers")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/passengers")}
            aria-label="Open Passenger Manager"
          >
            <div className="adminDashCard__content">
              <div className="adminDashCard__icon adminDashCard__icon--passengers" aria-hidden="true">
                👥
              </div>
              <div className="adminDashCard__text">
                <h3>Passenger Manager</h3>
                <p>Review reservations and manage passenger records.</p>
                <div className="adminDashCard__cta">Open →</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


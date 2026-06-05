import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

export default function Home() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-hero">
          <div>
            <div className="home-badge">
              <span className="home-badge__pulse" />
              CaptainBook
            </div>
            <h1 className="home-title">Book smarter. Travel smoother.</h1>
            <p className="home-subtitle">
              Manage schedules, routes, and reservations with a clean experience for customers and admins.
              Choose your access path below.
            </p>

            <div className="home-ctaRow">
              {!role && (
                <button
                  className="home-btn home-btn--primary"
                  onClick={() => setRole("choose")}
                >
                  Get Started
                </button>
              )}

              {role === "choose" && (
                <>
                  <button
                    className="home-btn home-btn--primary"
                    onClick={() => setRole("USER")}
                  >
                    Customer
                  </button>
                  <button
                    className="home-btn"
                    onClick={() => setRole("ADMIN")}
                  >
                    Admin
                  </button>
                </>
              )}

              {role === "USER" && (
                <>
                  <button
                    className="home-btn home-btn--primary"
                    onClick={() => navigate("/user/login")}
                  >
                    Customer Login
                  </button>
                  <button className="home-btn" onClick={() => navigate("/user/register")}
                  >
                    Customer Register
                  </button>
                </>
              )}

              {role === "ADMIN" && (
                <>
                  <button
                    className="home-btn home-btn--primary"
                    onClick={() => navigate("/admin/login")}
                  >
                    Admin Login
                  </button>
                  <button
                    className="home-btn"
                    onClick={() => navigate("/admin/register")}
                  >
                    Admin Register
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="home-panel">
            <h3 className="home-panel__title">How it works</h3>
            <div className="home-steps">
              <div className="home-step">
                <div className="home-step__num">1</div>
                <div className="home-step__body">
                  <div className="home-step__label">Choose role</div>
                  <div className="home-step__text">Customer for bookings, Admin for management.</div>
                </div>
              </div>
              <div className="home-step">
                <div className="home-step__num">2</div>
                <div className="home-step__body">
                  <div className="home-step__label">Login/Register</div>
                  <div className="home-step__text">Go to the appropriate portal in one click.</div>
                </div>
              </div>
              <div className="home-step">
                <div className="home-step__num">3</div>
                <div className="home-step__body">
                  <div className="home-step__label">Start using</div>
                  <div className="home-step__text">Ships, schedules, routes, and passengers—ready.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-foot">
          <span>Tip: Use the admin dashboard to manage core data.</span>
          <span className="home-kbd">Secure • Fast • Clean UI</span>
        </div>
      </div>
    </div>
  );
}

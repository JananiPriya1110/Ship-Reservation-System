import React from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";
import "./UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  const name = localStorage.getItem("userID") || "Traveler";

  const features = [
    {
      title: "View Ships",
      desc: "Explore all available ships",
      path: "/user/view-ships",
      icon: "💠"
    },
    {
      title: "View Schedule",
      desc: "Check ship schedules",
      path: "/user/view-schedule",
      icon: "🗓️"
    },
    {
      title: "Book Ticket",
      desc: "Reserve your seat",
      path: "/user/book",
      icon: "🎟️"
    },
    {
      title: "My Bookings",
      desc: "View your upcoming and past trips",
      path: "/user/my-bookings",
      icon: "📖"
    }
  ];

  // Demo content (replace with API later)
  const recentActivity = [
    {
      icon: "✅",
      title: "Payment scheduled",
      text: "Your recent payment request is ready to complete.",
      time: "2h ago"
    },
    {
      icon: "🧾",
      title: "Ticket confirmed",
      text: "Reservation received for your selected schedule.",
      time: "Yesterday"
    },
    {
      icon: "🔔",
      title: "Schedule updated",
      text: "New timing info is available for your trip.",
      time: "3 days ago"
    }
  ];

  const upcomingBookings = [
    {
      reservationId: "RSV-10291",
      scheduleId: "SCH-48",
      journeyDate: "2026-06-02",
      seats: 2,
      fare: 2400,
      status: "UPCOMING",
      payment: "CONFIRMED"
    },
    {
      reservationId: "RSV-10312",
      scheduleId: "SCH-53",
      journeyDate: "2026-06-16",
      seats: 1,
      fare: 1200,
      status: "UPCOMING",
      payment: "PENDING"
    },
    {
      reservationId: "RSV-10344",
      scheduleId: "SCH-57",
      journeyDate: "2026-07-01",
      seats: 3,
      fare: 3600,
      status: "UPCOMING",
      payment: "CONFIRMED"
    }
  ];

  return (
    <div className="userDashboard">
      <UserNavbar />

      <div className="userDashboard__container">
        {/* Hero banner */}
        <section className="hero fadeInUp" aria-label="Dashboard hero">
          <div className="hero__inner">
            <div>
              <div className="hero__kicker">
                <span className="hero__kickerDot" aria-hidden="true" />
                <span className="hero__kickerText">Customer Dashboard</span>
              </div>

              <h1 className="hero__title">Welcome, {name} 🌊</h1>
              <p className="hero__subtitle">
                Manage your bookings, track schedule updates, and book new journeys—right from
                your personal dashboard.
              </p>
            </div>

            <aside className="hero__meta" aria-label="Quick stats">
              <div className="hero__metaRow">
                <div className="hero__metaLabel">Upcoming</div>
                <div className="hero__metaValue">{upcomingBookings.length}</div>
              </div>
              <div className="hero__metaRow">
                <div className="hero__metaLabel">Recent Activity</div>
                <div className="hero__metaValue">{recentActivity.length}</div>
              </div>
              <div className="hero__metaRow">
                <div className="hero__metaLabel">Account</div>
                <div className="hero__metaValue">Active</div>
              </div>
            </aside>
          </div>
        </section>

        {/* Quick actions */}
        <section className="section fadeInUp fadeInUp--1" aria-label="Dashboard actions">
          <div className="section__header">
            <div>
              <h2 className="section__title">Quick Actions</h2>
              <p className="section__subtitle">Everything you need—at a glance.</p>
            </div>
          </div>

          <div className="cards">
            {features.map((f, idx) => (
              <div
                key={f.path}
                className={`card fadeInUp fadeInUp--${Math.min(4, idx + 1)}`}
                role="button"
                tabIndex={0}
                onClick={() => navigate(f.path)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate(f.path);
                }}
                aria-label={`Go to ${f.title}`}
              >
                <div className="card__inner">
                  <div className="card__iconWrap" aria-hidden="true">
                    <span className="card__icon">{f.icon}</span>
                  </div>

                  <div>
                    <h3 className="card__title">{f.title}</h3>
                    <p className="card__desc">{f.desc}</p>
                    <div className="card__cta">
                      Open
                      <span className="card__ctaArrow" aria-hidden="true">
                        ➜
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent activity + upcoming bookings */}
        <section className="section fadeInUp fadeInUp--2" aria-label="Dashboard content">
          <div className="grid2">
            <div className="panel" aria-label="Recent activity">
              <div className="section__header" style={{ marginTop: 0 }}>
                <div>
                  <h2 className="section__title">Recent Activity</h2>
                  <p className="section__subtitle">Latest updates from your account.</p>
                </div>
              </div>

              <ul className="activity">
                {recentActivity.map((a, i) => (
                  <li className="activityItem" key={`${a.title}-${i}`}>
                    <div className="activityDot" aria-hidden="true">
                      {a.icon}
                    </div>
                    <div className="activityMain">
                      <div className="activityTitle">{a.title}</div>
                      <div className="activityText">{a.text}</div>
                    </div>
                    <div className="activityTime">{a.time}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel" aria-label="Upcoming bookings">
              <div className="section__header" style={{ marginTop: 0 }}>
                <div>
                  <h2 className="section__title">Upcoming Bookings</h2>
                  <p className="section__subtitle">Your next reservations and status.</p>
                </div>
              </div>

              <div className="tableWrap">
                <table className="table" aria-label="Upcoming bookings table">
                  <thead>
                    <tr>
                      <th>Reservation</th>
                      <th>Schedule</th>
                      <th>Journey Date</th>
                      <th>Seats</th>
                      <th>Fare</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingBookings.map((b) => (
                      <tr key={b.reservationId}>
                        <td>{b.reservationId}</td>
                        <td>{b.scheduleId}</td>
                        <td>{b.journeyDate}</td>
                        <td>{b.seats}</td>
                        <td>₹ {b.fare}</td>
                        <td>
                          <span className="badge badge--upcoming">{b.status}</span>
                        </td>
                        <td>
                          <span
                            className={`badge ${b.payment === "CONFIRMED" ? "badge--confirmed" : ""}`}
                          >
                            {b.payment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


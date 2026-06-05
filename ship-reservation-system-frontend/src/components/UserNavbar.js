import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./shipNav.css";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const go = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  React.useEffect(() => {
    const update = () => setActivePath(window.location.pathname);
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const navItemClass = (isActive) =>
    `shipbar__btn${isActive ? " shipbar__btn--active" : ""}`;

  return (
    <div className="shipbar" aria-label="User navigation bar">
      <div className="shipbar__inner">
        <div className="shipbar__left">
          <button
            type="button"
            onClick={() => go("/user/dashboard")}
            aria-label="Go to User Dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <div className="shipbar__logo" aria-hidden="true">
              <span>🌊</span>
            </div>
            <div className="shipbar__brand">
              <h2 className="shipbar__title">CaptainBook</h2>
              <div className="shipbar__subtitle">Ocean trips • Tickets & schedules</div>
            </div>
          </button>
        </div>

        <nav className="shipbar__nav" aria-label="User navigation">
          <Link
            className={navItemClass(activePath === "/user/dashboard")}
            to="/user/dashboard"
          >
            🧭 Dashboard
          </Link>
          <Link
            className={navItemClass(activePath === "/user/view-ships")}
            to="/user/view-ships"
          >
            🚢 View Ships
          </Link>
          <Link
            className={navItemClass(activePath === "/user/view-schedule")}
            to="/user/view-schedule"
          >
            📅 View Schedule
          </Link>
          <Link
            className={navItemClass(activePath === "/user/book")}
            to="/user/book"
          >
            🎫 Book Ticket
          </Link>
          <Link
            className={navItemClass(activePath === "/user/my-bookings")}
            to="/user/my-bookings"
          >
            🗂️ My Bookings
          </Link>
          <Link
            className={navItemClass(activePath === "/user/profile")}
            to="/user/profile"
          >
            👤 Profile
          </Link>
        </nav>

        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          aria-label="User actions"
        >
          <button
            type="button"
            className="shipbar__hamburger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>

          <button
            className="shipbar__btn shipbar__btn--danger"
            onClick={logout}
            type="button"
          >
            🔴 Logout
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="shipbar__mobilePanel">
          <div className="shipbar__mobileGrid">
            <Link
              className={navItemClass(activePath === "/user/dashboard")}
              to="/user/dashboard"
              onClick={() => setMobileOpen(false)}
            >
              🧭 Dashboard
            </Link>
            <Link
              className={navItemClass(activePath === "/user/view-ships")}
              to="/user/view-ships"
              onClick={() => setMobileOpen(false)}
            >
              🚢 View Ships
            </Link>
            <Link
              className={navItemClass(activePath === "/user/view-schedule")}
              to="/user/view-schedule"
              onClick={() => setMobileOpen(false)}
            >
              📅 View Schedule
            </Link>
            <Link
              className={navItemClass(activePath === "/user/book")}
              to="/user/book"
              onClick={() => setMobileOpen(false)}
            >
              🎫 Book Ticket
            </Link>
            <Link
              className={navItemClass(activePath === "/user/my-bookings")}
              to="/user/my-bookings"
              onClick={() => setMobileOpen(false)}
            >
              🗂️ My Bookings
            </Link>
            <Link
              className={navItemClass(activePath === "/user/profile")}
              to="/user/profile"
              onClick={() => setMobileOpen(false)}
            >
              👤 Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


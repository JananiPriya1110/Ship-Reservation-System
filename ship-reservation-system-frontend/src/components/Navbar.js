import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./shipNav.css";

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const go = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const navItemClass = (isActive) =>
    `shipbar__btn${isActive ? " shipbar__btn--active" : ""}`;

  const [activePath, setActivePath] = React.useState("");

  React.useEffect(() => {
    const update = () => setActivePath(window.location.pathname);
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return (
    <div className="shipbar" aria-label="Admin navigation bar">
      <div className="shipbar__inner">
        <div className="shipbar__left">
          <button
            type="button"
            onClick={() => go("/admin/dashboard")}
            aria-label="Go to Admin Dashboard"
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
              <span>⚓</span>
            </div>
            <div className="shipbar__brand">
              <h2 className="shipbar__title">OceanAdmin</h2>
              <div className="shipbar__subtitle">Travel Ops Control</div>
            </div>
          </button>
        </div>

        <nav className="shipbar__nav" aria-label="Admin navigation">
          <Link
            className={navItemClass(activePath === "/admin/dashboard")}
            to="/admin/dashboard"
          >
            🧭 Dashboard
          </Link>
          <Link
            className={navItemClass(activePath === "/admin/ships")}
            to="/admin/ships"
          >
            🚢 Manage Ships
          </Link>
          <Link
            className={navItemClass(activePath === "/admin/routes")}
            to="/admin/routes"
          >
            🗺️ Manage Routes
          </Link>
          <Link
            className={navItemClass(activePath === "/admin/schedules")}
            to="/admin/schedules"
          >
            📅 Manage Schedules
          </Link>
          <Link
            className={navItemClass(activePath === "/admin/passengers")}
            to="/admin/passengers"
          >
            🎟️ View Reservations
          </Link>
        </nav>

        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          aria-label="Admin actions"
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
            onClick={handleLogout}
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
              className={navItemClass(activePath === "/admin/dashboard")}
              to="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
            >
              🧭 Dashboard
            </Link>
            <Link
              className={navItemClass(activePath === "/admin/ships")}
              to="/admin/ships"
              onClick={() => setMobileOpen(false)}
            >
              🚢 Manage Ships
            </Link>
            <Link
              className={navItemClass(activePath === "/admin/routes")}
              to="/admin/routes"
              onClick={() => setMobileOpen(false)}
            >
              🗺️ Manage Routes
            </Link>
            <Link
              className={navItemClass(activePath === "/admin/schedules")}
              to="/admin/schedules"
              onClick={() => setMobileOpen(false)}
            >
              📅 Manage Schedules
            </Link>
            <Link
              className={navItemClass(activePath === "/admin/passengers")}
              to="/admin/passengers"
              onClick={() => setMobileOpen(false)}
            >
              🎟️ View Reservations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;






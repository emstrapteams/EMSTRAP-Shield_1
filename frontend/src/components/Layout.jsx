import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">🛡️</span>
          <div>
            <div className="brand-title">EMSTRAP Shield</div>
            <div className="brand-sub">Phase 1</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>

          <NavLink to="/departments" className={linkClass}>
            Departments
          </NavLink>

          <NavLink to="/facilities" className={linkClass}>
            Facilities
          </NavLink>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
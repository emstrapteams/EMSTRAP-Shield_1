import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <div className="app-shell">
      <aside className="sidebar">

        <div className="brand">
          <img
            src="/logo.png"
            alt="EMSTRAP"
            className="brand-logo"
          />

          <div>
            <div className="brand-title">EMSTRAP Shield</div>
            <div className="brand-sub">Phase 1 + Safety Management</div>
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

          <NavLink to="/equipment" className={linkClass}>
            Safety Equipment
          </NavLink>

          <NavLink to="/fire-extinguishers" className={linkClass}>
            Fire Extinguishers
          </NavLink>

          <NavLink to="/first-aid-kits" className={linkClass}>
            First-Aid Kits
          </NavLink>

          <NavLink to="/inspections" className={linkClass}>
            Inspections
          </NavLink>

          <NavLink to="/corrective-actions" className={linkClass}>
            Corrective Actions
          </NavLink>
        </nav>

      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
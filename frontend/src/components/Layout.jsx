import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <div className="app-shell">
      <aside className="sidebar">

{/* Brand */}
<div className="brand">
  <div className="brand-logo-card">
    <img
      src="/logo.png"
      alt="EMSTRAP"
      className="brand-logo"
    />
  </div>

  <div className="brand-text">
    <div className="brand-title">EMSTRAP Shield</div>
    <div className="brand-subtitle">
    </div>
  </div>
</div>

        {/* Navigation */}
        <nav className="nav">

          <div className="nav-section-title">MAIN MENU</div>

          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>

          <NavLink to="/departments" className={linkClass}>
            Departments
          </NavLink>

          <NavLink to="/facilities" className={linkClass}>
            Facilities
          </NavLink>


          <div className="nav-section-title">SAFETY MANAGEMENT</div>

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


          <div className="nav-section-title">TRAINING & EMERGENCY</div>

          <NavLink to="/emergency-resources" className={linkClass}>
            Emergency Resources
          </NavLink>

          <NavLink to="/training-dashboard" className={linkClass}>
            Training Dashboard
          </NavLink>

          <NavLink to="/training-programs" className={linkClass}>
            Training Programs
          </NavLink>

          <NavLink to="/training-sessions" className={linkClass}>
            Training Sessions
          </NavLink>

          <NavLink to="/drills" className={linkClass}>
            Emergency Drills
          </NavLink>


          <div className="nav-section-title">ADMINISTRATION</div>

          <NavLink to="/reports" className={linkClass}>
            Reports
          </NavLink>

          <NavLink to="/companies" className={linkClass}>
            Companies
          </NavLink>

          <NavLink to="/audit-logs" className={linkClass}>
            Audit Logs
          </NavLink>

        </nav>

        {/* Sidebar User */}
        <div className="sidebar-user">
          <div className="user-avatar">S</div>

          <div className="user-info">
            <div className="user-name">Shield Admin</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>

      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
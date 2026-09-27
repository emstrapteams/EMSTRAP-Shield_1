import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

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
          <NavLink to="/employees" className={linkClass}>Employees</NavLink>
          <NavLink to="/departments" className={linkClass}>Departments</NavLink>
          <NavLink to="/facilities" className={linkClass}>Facilities</NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{(user?.name || "?").charAt(0)}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role?.replace("_", " ")}</div>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

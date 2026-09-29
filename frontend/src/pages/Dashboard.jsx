import React, { useEffect, useState, useCallback } from "react";
import { api } from "../api/client";

function StatCard({ number, label, tone }) {
  return (
    <div className={"stat-card" + (tone ? " stat-" + tone : "")}>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [facility, setFacility] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/dashboard/overview", { facility });
      setData(data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, [facility]);

  useEffect(() => {
    api.get("/facilities", { limit: 100 }).then(({ data }) => setFacilities(data)).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Company Admin Dashboard</h1>
          <p className="page-sub">All figures come from backend aggregation APIs — nothing hardcoded.</p>
        </div>
      </div>

      <div className="toolbar">
        <select className="input" value={facility} onChange={(e) => setFacility(e.target.value)}>
          <option value="">All facilities</option>
          {facilities.map((f) => <option key={f._id} value={f._id}>{f.name}</option>)}
        </select>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="loading-state">Loading dashboard…</div>
      ) : data ? (
        <>
          <h3 className="section-title">Workforce &amp; Facilities</h3>
          <div className="stat-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            <StatCard number={data.employees.total} label="Total Employees" />
            <StatCard number={data.employees.active} label="Active Employees" />
            <StatCard number={data.facilities.total} label="Total Facilities" />
            <StatCard number={data.facilities.active} label="Active Facilities" />
          </div>

          <h3 className="section-title">Safety Equipment</h3>
          <div className="stat-grid">
            <StatCard number={data.equipment.byStatus.active} label="Active" />
            <StatCard number={data.equipment.byStatus.inspection_due} label="Inspection Due" tone="warn" />
            <StatCard number={data.equipment.byStatus.overdue} label="Overdue" tone="danger" />
            <StatCard number={data.equipment.byStatus.replacement_required} label="Replacement Req." tone="danger" />
            <StatCard number={data.equipment.inspectionsDueNext7Days} label="Due Next 7 Days" tone="warn" />
          </div>

          <h3 className="section-title">Inspections (Last 30 Days)</h3>
          <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <StatCard number={data.inspections.last30Days.passed} label="Passed" />
            <StatCard number={data.inspections.last30Days.failed} label="Failed" tone="danger" />
            <StatCard number={data.inspections.last30Days.needs_attention} label="Needs Attention" tone="warn" />
          </div>

          <h3 className="section-title">Corrective Actions</h3>
          <div className="stat-grid">
            <StatCard number={data.correctiveActions.byStatus.pending} label="Pending" />
            <StatCard number={data.correctiveActions.byStatus.in_progress} label="In Progress" tone="warn" />
            <StatCard number={data.correctiveActions.byStatus.completed} label="Completed" />
            <StatCard number={data.correctiveActions.byStatus.overdue} label="Overdue" tone="danger" />
            <StatCard number={data.correctiveActions.byStatus.verified} label="Verified" />
          </div>

          <h3 className="section-title">Training</h3>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--primary-dark)" }}>{data.training.completionPercentage}%</div>
              <div style={{ flex: 1, height: 10, background: "var(--primary-light)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${data.training.completionPercentage}%`, height: "100%", background: "var(--primary)" }} />
              </div>
              <div className="page-sub">Upcoming sessions: {data.training.upcomingSessions}</div>
            </div>
          </div>

          <h3 className="section-title">Emergency Drills</h3>
          <div className="stat-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <StatCard number={data.drills.upcomingNext90Days} label="Upcoming (90 days)" />
            <StatCard number={data.drills.openIssues} label="Open Issues" tone="warn" />
          </div>
        </>
      ) : null}
    </div>
  );
}

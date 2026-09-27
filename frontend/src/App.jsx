import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeDetail from "./pages/EmployeeDetail";
import Departments from "./pages/Departments";
import DepartmentForm from "./pages/DepartmentForm";
import DepartmentDetail from "./pages/DepartmentDetail";
import Facilities from "./pages/Facilities";
import FacilityForm from "./pages/FacilityForm";
import FacilityDetail from "./pages/FacilityDetail";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-state full-screen">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/employees" replace />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm />} />

        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/new" element={<DepartmentForm />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />
        <Route path="/departments/:id/edit" element={<DepartmentForm />} />

        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facilities/new" element={<FacilityForm />} />
        <Route path="/facilities/:id" element={<FacilityDetail />} />
        <Route path="/facilities/:id/edit" element={<FacilityForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

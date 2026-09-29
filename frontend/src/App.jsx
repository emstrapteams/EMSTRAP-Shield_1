import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeDetail from "./pages/EmployeeDetail";
import Departments from "./pages/Departments";
import DepartmentForm from "./pages/DepartmentForm";
import DepartmentDetail from "./pages/DepartmentDetail";
import Facilities from "./pages/Facilities";
import FacilityForm from "./pages/FacilityForm";
import FacilityDetail from "./pages/FacilityDetail";
import Equipment from "./pages/Equipment";
import EquipmentForm from "./pages/EquipmentForm";
import EquipmentDetail from "./pages/EquipmentDetail";
import FireExtinguishers from "./pages/FireExtinguishers";
import FireExtinguisherForm from "./pages/FireExtinguisherForm";
import FireExtinguisherDetail from "./pages/FireExtinguisherDetail";
import FirstAidKits from "./pages/FirstAidKits";
import FirstAidKitForm from "./pages/FirstAidKitForm";
import FirstAidKitDetail from "./pages/FirstAidKitDetail";
import Inspections from "./pages/Inspections";
import InspectionForm from "./pages/InspectionForm";
import InspectionDetail from "./pages/InspectionDetail";
import CorrectiveActions from "./pages/CorrectiveActions";
import CorrectiveActionForm from "./pages/CorrectiveActionForm";
import CorrectiveActionDetail from "./pages/CorrectiveActionDetail";
import EmergencyResources from "./pages/EmergencyResources";
import EmergencyResourceForm from "./pages/EmergencyResourceForm";
import EmergencyResourceDetail from "./pages/EmergencyResourceDetail";
import TrainingDashboard from "./pages/TrainingDashboard";
import TrainingPrograms from "./pages/TrainingPrograms";
import TrainingProgramForm from "./pages/TrainingProgramForm";
import TrainingProgramDetail from "./pages/TrainingProgramDetail";
import TrainingSessions from "./pages/TrainingSessions";
import TrainingSessionForm from "./pages/TrainingSessionForm";
import TrainingSessionDetail from "./pages/TrainingSessionDetail";
import Drills from "./pages/Drills";
import DrillForm from "./pages/DrillForm";
import DrillDetail from "./pages/DrillDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
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
	<Route path="/equipment" element={<Equipment />} />
	<Route path="/equipment/new" element={<EquipmentForm />} />
	<Route path="/equipment/:id" element={<EquipmentDetail />} />
	<Route path="/equipment/:id/edit" element={<EquipmentForm />} />

	<Route path="/fire-extinguishers" element={<FireExtinguishers />} />
	<Route path="/fire-extinguishers/new" element={<FireExtinguisherForm />} />
	<Route path="/fire-extinguishers/:id" element={<FireExtinguisherDetail />} />
	<Route path="/fire-extinguishers/:id/edit" element={<FireExtinguisherForm />} />

	<Route path="/first-aid-kits" element={<FirstAidKits />} />
	<Route path="/first-aid-kits/new" element={<FirstAidKitForm />} />
	<Route path="/first-aid-kits/:id" element={<FirstAidKitDetail />} />

	<Route path="/inspections" element={<Inspections />} />
	<Route path="/inspections/new" element={<InspectionForm />} />
	<Route path="/inspections/:id" element={<InspectionDetail />} />

	<Route path="/corrective-actions" element={<CorrectiveActions />} />
	<Route path="/corrective-actions/new" element={<CorrectiveActionForm />} />
	<Route path="/corrective-actions/:id" element={<CorrectiveActionDetail />} />
	<Route path="/corrective-actions/:id/edit" element={<CorrectiveActionForm />} />
          <Route path="/emergency-resources" element={<EmergencyResources />} />
        <Route path="/emergency-resources/new" element={<EmergencyResourceForm />} />
        <Route path="/emergency-resources/:id" element={<EmergencyResourceDetail />} />
        <Route path="/emergency-resources/:id/edit" element={<EmergencyResourceForm />} />

        <Route path="/training-dashboard" element={<TrainingDashboard />} />

        <Route path="/training-programs" element={<TrainingPrograms />} />
        <Route path="/training-programs/new" element={<TrainingProgramForm />} />
        <Route path="/training-programs/:id" element={<TrainingProgramDetail />} />
        <Route path="/training-programs/:id/edit" element={<TrainingProgramForm />} />

        <Route path="/training-sessions" element={<TrainingSessions />} />
        <Route path="/training-sessions/new" element={<TrainingSessionForm />} />
        <Route path="/training-sessions/:id" element={<TrainingSessionDetail />} />
        <Route path="/training-sessions/:id/edit" element={<TrainingSessionForm />} />

        <Route path="/drills" element={<Drills />} />
        <Route path="/drills/new" element={<DrillForm />} />
        <Route path="/drills/:id" element={<DrillDetail />} />
        <Route path="/drills/:id/edit" element={<DrillForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Otp from "../pages/Otp";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

/* ================= Organization ================= */

import OrganizationList from "../pages/OrganizationList";
import AddOrganization from "../pages/AddOrganization";
import EditOrganization from "../pages/EditOrganization";
import ViewOrganization from "../pages/ViewOrganization";

/* ================= Device ================= */

import DeviceList from "../pages/DeviceList";
import AddDevice from "../pages/AddDevice";
import EditDevice from "../pages/EditDevice";
import ViewDevice from "../pages/ViewDevice";

/* ================= Sensor ================= */

import SensorList from "../pages/SensorList";
import AddSensor from "../pages/AddSensor";
import EditSensor from "../pages/EditSensor";
import ViewSensor from "../pages/ViewSensor";

/* ================= Reports ================= */

import ReportList from "../pages/ReportList";
import AddReport from "../pages/AddReport";
import EditReport from "../pages/EditReport";
import ViewReport from "../pages/ViewReport";
import ScheduleReport from "../pages/ScheduleReport";

/* ================= Alerts ================= */

import AlertList from "../pages/AlertList";
import AddAlert from "../pages/AddAlert";
import EditAlert from "../pages/EditAlert";
import ViewAlert from "../pages/ViewAlert";

/* ================= Profit & Loss (Analytics) ================= */

import ProfitLossList from "../pages/ProfitLossList";
import AddProfitLoss from "../pages/AddProfitLoss";
import EditProfitLoss from "../pages/EditProfitLoss";
import ViewProfitLoss from "../pages/ViewProfitLoss";

/* ================= Telemetry ================= */

import Telemetry from "../pages/Telemetry";

/* ================= Settings ================= */

import Settings from "../pages/Settings";

function AppRoutes() {

  return (

    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/otp" element={<Otp />} />

      {/* ================= PROTECTED ================= */}

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>

          {/* ================= HOME ================= */}

          <Route path="/home" element={<Home />} />

          {/* ================= DASHBOARD ================= */}

          <Route path="/dashboard" element={<Dashboard />} />

          {/* ================= ORGANIZATION ================= */}

          <Route path="/organizations" element={<OrganizationList />} />

          <Route
            path="/organizations/add"
            element={<AddOrganization />}
          />

          <Route
            path="/organizations/edit/:id"
            element={<EditOrganization />}
          />

          <Route
            path="/organizations/view/:id"
            element={<ViewOrganization />}
          />

          {/* ================= DEVICE ================= */}

          <Route path="/devices" element={<DeviceList />} />

          <Route path="/devices/add" element={<AddDevice />} />

          <Route
            path="/devices/edit/:id"
            element={<EditDevice />}
          />

          <Route
            path="/devices/view/:id"
            element={<ViewDevice />}
          />

          {/* ================= SENSOR ================= */}

          <Route path="/sensors" element={<SensorList />} />

          <Route path="/sensors/add" element={<AddSensor />} />

          <Route
            path="/sensors/edit/:id"
            element={<EditSensor />}
          />

          <Route
            path="/sensors/view/:id"
            element={<ViewSensor />}
          />

          {/* ================= REPORT ================= */}

          <Route
            path="/reports"
            element={<ReportList />}
          />

          <Route
            path="/reports/add"
            element={<AddReport />}
          />

          <Route
            path="/reports/edit/:id"
            element={<EditReport />}
          />

          <Route
            path="/reports/view/:id"
            element={<ViewReport />}
          />

          <Route
            path="/reports/schedule"
            element={<ScheduleReport />}
          />

          {/* ================= Alert ================= */}

<Route
  path="/alerts"
  element={<AlertList />}
/>

<Route
  path="/alerts/add"
  element={<AddAlert />}
/>

<Route
  path="/alerts/edit/:id"
  element={<EditAlert />}
/>

<Route
  path="/alerts/view/:id"
  element={<ViewAlert />}
/>

          {/* ================= Analytics (Profit & Loss) ================= */}

<Route
  path="/analytics"
  element={<ProfitLossList />}
/>

<Route
  path="/analytics/add"
  element={<AddProfitLoss />}
/>

<Route
  path="/analytics/edit/:id"
  element={<EditProfitLoss />}
/>

<Route
  path="/analytics/view/:id"
  element={<ViewProfitLoss />}
/>

          {/* ================= Telemetry ================= */}

<Route
  path="/telemetry"
  element={<Telemetry />}
/>

          {/* ================= Settings ================= */}

<Route
  path="/settings"
  element={<Settings />}
/>

        </Route>

      </Route>

    </Routes>

  );

}

export default AppRoutes;

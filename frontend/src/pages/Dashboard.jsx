import "../styles/Dashboard.css";

import DashboardCards from "../components/Dashboard/DashboardCard";
import TelemetryChart from "../components/Dashboard/TelemetryChart";
import DeviceStatusChart from "../components/Dashboard/DeviceStatusChart";
import SensorStatusChart from "../components/Dashboard/SensorStatusChart";
import MonthlyAlertChart from "../components/Dashboard/MonthlyAlertChart";
import ProfitLoss from "../components/Dashboard/ProfitLoss";
import RecentDeviceTable from "../components/Dashboard/RecentDeviceTable";
import RecentSensorTable from "../components/Dashboard/RecentSensorTable";
import RecentAlertTable from "../components/Dashboard/RecentAlertTable";

export default function Dashboard() {

  return (

    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div className="dashboard-title">

          <h2>Industrial IIoT Dashboard</h2>

          <p>
            Real-time monitoring of industrial assets and steam systems.
          </p>

        </div>

        <div className="dashboard-actions">

          <select className="dashboard-select">
            <option>Organization</option>
          </select>

          <select className="dashboard-select">
            <option>Customer</option>
          </select>

          <select className="dashboard-select">
            <option>Plant</option>
          </select>

          <input
            type="date"
            className="dashboard-date"
          />

          <button className="refresh-btn">
            🔄 Refresh
          </button>

          <button className="export-btn">
            📄 Export
          </button>

        </div>

      </div>

      {/* ================= KPI ================= */}

      <DashboardCards />

      {/* ================= CHARTS ================= */}

      <div className="analytics-grid">

        <div className="dashboard-widget">
          <TelemetryChart />
        </div>

        <div className="dashboard-widget">
          <DeviceStatusChart />
        </div>

        <div className="dashboard-widget">
          <SensorStatusChart />
        </div>

        <div className="dashboard-widget">
          <MonthlyAlertChart />
        </div>

      </div>

      {/* ================= PROFIT ================= */}

      <div className="dashboard-section">

        <ProfitLoss />

      </div>

      {/* ================= DEVICES ================= */}

      <div className="dashboard-section">

        <RecentDeviceTable />

      </div>

      {/* ================= SENSORS ================= */}

      <div className="dashboard-section">

        <RecentSensorTable />

      </div>

      {/* ================= ALERTS ================= */}

      <div className="dashboard-section">

        <RecentAlertTable />

      </div>

    </div>

  );

}
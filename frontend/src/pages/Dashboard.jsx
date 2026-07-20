import { useState } from "react";
import "../styles/Dashboard.css";

import DashboardCards from "../components/Dashboard/DashboardCard";
import TelemetryChart from "../components/Dashboard/TelemetryChart";
import StatusPercentageChart from "../components/Dashboard/StatusPercentageChart";
import DeviceStatusChart from "../components/Dashboard/DeviceStatusChart";
import SensorStatusChart from "../components/Dashboard/SensorStatusChart";
import MonthlyAlertChart from "../components/Dashboard/MonthlyAlertChart";
import ProfitLossTable from "../components/Dashboard/ProfitLoss";
import SteamLossChart from "../components/Dashboard/SteamLossChart";
import TrapProblemStats from "../components/Dashboard/TrapProblemStats";
import RecentDeviceTable from "../components/Dashboard/RecentDeviceTable";
import RecentSensorTable from "../components/Dashboard/RecentSensorTable";
import RecentAlertTable from "../components/Dashboard/RecentAlertTable";
import EntityHierarchy from "../components/Dashboard/EntityHierarchy";
import DeviceDetail from "../components/Dashboard/DeviceDetail";

export default function Dashboard() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  // EntityHierarchy calls onSelect with either a group node (has `children`)
  // or a leaf device/trap (no `children` key at all). Only leaves should
  // open the device detail page.
  const handleTreeSelect = (node) => {
    if (!node.children) {
      setSelectedDevice(node);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        {/* Left */}
        <div className="dashboard-left">
          <EntityHierarchy onSelect={handleTreeSelect} />
        </div>

        {/* Right */}
        <div className="dashboard-right">
          {selectedDevice ? (
            <DeviceDetail
              device={selectedDevice}
              onBack={() => setSelectedDevice(null)}
            />
          ) : (
            <>
              {/* <div className="dashboard-banner" /> */}

              <DashboardCards />

              <div className="dashboard-widget">
                <ProfitLossTable />
              </div>

              <div className="dashboard-widget">
                <SteamLossChart />
              </div>

              <div className="dashboard-widget">
                <TrapProblemStats />
              </div>

              <div className="chart-row">
                <div className="dashboard-widget">
                  <DeviceStatusChart />
                </div>

                <div className="dashboard-widget">
                  <SensorStatusChart />
                </div>
              </div>

              <div className="dashboard-widget">
                <StatusPercentageChart />
              </div>

              <div className="dashboard-widget">
                <TelemetryChart />
              </div>

              <div className="dashboard-widget">
                <MonthlyAlertChart />
              </div>

              <div className="dashboard-widget">
                <RecentDeviceTable />
              </div>

              <div className="dashboard-widget">
                <RecentSensorTable />
              </div>

              <div className="dashboard-widget">
                <RecentAlertTable />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
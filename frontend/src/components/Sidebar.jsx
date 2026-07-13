import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

import {
  House,
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  Cpu,
  Thermometer,
  Activity,
  BarChart3,
  TrendingUp,
  BellRing,
  FileText,
  Settings,
} from "lucide-react";

const menuSections = [
  {
    title: "MAIN",
    items: [
      {
        path: "/home",
        name: "Home",
        icon: House,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "MANAGEMENT",
    items: [
      {
        path: "/organizations",
        name: "Organizations",
        icon: Building2,
      },
      {
        path: "/customers",
        name: "Customers",
        icon: Users,
      },
      {
        path: "/users",
        name: "Users",
        icon: UserCog,
      },
      {
        path: "/devices",
        name: "Devices",
        icon: Cpu,
      },
      {
        path: "/sensors",
        name: "Sensors",
        icon: Thermometer,
      },
    ],
  },

  {
    title: "MONITORING",
    items: [
      {
        path: "/telemetry",
        name: "Telemetry",
        icon: Activity,
      },
      {
        path: "/analytics",
        name: "Analytics",
        icon: BarChart3,
      },
      {
        path: "/alerts",
        name: "Alerts",
        icon: BellRing,
      },
      {
        path: "/reports",
        name: "Reports",
        icon: FileText,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        path: "/settings",
        name: "Settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
}) {
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`sidebar
      ${sidebarOpen ? "open" : ""}
      ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-menu">
        {menuSections.map((section) => (
          <div
            className="sidebar-section"
            key={section.title}
          >
            {!collapsed && (
              <p className="menu-title">
                {section.title}
              </p>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-version">
            <h3>SteamGuard</h3>
            <p>Industrial IIoT Platform</p>
            <small>Version 1.0.0</small>
          </div>
        </div>
      )}
    </aside>
  );
}
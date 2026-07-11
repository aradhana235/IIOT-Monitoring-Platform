<<<<<<< HEAD
// // import { NavLink } from "react-router-dom";
// // import "../styles/Sidebar.css";


// // export default function Sidebar(){

// // return(

// // <div className="sidebar">


// // <div className="logo">
// //     SteamGuard
// // </div>


// // <nav>


// // <NavLink to="/dashboard">
// // 📊 Dashboard
// // </NavLink>


// // <NavLink to="/organizations">
// // 🏢 Organizations
// // </NavLink>


// // <NavLink to="/devices">
// // ⚙️ Devices
// // </NavLink>


// // <NavLink to="/alerts">
// // 🔔 Alerts
// // </NavLink>


// // <NavLink to="/database">
// // 🗄 Database
// // </NavLink>


// // <NavLink to="/settings">
// // ⚙ Settings
// // </NavLink>


// // </nav>


// // <button className="logout">
// // Logout
// // </button>


// // </div>

// // )

// // }

// import { NavLink, useNavigate } from "react-router-dom";
// import "../styles/Sidebar.css";


// export default function Sidebar(){

// const navigate = useNavigate();


// const handleLogout = () => {

//     // JWT token remove karo
//     localStorage.removeItem("token");

//     // Login page redirect
//     navigate("/login");

// };


// return(

// <div className="sidebar">


// <div className="logo">
//     SteamGuard
// </div>


// <nav>


// <NavLink to="/dashboard">
// 📊 Dashboard
// </NavLink>


// <NavLink to="/organizations">
// 🏢 Organizations
// </NavLink>


// <NavLink to="/devices">
// ⚙️ Devices
// </NavLink>


// <NavLink to="/alerts">
// 🔔 Alerts
// </NavLink>


// <NavLink to="/database">
// 🗄 Database
// </NavLink>


// <NavLink to="/settings">
// ⚙ Settings
// </NavLink>


// </nav>


// <button 
// className="logout"
// onClick={handleLogout}
// >
// Logout
// </button>


// </div>

// )

// }

import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({

    sidebarOpen,
    setSidebarOpen,
    collapsed

})  {
    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
<aside
    className={`
        sidebar
        ${sidebarOpen ? "open" : ""}
        ${collapsed ? "collapsed" : ""}
    `}
>
            <div className="sidebar-menu">

              <NavLink
    to="/home"
    onClick={() => setSidebarOpen(false)}
>
                    🏠
                    <span>Home</span>
                </NavLink>

                <NavLink to="/profile"
                onClick={() => setSidebarOpen(false)}>
                    👤
                    <span>Profile</span>
                </NavLink>

                <NavLink to="/settings"
                onClick={() => setSidebarOpen(false)}>
                    ⚙
                    <span>Settings</span>
                </NavLink>

            </div>

        </aside>

    );

=======
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
  BellRing,
  FileText,
  Settings,
  CircleUser,
} from "lucide-react";

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
      className={`sidebar ${
        sidebarOpen ? "open" : ""
      } ${collapsed ? "collapsed" : ""}`}
    >

      <div className="sidebar-menu">

        {/* MAIN */}
        {!collapsed && <p className="menu-title">MAIN</p>}

        <NavLink to="/home" onClick={closeSidebar}>
          <House size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard" onClick={closeSidebar}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        {/* MANAGEMENT */}
        {!collapsed && (
          <p className="menu-title">MANAGEMENT</p>
        )}

        <NavLink to="/organizations" onClick={closeSidebar}>
          <Building2 size={20} />
          <span>Organizations</span>
        </NavLink>

        <NavLink to="/customers" onClick={closeSidebar}>
          <Users size={20} />
          <span>Customers</span>
        </NavLink>

        <NavLink to="/users" onClick={closeSidebar}>
          <UserCog size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/devices" onClick={closeSidebar}>
          <Cpu size={20} />
          <span>Devices</span>
        </NavLink>

        <NavLink to="/sensors" onClick={closeSidebar}>
          <Thermometer size={20} />
          <span>Sensors</span>
        </NavLink>

        {/* MONITORING */}
        {!collapsed && (
          <p className="menu-title">MONITORING</p>
        )}

        <NavLink to="/telemetry" onClick={closeSidebar}>
          <Activity size={20} />
          <span>Telemetry</span>
        </NavLink>

        <NavLink to="/analytics" onClick={closeSidebar}>
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/alerts" onClick={closeSidebar}>
          <BellRing size={20} />
          <span>Alerts</span>
        </NavLink>

        <NavLink to="/reports" onClick={closeSidebar}>
          <FileText size={20} />
          <span>Reports</span>
        </NavLink>

        {/* SYSTEM */}
        {!collapsed && (
          <p className="menu-title">SYSTEM</p>
        )}

        <NavLink to="/settings" onClick={closeSidebar}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

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
>>>>>>> 9e08fb9 (Initial commit)
}
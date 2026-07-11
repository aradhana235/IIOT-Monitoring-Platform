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

}
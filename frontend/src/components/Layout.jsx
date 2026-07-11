// import { Outlet } from "react-router-dom";

// import Header from "./Header";
// import Sidebar from "./Sidebar";

// import "../styles/Layout.css";


// export default function Layout(){

//     return(

//         <div className="app-layout">

//             <Header />

//             <div className="main-area">

//                 <Sidebar />

//                 <main className="content">

//                     <Outlet />

//                 </main>

//             </div>


//         </div>

//     )

// // }

// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import "../styles/Layout.css";

// export default function Layout({children}) {

//     return (
//         <div className="app-layout">

//             <Header />

//             <div className="main-section">

//                 <Sidebar />

//                 <main className="content-area">
//                     {children}
//                 </main>

//             </div>

//             <Footer />

//         </div>
//     )
// }

// import { Outlet } from "react-router-dom";

// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";

// import "../styles/Layout.css";

// export default function Layout() {

//     return (

//         <div className="app-layout">

//             <Header />

//             <div className="main-section">

//                 <Sidebar />

//                 <main className="content-area">

//                     <Outlet />

//                 </main>

//             </div>

//             <Footer />

//         </div>

//     );

// }

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { useState } from "react";


import Footer from "./Footer";

import "../styles/Layout.css";

// export default function Layout() {

//     return (

//         <div className="app-layout">

//             <Header />

//             <div className="main-section">

//                 <Sidebar />

//                 <main className="content-area">

//                     <Outlet />

//                 </main>

//             </div>

//         </div>

//     );

// }
export default function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
const [collapsed, setCollapsed] = useState(false);
    return (

        <div className="app-layout">

            <Header
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
/>

            <div className="main-section">

                <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    collapsed={collapsed}
/>
{sidebarOpen && (
    <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
    />
)}
                <main className="content-area">
                    <Outlet />
                </main>

            </div>

            <Footer />

        </div>

    );

}
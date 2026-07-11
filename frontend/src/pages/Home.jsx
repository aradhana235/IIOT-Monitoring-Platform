// // import { useNavigate } from "react-router-dom";
// import "../styles/Home.css";
// // import Sidebar from "../components/Sidebar.jsx";
// import DashboardCard from "../components/DashboardCard";
// export default function Home() {

//   // const navigate = useNavigate();

//   const modules = [

//   {
//     title: "SteamGuard",
//     description: "Steam Trap Monitoring",
//     icon: "♨️",
//     path: "/dashboard"
//   },

//   {
//     title: "Water",
//     description: "Water Monitoring",
//     icon: "💧",
//     path: "/water"
//   },

//   {
//     title: "Gas",
//     description: "Gas Leak Monitoring",
//     icon: "🔥",
//     path: "/gas"
//   },

//   {
//     title: "Energy",
//     description: "Energy Monitoring",
//     icon: "⚡",
//     path: "/energy"
//   },

//   {
//     title: "Environment",
//     description: "Environment Monitoring",
//     icon: "🌿",
//     path: "/environment"
//   },

//   {
//     title: "Machine",
//     description: "Machine Health Monitoring",
//     icon: "⚙️",
//     path: "/machine"
//   }

// ];

//   return (

//     <div className="home-page">
    

//        <div className="home-content">
//       <div className="home-header">

//         <div>
// <h1>Welcome Back 👋</h1>

// <p>
// Choose a solution to continue monitoring your industrial assets.
// </p>

//         </div>

//       </div>

//       <div className="module-grid">

//         {
//           modules.map((module,index)=>(

//             <div
//               key={index}
//               className="module-card"
//               onClick={()=>navigate(module.path)}
//             >

//               <div className="module-icon">

//                 {module.icon}

//               </div>

//               <h3>

//                 {module.title}

//               </h3>

//               <p>

//                 {module.desc}

//               </p>

//             </div>

//           ))
//         }

//       </div>

//     </div>
//     </div>

//   );

// }

import "../styles/Home.css";
import DashboardCard from "../components/DashboardCard";

export default function Home() {

  const modules = [

    {
      title: "SteamGuard",
      description: "Steam Trap Monitoring",
      icon: "♨️",
      path: "/dashboard"
    },

    {
      title: "Water",
      description: "Water Monitoring",
      icon: "💧",
      path: "/dashboard"
    },

    {
      title: "Gas",
      description: "Gas Leak Monitoring",
      icon: "🔥",
      path: "/dashboard"
    },

    {
      title: "Energy",
      description: "Energy Monitoring",
      icon: "⚡",
      path: "/dashboard"
    },

    {
      title: "Environment",
      description: "Environment Monitoring",
      icon: "🌿",
      path: "/dashboard"
    },

    {
      title: "Machine",
      description: "Machine Health Monitoring",
      icon: "⚙️",
      path: "/dashboard"
    }

  ];

  return (

    <div className="home-page">

      <div className="home-content">

        <div className="home-header">

          <h1>Welcome Back 👋</h1>

          <p>
            Choose a solution to continue monitoring your industrial assets.
          </p>

        </div>
        <div className="search-box">

    <input
        type="text"
        placeholder="Search Solution..."
    />

</div>


        <div className="module-grid">

          {modules.map((module, index) => (

            <DashboardCard
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              path={module.path}
            />

          ))}

        </div>

      </div>

    </div>

  );

}
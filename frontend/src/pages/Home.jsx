import "../styles/Home.css";
import ModuleCard from "../components/Home/ModuleCard";

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
    path: "/water"
  },
  {
    title: "Gas",
    description: "Gas Leak Monitoring",
    icon: "🔥",
    path: "/gas"
  },
  {
    title: "Energy",
    description: "Energy Monitoring",
    icon: "⚡",
    path: "/energy"
  },
  {
    title: "Environment",
    description: "Environment Monitoring",
    icon: "🌿",
    path: "/environment"
  },
  {
    title: "Machine",
    description: "Machine Health Monitoring",
    icon: "⚙️",
    path: "/machine"
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

            <ModuleCard
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
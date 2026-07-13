import {
  Activity,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Flame,
  WifiOff,
} from "lucide-react";

const dashboardCards = [
  {
    title: "Total Traps",
    value: 248,
    icon: Activity,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    title: "Normal",
    value: 210,
    icon: CheckCircle2,
    color: "#16a34a",
    bg: "#ecfdf5",
  },
  {
    title: "Blocked",
    value: 12,
    icon: ShieldAlert,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    title: "Partial Leak",
    value: 15,
    icon: AlertTriangle,
    color: "#ea580c",
    bg: "#fff7ed",
  },
  {
    title: "Full Leak",
    value: 6,
    icon: Flame,
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    title: "Offline",
    value: 5,
    icon: WifiOff,
    color: "#64748b",
    bg: "#f8fafc",
  },

];

export default function DashboardCards() {
  return (
    <div className="dashboard-grid">
      {dashboardCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            className="dashboard-card"
            key={card.title}
          >
            <div
              className="icon-box"
              style={{ background: card.bg }}
            >
              <Icon
                size={30}
                color={card.color}
              />
            </div>

            <div className="card-info">

              <h2>{card.value}</h2>

              <span>{card.title}</span>

            </div>

          </div>
        );
      })}
    </div>
  );
}
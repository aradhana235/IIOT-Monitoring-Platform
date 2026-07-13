import { useNavigate } from "react-router-dom";

export default function ModuleCard({
  title,
  description,
  icon,
  path
}) {

  const navigate = useNavigate();

  return (
    <div
      className="module-card"
      onClick={() => navigate(path)}
    >

      <div className="module-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

    </div>
  );
}
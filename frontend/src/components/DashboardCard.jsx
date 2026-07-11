import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function DashboardCard({

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

            <div className="open-dashboard">

                Open Dashboard →

            </div>

        </div>

    );

}
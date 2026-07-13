import {
  AlertTriangle,
  Eye,
  Search,
  Filter,
} from "lucide-react";


const alerts = [

  {
    id:1,
    type:"Critical",
    device:"SteamTrap-101",
    customer:"BridgeStone",
    message:"Full Steam Leak Detected",
    severity:"High",
    time:"2 min ago",
    status:"Active"
  },

  {
    id:2,
    type:"Warning",
    device:"SteamTrap-205",
    customer:"CEAT",
    message:"Partial Leak Detected",
    severity:"Medium",
    time:"10 min ago",
    status:"Active"
  },

  {
    id:3,
    type:"Info",
    device:"SteamTrap-310",
    customer:"Ultratech",
    message:"Sensor Calibration Required",
    severity:"Low",
    time:"1 hour ago",
    status:"Resolved"
  },

  {
    id:4,
    type:"Critical",
    device:"SteamTrap-415",
    customer:"Mankind",
    message:"Device Disconnected",
    severity:"High",
    time:"2 hours ago",
    status:"Resolved"
  }

];

export default function RecentAlertTable() {

  return (

    <div className="table-card">

      <div className="table-header">

        <div>

          <h3>Recent Alerts</h3>

          <p>{alerts.length} Alerts Found</p>

        </div>

        <div className="table-actions">

          <div className="search-box">

            <Search size={16}/>

            <input
              type="text"
              placeholder="Search Alert..."
            />

          </div>

          <button className="filter-btn">

            <Filter size={16}/>

            Filter

          </button>

        </div>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>Alert</th>

              <th>Device</th>

              <th>Customer</th>

              <th>Message</th>

              <th>Severity</th>

              <th>Time</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              alerts.map((alert)=>(

                <tr key={alert.id}>

                  <td>

                    <div className="alert-type">

                      <AlertTriangle
                        size={16}
                        className={alert.type.toLowerCase()}
                      />

                      {alert.type}

                    </div>

                  </td>

                  <td>{alert.device}</td>

                  <td>{alert.customer}</td>

                  <td>{alert.message}</td>

                  <td>

                    <span
                      className={`severity ${alert.severity.toLowerCase()}`}
                    >

                      {alert.severity}

                    </span>

                  </td>

                  <td>{alert.time}</td>

                  <td>

                    <span
                      className={`status ${alert.status.toLowerCase()}`}
                    >

                      {alert.status}

                    </span>

                  </td>

                  <td>

                    <button className="view-btn">

                      <Eye size={16}/>

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}
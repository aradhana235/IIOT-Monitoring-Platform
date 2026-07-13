import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Alert.css";

import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Bell,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

//import DeleteAlertModal from "../components/Alert/DeleteAlertModal";
import DeleteAlertModal from "../pages/DeleteAlertModal";

export default function AlertList() {

  const navigate = useNavigate();

  /* ===========================
      STATES
  =========================== */

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [customer, setCustomer] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  /* ===========================
      DUMMY DATA
  =========================== */

  const alerts = [

    {
      id:1,
      device:"SteamTrap-001",
      customer:"BridgeStone",
      alert:"Full Leak",
      severity:"Critical",
      status:"Open",
      time:"13-Jul-2026 10:30 AM"
    },

    {
      id:2,
      device:"SteamTrap-005",
      customer:"CEAT",
      alert:"Blocked",
      severity:"Medium",
      status:"Open",
      time:"13-Jul-2026 09:10 AM"
    },

    {
      id:3,
      device:"SteamTrap-010",
      customer:"MRF",
      alert:"Partial Leak",
      severity:"Low",
      status:"Resolved",
      time:"12-Jul-2026 06:45 PM"
    },

    {
      id:4,
      device:"SteamTrap-018",
      customer:"Apollo",
      alert:"Steam Temperature High",
      severity:"Critical",
      status:"Open",
      time:"13-Jul-2026 11:25 AM"
    },

    {
      id:5,
      device:"SteamTrap-020",
      customer:"JK Tyre",
      alert:"Sensor Offline",
      severity:"Medium",
      status:"Resolved",
      time:"13-Jul-2026 12:10 PM"
    }

  ];

  /* ===========================
      SUMMARY COUNTS
  =========================== */

  const totalAlerts = alerts.length;

  const criticalAlerts =
    alerts.filter(
      item => item.severity === "Critical"
    ).length;

  const warningAlerts =
    alerts.filter(
      item => item.severity === "Medium"
    ).length;

  const resolvedAlerts =
    alerts.filter(
      item => item.status === "Resolved"
    ).length;

  /* ===========================
      FILTER
  =========================== */

  const filteredAlerts = alerts.filter((item)=>{

      return(

          (search==="" ||

          item.device.toLowerCase().includes(search.toLowerCase()) ||

          item.customer.toLowerCase().includes(search.toLowerCase()) ||

          item.alert.toLowerCase().includes(search.toLowerCase()))

          &&

          (customer==="" || item.customer===customer)

          &&

          (severity==="" || item.severity===severity)

      );

  });

  return(

<div className="page">

{/* ===========================
      HEADER
=========================== */}

<div className="page-header">

<div>

<h2>

<Bell size={30}/>

Alerts

</h2>

<p>

Industrial Alert Management

</p>

</div>

<div className="header-actions">

<button className="refresh-btn">

<RefreshCw size={18}/>

Refresh

</button>

<button
className="add-btn"
onClick={()=>navigate("/alerts/add")}
>

<Plus size={18}/>

Add Alert

</button>

</div>

</div>

{/* ===========================
      SUMMARY CARDS
=========================== */}

<div className="alert-summary">

<div className="summary-card total">

<Bell size={42}/>

<div>

<h3>{totalAlerts}</h3>

<p>Total Alerts</p>

</div>

</div>

<div className="summary-card critical">

<ShieldAlert size={42}/>

<div>

<h3>{criticalAlerts}</h3>

<p>Critical Alerts</p>

</div>

</div>

<div className="summary-card warning">

<AlertTriangle size={42}/>

<div>

<h3>{warningAlerts}</h3>

<p>Warning Alerts</p>

</div>

</div>

<div className="summary-card resolved">

<CheckCircle2 size={42}/>

<div>

<h3>{resolvedAlerts}</h3>

<p>Resolved Alerts</p>

</div>

</div>

</div>

{/* ===========================
      FILTER
=========================== */}

<div className="filter-card">

<input

type="text"

placeholder="Search Alert..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

<select

value={customer}

onChange={(e)=>setCustomer(e.target.value)}

>

<option value="">All Customers</option>

<option>BridgeStone</option>

<option>CEAT</option>

<option>MRF</option>

<option>Apollo</option>

<option>JK Tyre</option>

</select>

<select

value={severity}

onChange={(e)=>setSeverity(e.target.value)}

>

<option value="">All Severity</option>

<option>Critical</option>

<option>Medium</option>

<option>Low</option>

</select>

<button>

<Search size={18}/>

Search

</button>

</div>
      {/* ===========================
            ALERT TABLE
      =========================== */}

      <div className="table-card">

        <div className="table-responsive">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Device</th>
                <th>Customer</th>
                <th>Alert</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredAlerts.length > 0 ? (

                  filteredAlerts.map((item) => (

                    <tr key={item.id}>

                      <td>ALT-{item.id}</td>

                      <td>{item.device}</td>

                      <td>{item.customer}</td>

                      <td>{item.alert}</td>

                      <td>

                        <span
                          className={`severity ${item.severity.toLowerCase()}`}
                        >

                          {item.severity}

                        </span>

                      </td>

                      <td>

                        <span
                          className={`status ${item.status.toLowerCase()}`}
                        >

                          {item.status}

                        </span>

                      </td>

                      <td>{item.time}</td>

                      <td>

                        <div className="action-btns">

                          <button
                            title="View"
                            onClick={() =>
                              navigate(`/alerts/view/${item.id}`)
                            }
                          >

                            <Eye size={18} />

                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              navigate(`/alerts/edit/${item.id}`)
                            }
                          >

                            <Pencil size={18} />

                          </button>

                          <button
                            title="Delete"
                            onClick={() => {

                              setSelectedAlert(item);

                              setOpenDelete(true);

                            }}
                          >

                            <Trash2 size={18} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#64748b"
                      }}
                    >

                      No Alerts Found

                    </td>

                  </tr>

                )

              }

            </tbody>

          </table>

        </div>

      </div>

      {/* ===========================
            DELETE MODAL
      =========================== */}

      <DeleteAlertModal

        open={openDelete}

        onClose={() => setOpenDelete(false)}

        onDelete={() => {

          console.log("Delete Alert :", selectedAlert);

          // TODO:
          // await axios.delete(`/api/alerts/${selectedAlert.id}`);

          setOpenDelete(false);

        }}

      />

    </div>

  );

}
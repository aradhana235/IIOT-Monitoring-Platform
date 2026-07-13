import {
Eye,
Download,
FileSpreadsheet,
FileText
} from "lucide-react";

const reports=[

{
id:1,
name:"Steam Saving Report",
customer:"BridgeStone",
device:"ST-101",
type:"Daily",
date:"13-Jul-2026",
status:"Ready"
},

{
id:2,
name:"Energy Report",
customer:"MRF",
device:"EN-201",
type:"Monthly",
date:"12-Jul-2026",
status:"Ready"
},

{
id:3,
name:"Telemetry Report",
customer:"CEAT",
device:"TR-302",
type:"Custom",
date:"10-Jul-2026",
status:"Processing"
},

{
id:4,
name:"Alert Report",
customer:"Ultratech",
device:"ST-110",
type:"Weekly",
date:"09-Jul-2026",
status:"Ready"
}

];


export default function ReportTable(){

return(

<div className="table-card">

<div className="table-wrapper">

<table className="report-table">

<thead>

<tr>

<th>Report</th>
<th>Customer</th>
<th>Device</th>
<th>Type</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>


<tbody>

{
reports.map((item)=>(

<tr key={item.id}>

<td>{item.name}</td>

<td>{item.customer}</td>

<td>{item.device}</td>

<td>{item.type}</td>

<td>{item.date}</td>


<td>

<span className={`status ${item.status.toLowerCase()}`}>

{item.status}

</span>

</td>


<td>

<div className="action-buttons">

<button>
<Eye size={16}/>
</button>

<button>
<FileText size={16}/>
</button>

<button>
<FileSpreadsheet size={16}/>
</button>

<button>
<Download size={16}/>
</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}
import {
  Eye,
} from "lucide-react";


const devices = [

  {
    id:1,
    name:"SteamTrap-001",
    deviceId:"ST-1001",
    customer:"BridgeStone",
    status:"Online",
    telemetry:"2 min ago",
    battery:"92%"
  },


  {
    id:2,
    name:"SteamTrap-002",
    deviceId:"ST-1002",
    customer:"CEAT",
    status:"Offline",
    telemetry:"25 min ago",
    battery:"65%"
  },


  {
    id:3,
    name:"SteamTrap-003",
    deviceId:"ST-1003",
    customer:"Ultratech",
    status:"Online",
    telemetry:"1 min ago",
    battery:"88%"
  },


  {
    id:4,
    name:"SteamTrap-004",
    deviceId:"ST-1004",
    customer:"Mankind",
    status:"Maintenance",
    telemetry:"1 day ago",
    battery:"45%"
  },


];



export default function RecentDeviceTable(){


return (

<div className="table-card">


<div className="chart-header">

<h3>
Recent Devices
</h3>


<span>
View All
</span>


</div>



<div className="table-wrapper">


<table>


<thead>

<tr>

<th>
Device Name
</th>

<th>
Device ID
</th>

<th>
Customer
</th>

<th>
Status
</th>

<th>
Last Telemetry
</th>

<th>
Battery
</th>

<th>
Action
</th>

</tr>


</thead>



<tbody>


{

devices.map((device)=>(


<tr key={device.id}>


<td>
{device.name}
</td>


<td>
{device.deviceId}
</td>


<td>
{device.customer}
</td>



<td>


<span

className={`status ${device.status.toLowerCase()}`}

>

{device.status}

</span>


</td>



<td>
{device.telemetry}
</td>



<td>
{device.battery}
</td>



<td>

<button className="view-btn">

<Eye size={17}/>

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
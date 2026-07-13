import {
  Activity,
} from "lucide-react";


const sensors = [

  {
    id:1,
    name:"Temperature Sensor",
    type:"Temperature",
    device:"SteamTrap-001",
    value:"128",
    unit:"°C",
    status:"Active",
    updated:"30 sec ago"
  },


  {
    id:2,
    name:"Pressure Sensor",
    type:"Pressure",
    device:"SteamTrap-002",
    value:"42",
    unit:"Bar",
    status:"Active",
    updated:"1 min ago"
  },


  {
    id:3,
    name:"Vibration Sensor",
    type:"Acceleration",
    device:"SteamTrap-003",
    value:"0.02",
    unit:"g",
    status:"Warning",
    updated:"5 min ago"
  },


  {
    id:4,
    name:"Battery Sensor",
    type:"Battery",
    device:"SteamTrap-004",
    value:"45",
    unit:"%",
    status:"Inactive",
    updated:"1 hour ago"
  },


];



export default function RecentSensorTable(){


return (

<div className="table-card">


<div className="chart-header">

<h3>
Recent Sensors
</h3>


<span>
Live Data
</span>


</div>



<div className="table-wrapper">


<table>


<thead>

<tr>


<th>
Sensor Name
</th>


<th>
Type
</th>


<th>
Device
</th>


<th>
Value
</th>


<th>
Unit
</th>


<th>
Status
</th>


<th>
Updated
</th>


</tr>

</thead>



<tbody>


{

sensors.map((sensor)=>(


<tr key={sensor.id}>


<td>

<Activity size={15}/>

{" "}

{sensor.name}

</td>


<td>
{sensor.type}
</td>


<td>
{sensor.device}
</td>


<td>
{sensor.value}
</td>


<td>
{sensor.unit}
</td>



<td>


<span

className={`status ${sensor.status.toLowerCase()}`}

>

{sensor.status}

</span>


</td>



<td>
{sensor.updated}
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
export default function ReportFilter(){

return(

<div className="filter-box">

<input
type="text"
placeholder="Search Report..."
/>

<select>

<option>Customer</option>

<option>BridgeStone</option>

<option>CEAT</option>

<option>MRF</option>

</select>

<select>

<option>Report Type</option>

<option>Daily</option>

<option>Weekly</option>

<option>Monthly</option>

<option>Telemetry</option>

</select>

<input type="date"/>

<input type="date"/>

<button>

Search

</button>

</div>

)

}
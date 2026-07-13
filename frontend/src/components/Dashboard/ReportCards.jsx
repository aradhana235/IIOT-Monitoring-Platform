import {
    FileText,
    Download,
    Calendar,
    BarChart3
} from "lucide-react";

const cards = [

    {
        title: "Total Reports",
        value: 245,
        icon: FileText,
        color: "#2563eb"
    },

    {
        title: "Generated Today",
        value: 18,
        icon: BarChart3,
        color: "#16a34a"
    },

    {
        title: "Scheduled",
        value: 12,
        icon: Calendar,
        color: "#d97706"
    },

    {
        title: "Downloads",
        value: 41,
        icon: Download,
        color: "#9333ea"
    }

];

export default function ReportCards(){

return(

<div className="report-card-grid">

{

cards.map((item,index)=>{

const Icon=item.icon;

return(

<div className="report-card" key={index}>

<div
className="report-icon"
style={{background:item.color}}
>

<Icon color="white"/>

</div>

<div>

<h2>{item.value}</h2>

<p>{item.title}</p>

</div>

</div>

)

})

}

</div>

)

}
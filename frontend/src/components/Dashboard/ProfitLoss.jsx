import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Zap,
  Leaf,
  Gauge,
} from "lucide-react";


const profitData = [

  {
    title: "Total Savings",
    value: "₹12.45 L",
    icon: IndianRupee,
    type: "success",
    subTitle: "Overall Cost Saving",
  },

  {
    title: "Steam Loss",
    value: "₹3.20 L",
    icon: TrendingDown,
    type: "danger",
    subTitle: "Prevented Loss",
  },

  {
    title: "Monthly Saving",
    value: "₹1.25 L",
    icon: Zap,
    type: "info",
    subTitle: "Current Month",
  },

  {
    title: "Steam Saved",
    value: "425 Kg",
    icon: Gauge,
    type: "primary",
    subTitle: "Steam Recovery",
  },

  {
    title: "CO₂ Saved",
    value: "5.8 Ton",
    icon: Leaf,
    type: "green",
    subTitle: "Carbon Reduction",
  },

  {
    title: "ROI",
    value: "38%",
    icon: TrendingUp,
    type: "purple",
    subTitle: "Investment Return",
  },

];

export default function ProfitLoss() {

  return (

    <div className="profit-container">

      <div className="chart-header">

        <div>

          <h3>Profit & Savings Analytics</h3>

          <p>
            Steam Trap Financial Performance
          </p>

        </div>

        <span className="live-badge">

          2026

        </span>

      </div>

      <div className="profit-grid">

        {

          profitData.map((item,index)=>{

            const Icon=item.icon;

            return(

              <div

                className={`profit-card ${item.type}`}

                key={index}

              >

                <div className="profit-icon">

                  <Icon size={28}/>

                </div>

                <div className="profit-info">

                  <span>

                    {item.title}

                  </span>

                  <h2>

                    {item.value}

                  </h2>

                  <p>

                    {item.subTitle}

                  </p>

                </div>

              </div>

            )

          })

        }

      </div>

    </div>

  );

}
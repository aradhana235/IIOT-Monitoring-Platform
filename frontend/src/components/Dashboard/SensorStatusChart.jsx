import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";


const sensorData = [
  {
    name: "Active",
    value: 342,
  },
  {
    name: "Inactive",
    value: 18,
  },
  {
    name: "Faulty",
    value: 6,
  },
  {
    name: "Calibration Due",
    value: 12,
  },
];


const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
];


export default function SensorStatusChart(){

  const total = sensorData.reduce(
    (sum,item)=> sum + item.value,
    0
  );


  return (

    <div className="chart-card">


      <div className="chart-header">

        <h3>
          Sensor Status
        </h3>


        <span>
          Total {total}
        </span>


      </div>



      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>


          <Pie

            data={sensorData}

            cx="50%"

            cy="50%"

            innerRadius={70}

            outerRadius={105}

            dataKey="value"

            paddingAngle={4}

          >


          {

            sensorData.map(
              (entry,index)=>(

                <Cell

                  key={index}

                  fill={COLORS[index]}

                />

              )

            )

          }


          </Pie>


          <Tooltip/>


          <Legend

            verticalAlign="bottom"

          />


        </PieChart>


      </ResponsiveContainer>



      <div className="sensor-summary">


        <div>

          <h4>🌡️ Active</h4>

          <p>
            342 Sensors
          </p>

        </div>



        <div>

          <h4>🔴 Inactive</h4>

          <p>
            18 Sensors
          </p>

        </div>



        <div>

          <h4>🟡 Faulty</h4>

          <p>
            6 Sensors
          </p>

        </div>



        <div>

          <h4>🔵 Calibration</h4>

          <p>
            12 Sensors
          </p>

        </div>


      </div>



    </div>

  );

}
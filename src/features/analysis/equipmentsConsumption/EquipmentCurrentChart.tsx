import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

export default function EquipmentCurrentChart() {
  const handleTimeChange = (data: any) => {
    if (data) {
      const time = data.split("T")[1]
      const hourAndMin = time ? time.split(":").slice(0, 2) : null
      return hourAndMin ? hourAndMin.join(":") : null
    }
    
  }

  const CustomTooltip = ({ payload, label, active }: any) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label ma0">{`${handleTimeChange(label)} `}</p>
          <p className="label ma0">{`电量： kWh`}</p>
        </div>
      );
    }
  
    return null;
  }
  const currentData: any = []
  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={currentData}
        margin={{
          top: 5,
          right: 5,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
          tickFormatter={(date) => handleTimeChange(date)}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />}/>
        <Legend />
        <Line name="设备实时电流" type="monotone" dataKey="quantity" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

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
import { useAppSelector } from "../../../hook"
import { selectEquipmentById } from "../../equipments/equipmentsSlice"

export default function EquipmentCurrentChart({ id }:any) {
  const equipment = useAppSelector(state => selectEquipmentById(state, id))
  const currentData = equipment?.collectors[0].records.map(data => {
    const current = JSON.parse(data.voltageCurrentAmount)
    return {
      time: data.time,
      A: current.electricCurrentA,
      B: current.electricCurrentB,
      C: current.electricCurrentC
    }
  })

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
          <p className="label ma0">{`A相电流：${payload[0].value} A`}</p>
          <p className="label ma0">{`B相电流：${payload[1].value} A`}</p>
          <p className="label ma0">{`C相电流：${payload[2].value} A`}</p>
        </div>
      );
    }
  
    return null;
  }
  
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
        <Line name="A相电流" type="monotone" dataKey="A" stroke="#82ca9d" />
        <Line name="B相电流" type="monotone" dataKey="B" stroke="#c3b6e6" />
        <Line name="C相电流" type="monotone" dataKey="C" stroke="#71d4d4" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

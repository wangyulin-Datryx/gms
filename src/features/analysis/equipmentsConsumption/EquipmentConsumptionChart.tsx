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
import { Row, Spin } from "antd"
import { useAppSelector } from "../../../hook"
import { selectEquipmentById } from "../../gmsBoard/realtimeSlice"

export default function EquipmentConsumptionChart({ status, data }: any) {
  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dot={false} name={`实时电量`} type="monotone" dataKey="quantity" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

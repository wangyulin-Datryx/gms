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
  // const equipment = useAppSelector(state => selectEquipmentById(state, id))
  // const equipmentElectric = equipment?.collectors[0]?.records?.map(record => ({
  //   time: handleTimeChange(record.time),
  //   quantity: record.quantity
  // }))
  // const equipmentName = equipment?.name

  // function handleTimeChange(data: any) {
  //   if (data) {
  //     const time = data.split("T")[1]
  //     const hourAndMin = time ? time.split(":").slice(0, 2) : null
  //     return hourAndMin ? hourAndMin.join(":") : null
  //   }
  // }

  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={data}
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

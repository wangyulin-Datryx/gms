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

export default function EquipmentVoltageChart({ id }: any) {
  const equipment = useAppSelector(state => selectEquipmentById(state, id))
  const voltageData = equipment?.collectors[0].records.map(data => {
    const current = JSON.parse(data.voltageCurrentAmount)
    return {
      time: handleTimeChange(data.time),
      A: current.electric_voltage_a,
      B: current.electric_voltage_b,
      C: current.electric_voltage_c
    }
  })
  function handleTimeChange (data: any) {
    if (data) {
      const time = data.split("T")[1]
      const hourAndMin = time ? time.split(":").slice(0, 2) : null
      return hourAndMin ? hourAndMin.join(":") : null
    }
    
  }

  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={voltageData}
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
        <Line dot={false} name="A相电压" type="monotone" dataKey="A" stroke="#82ca9d" />
        <Line dot={false} name="B相电压" type="monotone" dataKey="B" stroke="#c3b6e6" />
        <Line dot={false} name="C相电压" type="monotone" dataKey="C" stroke="#71d4d4" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

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
import { selectEquipmentById } from "../../equipments/equipmentsSlice"

export default function EquipmentConsumptionChart({ id }: {id: number}) {
  const equipment = useAppSelector(state => selectEquipmentById(state, id))
  const status = useAppSelector(state => state.equipments.status)
  const equipmentElectric = equipment?.collectors[0].records
  const equipmentName = equipment?.name

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
          <p className="label ma0">{`电量：${payload[0].value} kWh`}</p>
        </div>
      );
    }
    return null;
  }

  if (status === 'loading') {
    return (
      <Row 
        className="flex justify-center items-center" 
        style={{width: '830px', height: '350px'}}>  
        <Spin />
      </Row>)
  }

  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={equipmentElectric}
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
        <Line name={`${equipmentName}实时电量`} type="monotone" dataKey="quantity" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

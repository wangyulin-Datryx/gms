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
import { useEffect, useState } from "react"
import axios from "axios"
import { Spin, Row } from 'antd'

export default function EquipmentConsumptionChart({ id }: {id: number}) {
  const [electricConsumption, setElectricConsumption] = useState([])
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchElectricConsumption = async () => {
    try {
      setIsLoading(true)
      const response: any = await axios.post("api/history/search", 
      {deviceId: id})
      setIsLoading(false)
      const records = response.data.data.collectors[0].records
      const equipmentName = response.data.data.name
      setTitle(equipmentName)
      setElectricConsumption(records)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchElectricConsumption()
  }, [id])

  useEffect(() => {
    let timer = setTimeout(() => fetchElectricConsumption(), 1000*60*10)
    return () => clearTimeout(timer)
  }, [electricConsumption])

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

  if (isLoading) {
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
        
        data={electricConsumption}
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
        <Line name={`${title}实时电量`} type="monotone" dataKey="quantity" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

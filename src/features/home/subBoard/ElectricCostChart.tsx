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
import { useState, useEffect } from 'react'
import { Select, Spin, Row, Col, DatePicker } from "antd"
import moment from "moment"
import axios from "axios"
import { useAppSelector } from "../../../hook"
import { selectEquipments } from "../../equipments/equipmentsSlice"

const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss[Z]')

const handleTimeChange = (data: any) => {
  if (data) {
    const time = data.split("T")[1]
    const hourAndMin = time ? time.split(":").slice(0, 2) : null
    return hourAndMin ? hourAndMin.join(":") : null
  }
}

const ElectricCostChart = () => {
  const equipments = useAppSelector(selectEquipments)
  const status = useAppSelector(state => state.equipments.status)
  const [date, setDate] = useState(yesterday)
  const [someDayData, setSomeDayData] = useState<any>([])

  useEffect(() => {
    const fetchYesterDayData = async () => {
      const response: any = await axios.post('api/history/search',
        {deviceId: 0, time: date})
      const records = response.data.data.collectors[0].records
      const chartData = records?.map((record: any) => {
        return {
          time: handleTimeChange(record.time),
          yesQuantity: record.quantity,
          yesCurrentAmount: record.currentAmount
        }
      })
      setSomeDayData(chartData)
    }
    fetchYesterDayData()
  }, [date])

  function handleDateChange(date: any, dateString: any) {
    setDate(moment(dateString).format('YYYY-MM-DDTHH:mm:ss[Z]'));
  }

  function disabledDate(current: any) {
    return current && current < moment("2021-10-11").endOf('day');
  }

  const totalElectricConsumption = equipments.filter(equipment => equipment.deviceId===0)[0]?.collectors[0].records
  const todayData = totalElectricConsumption?.map(data => {
    return {
      time: handleTimeChange(data.time),
      toQuantity: data.quantity,
      toCurrentAmount: data.currentAmount
    }
  })
  
  if (status==="loading" || !totalElectricConsumption) {
    return (
      <div>
        <Spin />
      </div>
    )
  }

  const chartData = someDayData.map((data: any, index: any) => {
    return {
      ...data,
      toQuantity: todayData[index] ? todayData[index].toQuantity : null,
      toCurrentAmount: todayData[index] ? todayData[index].toCurrentAmount : null
    }
  })

  const todayCurrentData =todayData? todayData[todayData?.length - 1]?.toCurrentAmount : 0
  const todayCurrentTime = todayData[todayData?.length - 1]?.time
  const someDataTotal = someDayData ? someDayData[someDayData?.length - 1]?.yesCurrentAmount : 0

  return (
    <>
      <div >
        <Row className="pa3" align="middle">
          <Col md={3} xs={24}>
            <h1 className="f4 blue">用电量对比</h1>
          </Col>
          <Col md={10}>
            <span>{`${someDataTotal} kWh`}</span>
            <DatePicker 
              onChange={handleDateChange} 
              disabledDate={disabledDate}
            />
            <span>{`对比 ${todayCurrentData} kWh`}</span>
            <span>{`(截止${todayCurrentTime})`}</span>
          </Col>
        </Row>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
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
          <Line
            name={moment(date).format("YYYY-MM-DD")}
            type="monotone"
            dataKey="yesQuantity"
            stroke="#8884d8"
          />
          <Line 
            name="今天" 
            type="monotone" 
            dataKey="toQuantity" 
            stroke="#82ca9d" 
          />
          </LineChart>
        </ResponsiveContainer>
        </div>
    </>
  )
}

export default ElectricCostChart
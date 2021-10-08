import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { useState, useEffect } from 'react'
import { Button, Select } from "antd"
import moment from "moment"
import { Link } from "react-router-dom"

const { Option } = Select

const ElectricCostChart = ({ data }: any) => {
  const [matchDay, setMatchDay] = useState("昨天")
  const [totalKwh, setTotalKwh] = useState(103.54)

  const handleChange = (value: string) => {
    setMatchDay(value)
  }

  const time = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  let start = new Date(`${time} 08:00`).getTime()
  let end = new Date(`${time} 24:00`).getTime()
  let ticks = []
  let step = start
  while (step <= end) {
    ticks.push(step)
    step = step + 600000
  }
  
  const chartData = ticks.map(tick => {
    return {今天: 25, time: tick}
  })
  console.log(data)

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center pa3 justify-between w-50">
          <h1 className="f4 blue">用电量对比</h1>
          <span>（截止12点）</span>
          <span>{`${totalKwh} kWh`}</span>
          <Select defaultValue="昨天" style={{ width: 80 }} onChange={handleChange}>
            <Option value="昨天">昨天</Option>
          </Select>
          <span>{`对比 98.26 kWh`}</span>
          <span className="red">{`+5.4%`}</span>
        </div>
        <div>
          <Link to="/volume-analysis" className="mr4">分析</Link>
          <Link to="" className="mr4">诊断</Link>
          <Link to="" className="mr4">预警</Link>
          <Link to="" className="mr4">控制</Link>
        </div>
      </div>
      <LineChart
        width={1100}
        height={350}
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
        domain={[start, end]}
        ticks={ticks}
        name="Time"
        tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
        type="number"
      />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Line
        type="monotone"
        dataKey="昨日"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
      <Line type="monotone" dataKey="今天" stroke="#82ca9d" />
    </LineChart>
    </>
  )
}

export default ElectricCostChart
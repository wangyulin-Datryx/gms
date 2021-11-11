import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from "recharts"
import { useState } from 'react'
import { Select, Spin, Row, Col, DatePicker } from "antd"
import moment from "moment"
import axios from "axios"
import { 
  handleTimeChange, 
  useFetchSomeDayData, 
  useRealtimeFetch,
  getXAxisPoints
} from '../../../app/utils'


const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss[Z]')

const ElectricCostChart = () => {
  const [date, setDate] = useState<string>(yesterday)
  const {realData, somedayTotal, requestStatus} = useFetchSomeDayData(date)
  const {todayData, todayCurrent, currentTime} = useRealtimeFetch(2)
  
  function handleDateChange(date: any, dateString: any) {
    setDate(moment(dateString).format('YYYY-MM-DDTHH:mm:ss[Z]'));
  }

  function disabledDate(current: any) {
    return current && current < moment("2021-10-11").endOf('day');
  }

  const renderPhaseTick = (tickProps: any):any => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    // if (value === "06:00" || value === '22:00') {
    //    return <path d={`M${x},${y - 4}v${-35}`} stroke="red" />;
    // }
    if (value === "15:00") {
      return <text x={x} y={y-4} stroke="rgb(231, 143, 19)" textAnchor="middle">{`峰时段06:00 - 22:00`}</text>;
    }
    return null;
  }

  const chartData = getXAxisPoints(2).map((data: any, index: number) => {
    return {
      time: data.time,
      somedayQuantity: realData && realData[index]?.somedayQuantity,
      todayQuantity: todayData && todayData[index]?.todayQuantity
    }
  })

  return (
    <>
      <div >
        <Row className="pa3" align="middle">
          <Col md={4} xs={24}>
            <h1 className="f4 blue">用电量对比</h1>
          </Col>
          <Col md={20}>
            <span>{`${somedayTotal?.toFixed(2)} kWh`}</span>
            <DatePicker 
              onChange={handleDateChange} 
              disabledDate={disabledDate}
              defaultValue={moment().subtract(1, 'days')}
            />
            <span>{`对比今天${todayCurrent?.toFixed(2)}kWh`}</span>
            <span>{`(截止${handleTimeChange(currentTime)})`}</span>
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
          {/* <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={renderPhaseTick}
            height={1}
            scale="band"
            xAxisId="峰时段"
          /> */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            name={date?.split("T")[0]}
            type="monotone"
            dataKey="somedayQuantity"
            stroke="#8884d8"
            dot={false}
          />
          <Line 
            name="今天" 
            type="monotone" 
            dataKey="todayQuantity" 
            stroke="#82ca9d" 
            dot={false}
          />
          {/* <ReferenceLine 
            stroke="rgb(231, 143, 19)" 
            strokeWidth={3}
            segment={[{ x: '06:00', y: 0 }, { x: '22:00', y: 0 }]} 
          /> */}
          {/* <ReferenceLine x="06:00" stroke="rgb(231, 143, 19)" strokeDasharray="3 3" />
          <ReferenceLine x="22:00" stroke="rgb(231, 143, 19)" strokeDasharray="3 3" /> */}
          <Brush dataKey="time" height={10} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        </div>
    </>
  )
}

export default ElectricCostChart
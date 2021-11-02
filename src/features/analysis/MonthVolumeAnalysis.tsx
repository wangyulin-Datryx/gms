import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Row, Col, DatePicker } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'


export default function MonthVolumeAnalysis() {
  const [month, setMonth] = useState(new Date().getTime())

  const [yearPowerConsumption, setYearPowerConsumption] = useState<any[]>([])
  const [yearToyear, setYearToyear] = useState<any[]>([])
  const [monthTomonth, setMonthTomonth] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/analysis/search", 
          {time: month, type: 'month'}
        )
        const powerConsumption = response.data.map((month: any, index: number) => {
          return {
            name: `${index+1}号`,
            电量: month.powerConsumption
          }
        })
        const yearTyear = response.data.map((month: any, index: number) => {
          return {
            name: `${index+1}号`,
            电量: month.powerConsumptionYoy
          }
        })
        const monthTmonth = response.data.map((month: any, index: number) => {
          return {
            name: `${index+1}号`,
            电量: month.powerConsumptionMom
          }
        })
        console.log('data', powerConsumption)
        setYearPowerConsumption(powerConsumption)
        setYearToyear(yearTyear)
        setMonthTomonth(monthTmonth)
      } catch (err) {
        console.log('Failed to get year analysis data: ', err)
      }
    }
    fetchData()
  }, [month])

  function onChange(date: any, dateString: any) {
    setMonth(new Date(`${dateString}`).getTime())
  }

  return (
    <Row gutter={[16, 24]} className='pa3'>
      <Col  span={24}>
        <div>
        <div className='flex justify-between'>
            <h1 className="blue f3 ml4">{`月用量分析（${new Date(month).getMonth()+1}）`}</h1>
            <DatePicker 
              picker="month" 
              onChange={onChange}
              style={{marginRight: '1rem'}}
            />
          </div>
        <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={yearPowerConsumption}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="电量" barSize={20} fill="#413ea0" />
        </ComposedChart> 
        </ResponsiveContainer>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div>
          <h1 className="blue f3 ml4">上月同比率</h1>
          <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={yearToyear}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 5,
            }}
          >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="电量" barSize={20} fill="#413ea0" />
          </ComposedChart> 
          </ResponsiveContainer>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div>
          <h1 className="blue f3 ml4">上月环比率</h1>
          <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={monthTomonth}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 5,
            }}
          >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="电量" barSize={20} fill="#413ea0" />
          </ComposedChart> 
          </ResponsiveContainer>
        </div>
      </Col>
    </Row>
  )
}

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
import moment from 'moment'
import axios from 'axios'

export default function MonthWarningStatic() {
  const [month, setMonth] = useState(new Date().getTime())

  const [monthWarningConsumption, setMonthWarningConsumption] = useState<any[]>([])
  const [yearToyear, setYearToyear] = useState<any[]>([])
  const [monthTomonth, setMonthTomonth] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/analysisWarnings/search", 
          {time: month, type: 'month'}
        )
        let warningConsumption: any[] = []
        let yearOnYear: any[] = []
        let monthOnMonth: any[] = []
        response.data.forEach((month: any, index: number) => {
          warningConsumption.push({name: `${index+1}号`, 预警: month.warningsConsumption})
          yearOnYear.push({name: `${index+1}号`, 预警: month.warningsConsumptionYoy})
          monthOnMonth.push({name: `${index+1}号`, 预警: month.warningsConsumptionMom})
        })
        setMonthWarningConsumption(warningConsumption)
        setYearToyear(yearOnYear)
        setMonthTomonth(monthOnMonth)
      } catch (err) {
        console.log('Failed to get year analysis data: ', err)
      }
    }
    fetchData()
  }, [month])

  function onChange(date: any, dateString: any) {
    setMonth(new Date(`${dateString}`).getTime())
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="bg-white">{`${label} ${payload[0].value}%`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <Row gutter={[16, 24]} className='pa3'>
      <Col  span={24}>
        <div>
        <div className='flex justify-between'>
            <h1 className="blue f3 ml4">{`月预警信息（${new Date(month).getMonth()+1}）`}</h1>
            <DatePicker 
              picker="month" 
              onChange={onChange}
              style={{marginRight: '1rem'}}
            />
          </div>
        <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={monthWarningConsumption}
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
        <Bar dataKey="预警" barSize={20} fill="#413ea0" />
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
          <YAxis unit="%"/>
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Bar dataKey="预警" barSize={20} fill="#413ea0" />
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
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Bar dataKey="预警" barSize={20} fill="#413ea0" />
          </ComposedChart> 
          </ResponsiveContainer>
        </div>
      </Col>
    </Row>
  )
}


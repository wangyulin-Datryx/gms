import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Row, Col, DatePicker } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const currentYear = moment().year()

export default function YearWarningStatic() {
  const [year, setYear] = useState(currentYear)
  const [warningConsumption, setYearWaringConsumption] = useState<any[]>([])
  const [yearToyear, setYearToyear] = useState<any[]>([])
  const [monthTomonth, setMonthTomonth] = useState<any[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/analysisWarnings/search", 
          {time: new Date(`${year}`).getTime(), type: 'year'}
        )
        let warningConsumption: any[] = []
        let yearOnYear: any[] = []
        let monthOnMonth: any[] = []
        response.data.forEach((month: any, index: number) => {
          warningConsumption.push({name: `${index+1}月`, 预警: month.warningsConsumption})
          yearOnYear.push({name: `${index+1}月`, 预警: month.warningsConsumptionYoy})
          monthOnMonth.push({name: `${index+1}月`, 预警: month.warningsConsumptionMom})
        })
        setYearWaringConsumption(warningConsumption)
        setYearToyear(yearOnYear)
        setMonthTomonth(monthOnMonth)
      } catch (err) {
        console.log('Failed to get year analysis data: ', err)
      }
    }
    fetchData()
  }, [year])

  function onChange(date: any, dateString: any) {
    setYear(dateString)
  }
  
  return (
    <>
      <Row gutter={[16, 24]} >
        <Col span={24}>
          <div>
          <div className='flex justify-between'>
            <h1 className="blue f3 ml4">{`年预警信息（${year}年）`}</h1>
            <DatePicker 
              picker="year" 
              onChange={onChange}
              style={{marginRight: '1rem'}}
            />
          </div>
          <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={warningConsumption}
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
            <h1 className="blue f3 ml4">上年同比率</h1>
            <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={yearToyear}
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
            <h1 className="blue f3 ml4">上年环比率</h1>
            <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={monthTomonth}
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
      </Row>
    </>
  )
}

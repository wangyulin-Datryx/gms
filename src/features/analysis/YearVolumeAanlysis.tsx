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
import moment from 'moment'
import axios from 'axios'
import { useState, useEffect } from 'react'

const currentYear = moment().year()

export default function YearVolumeAanlysis() {
  const [year, setYear] = useState(currentYear)
  const [yearPowerConsumption, setYearPowerConsumption] = useState<any[]>([])
  const [yearToyear, setYearToyear] = useState<any[]>([])
  const [monthTomonth, setMonthTomonth] = useState<any[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/analysis/search", 
          {time: new Date(`${year}`).getTime(), type: 'year'}
        )
        let powerConsumption: any[] = []
        let yearOnYear: any[] = []
        let monthOnMonth: any[] = []
        response.data.forEach((month: any, index: number) => {
          powerConsumption.push({name: `${index+1}月`, 电量: month.powerConsumption})
          yearOnYear.push({name: `${index+1}月`, 电量: month.powerConsumptionYoy})
          monthOnMonth.push({name: `${index+1}月`, 电量: month.powerConsumptionMom})
        })
        setYearPowerConsumption(powerConsumption)
        setYearToyear(yearOnYear)
        setMonthTomonth(monthOnMonth)
      } catch (err) {
        console.log('Failed to get year analysis data: ', err)
      }
    }
    fetchData()
  }, [year])

  function onChange(date: any, dateString: any) {
    console.log('datestring', dateString)
    setYear(dateString)
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
    <>
      <Row gutter={[16, 24]} >
        <Col span={24}>
          <div>
          <div className='flex justify-between'>
            <h1 className="blue f3 ml4">{`年用量分析（${year}年）`}</h1>
            <DatePicker 
              picker="year" 
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
            <YAxis unit="%"/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend />
            <Bar dataKey="电量" barSize={20} fill="#413ea0" />
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
            <YAxis unit="%"/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend />
            <Bar dataKey="电量" barSize={20} fill="#413ea0" />
            </ComposedChart>
            </ResponsiveContainer> 
          </div>
        </Col>
      </Row>
    </>
  )
}

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
import { Row, Col } from 'antd'
import moment from 'moment'
import axios from 'axios'
import { useState, useEffect } from 'react'

const data = [
  {
    name: '1季度',
    预警: 590,
  },
  {
    name: '2季度',
    预警: 868,
  },
  {
    name: '3季度',
    预警: 1397,
  },
  {
    name: '4季度',
    预警: 1480,
  }
];

const currentYear = moment().year()

export default function QuarterWarningStatic() {
  const [warningConsumption, setYearWarningConsumption] = useState<any[]>([])
  const [yearOnYear, setYearOnYear] = useState<any[]>([])
  const [seasonOnSeason, setSeasonOnSeason] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/analysisWarnings/search", 
          {time: new Date(`${currentYear}`).getTime(), type: 'season'}
        )
        let warningConsumption: any[] = []
        let yearOnYear: any[] = []
        let seasonOnSeason: any[] = []
        response.data.forEach((season: any, index: number) => {
          warningConsumption.push({name: `${index+1}季度`, 预警: season.warningsConsumption})
          yearOnYear.push({name: `${index+1}季度`, 预警: season.warningsConsumptionYoy})
          seasonOnSeason.push({name: `${index+1}季度`, 预警: season.warningsConsumptionMom})
        })
        setYearWarningConsumption(warningConsumption)
        setYearOnYear(yearOnYear)
        setSeasonOnSeason(seasonOnSeason)
      } catch (err) {
        console.log('Failed to get year analysis data: ', err)
      }
    }
    fetchData()
  }, [])
  
  return (
    <>
      <Row gutter={[16, 24]} >
        <Col span={24}>
          <div>
          <div className='flex justify-between'>
            <h1 className="blue f3 ml4">季度预警信息</h1>
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
            <h1 className="blue f3 ml4">同比率</h1>
            <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={yearOnYear}
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
            <h1 className="blue f3 ml4">环比率</h1>
            <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={seasonOnSeason}
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


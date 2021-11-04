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
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const data = [
  {
    name: '1季度',
    电量: 590,
  },
  {
    name: '2季度',
    电量: 868,
  },
  {
    name: '3季度',
    电量: 1397,
  },
  {
    name: '4季度',
    电量: 1480,
  }
];

const currentYear = moment().year()

export default function QuarterVolumeAanlysis() {
  const [yearPowerConsumption, setYearPowerConsumption] = useState<any[]>([])
  const [yearOnYear, setYearOnYear] = useState<any[]>([])
  const [seasonOnSeason, setSeasonOnSeason] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/analysis/search", 
          {time: new Date(`${currentYear}`).getTime(), type: 'season'}
        )
        let powerConsumption: any[] = []
        let yearOnYear: any[] = []
        let seasonOnSeason: any[] = []
        response.data.forEach((season: any, index: number) => {
          powerConsumption.push({name: `${index+1}季度`, 电量: season.powerConsumption})
          yearOnYear.push({name: `${index+1}季度`, 电量: season.powerConsumptionYoy})
          seasonOnSeason.push({name: `${index+1}季度`, 电量: season.powerConsumptionMom})
        })
        setYearPowerConsumption(powerConsumption)
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
            <h1 className="blue f3 ml4">季度用量分析</h1>
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
            <Bar dataKey="电量" barSize={20} fill="#413ea0" />
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
            <Bar dataKey="电量" barSize={20} fill="#413ea0" />
            </ComposedChart>
            </ResponsiveContainer> 
          </div>
        </Col>
      </Row>
    </>
  )
}

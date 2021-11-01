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
import { useState } from 'react'
import moment from 'moment'

const data = [
  {
    name: '1月',
    预警: 590,
  },
  {
    name: '2月',
    预警: 868,
  },
  {
    name: '3月',
    预警: 1397,
  },
  {
    name: '4月',
    预警: 1480,
  },
  {
    name: '5月',
    预警: 1520,
  },
  {
    name: '6月',
    预警: 1400,
  },
  {
    name: '7月',
    预警: 1200,
  },
  {
    name: '8月',
    预警: 1400,
  },
  {
    name: '9月',
    预警: 1800,
  },
  {
    name: '10月',
    预警: 1400,
  },
  {
    name: '11月',
    预警: 1400,
  },
  {
    name: '12月',
    预警: 1600,
  },
];

const currentYear = moment().year()

export default function YearWarningStatic() {
  const [year, setYear] = useState(currentYear)

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
            data={data}
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
              data={data}
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
              data={data}
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

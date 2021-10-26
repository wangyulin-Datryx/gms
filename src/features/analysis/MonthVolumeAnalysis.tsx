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
import { useState } from 'react'
import moment from 'moment'

const data = [
  {
    name: '1号',
    电量: 590,
  },
  {
    name: '2号',
    电量: 868,
  },
  {
    name: '3号',
    电量: 1397,
  },
  {
    name: '4号',
    电量: 1480,
  },
  {
    name: '5号',
    电量: 1520,
  },
  {
    name: '6号',
    电量: 1400,
  },
  {
    name: '7号',
    电量: 1200,
  },
  {
    name: '8号',
    电量: 1400,
  },
  {
    name: '9号',
    电量: 1800,
  },
  {
    name: '10号',
    电量: 1400,
  },
  {
    name: '11号',
    电量: 1400,
  },
  {
    name: '12号',
    电量: 1600,
  },
];

const curretnMonth = moment().month() + 1

export default function MonthVolumeAnalysis() {
  const [month, setMonth] = useState(curretnMonth)

  function onChange(date: any, dateString: any) {
    setMonth(moment(dateString).month() + 1)
  }

  return (
    <Row gutter={[16, 24]} className='pa3'>
      <Col  span={24}>
        <div>
        <div className='flex justify-between'>
            <h1 className="blue f3 ml4">{`月用量分析（${month}）`}</h1>
            <DatePicker 
              picker="month" 
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
            data={data}
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
            data={data}
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

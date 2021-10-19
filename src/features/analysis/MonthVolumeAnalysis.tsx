import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  LineChart,
} from 'recharts';
import { Row, Col } from 'antd'

const data = [
  {
    name: '1号',
    电量: 590,
    水量: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: '2号',
    电量: 868,
    水量: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: '3号',
    电量: 1397,
    水量: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: '4号',
    电量: 1480,
    水量: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: '5号',
    电量: 1520,
    水量: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: '6号',
    电量: 1400,
    水量: 780,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '7号',
    电量: 1200,
    水量: 380,
    amt: 1600,
    cnt: 380,
  },
  {
    name: '8号',
    电量: 1400,
    水量: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '9号',
    电量: 1800,
    水量: 280,
    amt: 1100,
    cnt: 380,
  },
  {
    name: '10号',
    电量: 1400,
    水量: 580,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '11号',
    电量: 1400,
    水量: 880,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '12号',
    电量: 1600,
    水量: 380,
    amt: 1700,
    cnt: 380,
  },
];

export default function MonthVolumeAnalysis() {
  return (
    <Row gutter={[16, 24]} className='pa3'>
      <Col  span={24}>
        <div className='bg-white pt3'>
        <h1 className="blue f3 ml4">月用量分析（12月）</h1>
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
        <Bar dataKey="水量" barSize={20} fill="#ff7300" />
        </ComposedChart> 
        </ResponsiveContainer>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className='bg-white pt3'>
          <h1 className="blue f3 ml4">上月同比率（12月）</h1>
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
          {/* <Bar dataKey="水量" barSize={20} fill="#ff7300" /> */}
          </ComposedChart> 
          </ResponsiveContainer>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className='bg-white pt3'>
          <h1 className="blue f3 ml4">上月环比率（12月）</h1>
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
          {/* <Bar dataKey="水量" barSize={20} fill="#ff7300" /> */}
          </ComposedChart> 
          </ResponsiveContainer>
        </div>
      </Col>
    </Row>
  )
}

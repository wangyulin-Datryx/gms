import { Row, Col } from 'antd'
import { 
  ResponsiveContainer, 
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line
} from 'recharts'

const data = [
  {
    name: '1号',
    报修: 590,
    报废: 800,
    报修增长率: 1400,
    报废增长率: 490,
  },
  {
    name: '2号',
    报修: 868,
    报废: 967,
    报修增长率: 1506,
    报废增长率: 590,
  },
  {
    name: '3号',
    报修: 1397,
    报废: 1098,
    报修增长率: 989,
    报废增长率: 350,
  },
  {
    name: '4号',
    报修: 1480,
    报废: 1200,
    报修增长率: 1228,
    报废增长率: 480,
  },
  {
    name: '5号',
    报修: 1520,
    报废: 1108,
    报修增长率: 1100,
    报废增长率: 460,
  },
  {
    name: '6号',
    报修: 1400,
    报废: 780,
    报修增长率: 1700,
    报废增长率: 380,
  },
  {
    name: '7号',
    报修: 1200,
    报废: 380,
    报修增长率: 1600,
    报废增长率: 380,
  },
  {
    name: '8号',
    报修: 1400,
    报废: 680,
    报修增长率: 1700,
    报废增长率: 380,
  },
  {
    name: '9号',
    报修: 1800,
    报废: 280,
    报修增长率: 1100,
    报废增长率: 380,
  },
  {
    name: '10号',
    报修: 1400,
    报废: 580,
    报修增长率: 1700,
    报废增长率: 380,
  },
  {
    name: '11号',
    报修: 1400,
    报废: 880,
    报修增长率: 1700,
    报废增长率: 380,
  },
  {
    name: '12号',
    报修: 1600,
    报废: 380,
    报修增长率: 1700,
    报废增长率: 380,
  },
]

const failureTypeData: any = [
  {
    name: '设备1',
    报修: 590,
    报废: 800,
  },
  {
    name: '设备2',
    报修: 868,
    报废: 967,
  },
  {
    name: '设备3',
    报修: 1397,
    报废: 1098,
  },
  {
    name: '设备4',
    报修: 1480,
    报废: 1200,
  },
  {
    name: '设备5',
    报修: 1520,
    报废: 1108,
  },
]
export default function MonthAnalysis() {
  return (
    <>
    <Row className='bg-white'>
      <Col span={24} className='pa3 ma0'>
      <h1 className="blue f3 ml4">月故障分析</h1>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 5,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="报修" barSize={20} fill="rgb(113, 212, 212)" />
          <Bar dataKey="报废" barSize={20} fill="rgb(195, 182, 230)" />
          <Line type="monotone" dataKey="报修增长率" stroke="#413ea0" />
          <Line type="monotone" dataKey="报废增长率" stroke="#ff7300" />
        </ComposedChart>
        </ResponsiveContainer>
      </Col>
    </Row>
    <div>
      <h1 className="blue f3 ml4">设备类型故障分析</h1>
      <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        layout="vertical"
        data={failureTypeData}
        margin={{
          top: 20,
          right: 5,
          bottom: 20,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Bar dataKey="报修" barSize={20} fill="rgb(0, 187, 122)" />
        <Bar dataKey="报废" barSize={20} fill="rgb(255, 149, 2)" />
      </ComposedChart>
      </ResponsiveContainer>
    </div>
    </>
  )
}

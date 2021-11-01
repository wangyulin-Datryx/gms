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
} from 'recharts'

const failureTypeData: any = [
  {
    name: '设备1',
    预警: 590,
  },
  {
    name: '设备2',
    预警: 868,
  },
  {
    name: '设备3',
    预警: 1397,
  },
  {
    name: '设备4',
    预警: 1480,
  },
  {
    name: '设备5',
    预警: 1520,
  },
]

export default function WarningEquipmentBar() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={failureTypeData}
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
        <Bar dataKey="预警" barSize={20} fill="rgb(195, 182, 230)" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

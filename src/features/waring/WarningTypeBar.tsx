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

const data = [
  {
    name: '设备停机',
    次数: 590,
  },
  {
    name: '超用量',
    次数: 868,
  },
  {
    name: '电压不足',
    次数: 1397,
  },
  {
    name: '采集器短路',
    次数: 1480,
  },
  {
    name: '电流过载',
    次数: 1520,
  },
  {
    name: '电压过载',
    次数: 1400,
  },
]

export default function WarningTypeBar() {
  return (
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
        <Bar dataKey="次数" barSize={20} fill="rgb(113, 212, 212)" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

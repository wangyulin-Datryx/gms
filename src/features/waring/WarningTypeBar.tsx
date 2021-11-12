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
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const date = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function WarningTypeBar() {
  const [warningTypeData, setWarningTypeData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post('api/history/countByTypeWarnings',
          {month: date}
        )
        const data = response.data.data && response.data.data[0]
        const warningData = [
          {name: '超电流', 条数: data.type1},
          {name: '电流不足', 条数: data.type2},
          {name: '超电压', 条数: data.type3},
          {name: '电压不足', 条数: data.type4},
          {name: '设备离线', 条数: data.type5}
        ]
        setWarningTypeData(warningData)
      } catch (err) {
        console.log("Failed to get warning type data: ", err)
      }
    }
    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={warningTypeData}
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
        <Bar dataKey="条数" barSize={20} fill="rgb(113, 212, 212)" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

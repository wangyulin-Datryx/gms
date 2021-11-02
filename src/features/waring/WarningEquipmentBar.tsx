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
import moment from 'moment'
import axios from 'axios'
import { useState, useEffect } from 'react'

const date = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function WarningEquipmentBar() {
  const [equipmentWarnings, setEquipmentWarnings] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.post("api/history/countByDeviceWarnings",
          {month: date}
        )
        const data = response.data.data && response.data.data[0]
        const warningData = [
          {name: 'device1', 预警: data.device1},
          {name: 'devive2', 预警: data.device2},
          {name: '快速脱水器', 预警: data.device3},
          {name: '粉尘处理设备', 预警: data.device4},
          {name: '吊钩抛瓦清理机1', 预警: data.device5},
          {name: '吊钩抛瓦清理机2', 预警: data.device6},
          {name: '6号混料', 预警: data.device7},
          {name: '6号主机', 预警: data.device8},
          {name: '7号混料', 预警: data.device9},
          {name: '7号主机', 预警: data.device10},
          {name: '高周波中频电炉', 预警: data.device11},
          {name: '培烧炉1', 预警: data.device12},
          {name: '培烧炉2', 预警: data.device13},
          {name: '脱蜡釜', 预警: data.device14},
          {name: '中频炉', 预警: data.device15},
        ]
        setEquipmentWarnings(warningData)
        console.log('warnings', warningData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={equipmentWarnings}
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

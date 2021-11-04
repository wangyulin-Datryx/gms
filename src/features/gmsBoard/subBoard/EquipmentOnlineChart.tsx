import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts"
import { useAppSelector } from "../../../hook"
import { selectEquipments } from "../../gmsBoard/realtimeSlice"



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </text>
  )
}

const EquipmentOnlineChart = () => {
  const equipments = useAppSelector(selectEquipments)
  const onlineEquipments = equipments.filter(equipment => equipment.status === 1).length 
  const offlineEquipments = equipments.length - onlineEquipments 

  const data = [
    { name: "设备在线", value: onlineEquipments },
    { name: "设备离线", value: offlineEquipments },
  ]
  
  return (
    <>
      <h1 className="f4 blue pl3 pt3 mt2">设备在线</h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart >
          <Legend verticalAlign="bottom" height={36} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            legendType="diamond"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default EquipmentOnlineChart
import { PieChart, Pie, Cell, Legend } from "recharts"

const data = [
  { name: "设备在线", value: 300 },
  { name: "设备离线", value: 300 },
  { name: "设备空转", value: 300 },
]

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
  return (
    <>
      <h1 className="f4 blue pl3 pt3 mt2">设备在线</h1>
      <PieChart width={400} height={350}>
        <Legend verticalAlign="bottom" height={36} />
        <Pie
          data={data}
          cx={185}
          cy={150}
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
    </>
  )
}

export default EquipmentOnlineChart
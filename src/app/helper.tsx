import moment from 'moment'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';




export default function EquipmentStatus() {
  //calculate the x ticks
  function getXAxisPoints(interval: number): String[] {
    let XAxisPoints: String[] = []
    let i = 1440 / interval
    let point = moment("2021-10-10T24:00")
    while (i > 0) {
      XAxisPoints.push(point.format('HH:mm'))
      i--
      point = point.add(interval, 'minute')
    }
    return XAxisPoints
  }

  //reshape the data
  const data = getXAxisPoints(2).map(time => {
    return {time: time,  data: 20}
  })

  //add another x axis to display the different phase
  const renderPhaseTick = (tickProps: any):any => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
  
    if (value === "14:00") {
      return <text x={x} y={y-4} stroke="rgb(231, 143, 19)" textAnchor="middle">{`峰时段06:00 - 22:00`}</text>;
    }
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={renderPhaseTick}
          height={1}
          scale="band"
          xAxisId="峰时段"
        />
        <YAxis />
        <ReferenceLine 
          stroke="rgb(231, 143, 19)" 
          strokeWidth={3}
          segment={[{ x: '06:00', y: 0 }, { x: '22:00', y: 0 }]} 
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="data" stroke="#8884d8"/>
      </LineChart>
    </ResponsiveContainer>
  )
}


import { Progress } from 'antd'

 function EquipmentStatus1() {
  const equipments = [{title: "吊瓦机", status: 0}, {title: "吊瓦机1", status: 1}]
  const EquimentCard = ({equipment}:any) => {
    const status = equipment.status === 1 ? "在线" : "离线"
    const progressColor = equipment.status === 1 ? 'rgb(113, 212, 212)' : 'rgb(233, 73, 64)'
    return(
      <div className="flex justify-around bg-white ma2 pa3" style={{width: 300, height: 200}}>
        <div>
          <h4>{`${equipment.title}`}</h4>
          <p >{`kWh`}</p>
          <p>{`上月用电 KWh`}</p>
        </div>
        <div className="flex  justify-center items-center">
          <Progress 
            type="circle" 
            percent={100} 
            format={() => `${status}`} 
            strokeColor={progressColor}
          />
        </div>
      </div>
    )
  }

  const renderedEquipments = equipments.map(equipment => {
    return <EquimentCard key={equipment.title} equipment={equipment} />
  })

  return (
    <div className='flex flex-wrap vh-100' >
      {renderedEquipments}
    </div>
  )
}
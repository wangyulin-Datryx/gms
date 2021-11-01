import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Row, Col } from 'antd'

const data = [
  {
    name: '1季度',
    预警: 590,
  },
  {
    name: '2季度',
    预警: 868,
  },
  {
    name: '3季度',
    预警: 1397,
  },
  {
    name: '4季度',
    预警: 1480,
  }
];


export default function QuarterStatusStatic() {
  const equipments = [{title: "吊瓦机", status: 0}, {title: "吊瓦机1", status: 1}]
  const EquimentCard = ({equipment}:any) => {
    const status = equipment.status === 1 ? "在线" : "离线"
    const progressColor = equipment.status === 1 ? 'rgb(113, 212, 212)' : 'rgb(233, 73, 64)'
    return(
      <div className="flex justify-around bg-white ma2 pa3" style={{width: 300, height: 200}}>
        <div>
          <h4>{`${equipment.title}`}</h4>
          <p >{`在线时间: 400h`}</p>
          <p >{`离线时间: 200h`}</p>
        </div>
        {/* <div className="flex  justify-center items-center">
          <Progress 
            type="circle" 
            percent={100} 
            format={() => `${status}`} 
            strokeColor={progressColor}
          />
        </div> */}
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



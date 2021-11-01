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
import { Row, Col, DatePicker, Progress } from 'antd'
import { useState } from 'react'
import moment from 'moment'

const data = [
  {
    name: '1月',
    预警: 590,
  },
  {
    name: '2月',
    预警: 868,
  },
  {
    name: '3月',
    预警: 1397,
  },
  {
    name: '4月',
    预警: 1480,
  },
  {
    name: '5月',
    预警: 1520,
  },
  {
    name: '6月',
    预警: 1400,
  },
  {
    name: '7月',
    预警: 1200,
  },
  {
    name: '8月',
    预警: 1400,
  },
  {
    name: '9月',
    预警: 1800,
  },
  {
    name: '10月',
    预警: 1400,
  },
  {
    name: '11月',
    预警: 1400,
  },
  {
    name: '12月',
    预警: 1600,
  },
];

const currentYear = moment().year()

export default function YearStatusStatic() {
  const [year, setYear] = useState(currentYear)

  function onChange(date: any, dateString: any) {
    setYear(dateString)
  }

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
    <>
      <Row gutter={[16, 24]} >
        <Col span={24}>
          <div>
          <div className='flex justify-between'>
            <h1 className="blue f3 ml4">{`年状态信息（${year}年）`}</h1>
            <DatePicker 
              picker="year" 
              onChange={onChange}
              style={{marginRight: '1rem'}}
            />
          </div>
          <div className='flex flex-wrap vh-100' >
            {renderedEquipments}
          </div>
          </div>
        </Col>
      </Row>
    </>
  )
}


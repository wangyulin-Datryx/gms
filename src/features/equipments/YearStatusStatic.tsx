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
import { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [equipments, setEquipments] = useState<any[]>([])

  // function onChange(date: any, dateString: any) {
  //   setYear(dateString)
  // }

  useEffect(() => {
    const fetchEquipments = async () => {
      const response: any = await axios.post("api/device/searchAll", {})
      console.log("status", response.data.data)
      setEquipments(response.data.data)
    }
    fetchEquipments()
  }, [])


  const EquimentCard = ({equipment}:any) => {
    const status = equipment.status === 1 ? "在线" : "离线"
    const progressColor = equipment.status === 1 ? 'rgb(113, 212, 212)' : 'rgb(233, 73, 64)'
    return(
      <div className="flex justify-around bg-white ma2 pa3" style={{width: 300, height: 200}}>
        <div>
          <h4>{`${equipment.name}`}</h4>
          <p >{`在线时间: ${equipment.onlineDuration}分钟`}</p>
          <p >{`离线时间: ${equipment.offlineDuration}分钟`}</p>
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

  const renderedEquipments = equipments?.map(equipment => {
    console.log("equip", equipment)
    return <EquimentCard key={equipment.name} equipment={equipment} />
  })
  
  return (
    <>
      <Row gutter={[16, 24]} >
        <Col span={24}>
          <div>
          <div className='flex justify-between'>
          <h2 className="blue ml4">设备状态信息</h2>
            {/* <h1 className="blue f3 ml4">{`年状态信息（${year}年）`}</h1> */}
            {/* <DatePicker 
              picker="year" 
              onChange={onChange}
              style={{marginRight: '1rem'}}
            /> */}
          </div>
          <div className='flex flex-wrap ' >
            {renderedEquipments}
          </div>
          </div>
        </Col>
      </Row>
    </>
  )
}


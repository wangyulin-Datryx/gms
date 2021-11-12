import { Row, Col, List, Button } from 'antd'
import EquipmentConsumptionChart from './EquipmentConsumptionChart'
import EquipmentCurrentChart from './EquipmentCurrentChart'
import EquipmentVoltageChart from './EquipmentVoltageChart'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../../../hook'
import { selectEquipments } from '../../gmsBoard/realtimeSlice'
import { ReactComponent as Arrow } from '../../../assets/images/arrow.svg'
import './EquipmentsConsumption.css'
import moment from 'moment'
import axios from 'axios'
import { handleTimeChange } from '../../../app/utils'

const today = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

export default function EquipmentsConsumption() {
  const ids = useAppSelector(state => state.realtime.ids)
  const allEquipments = useAppSelector(selectEquipments)
  const [id, setId] = useState(ids[0])
  const onlineEquipments = allEquipments?.filter(
    equipment => equipment.status === 1
  )
  const data = onlineEquipments.map(equipment => {
    const length = equipment.collectors[0]?.records?.length
    return {
      key: equipment.deviceId,
      id: equipment.deviceId, 
      name: equipment.name,
      currentAmount: equipment.collectors[0].records[length-1]?.currentAmount
    }
  })
  data.sort((a, b) => (a.currentAmount > b.currentAmount) ? -1 : 1)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [requestStatus, setRequestStatus] = useState('idle')
  const [realtimeData, setRealtimeData] = useState<any[]>()
  const [currentData, setCurrentData] = useState<any[]>()
  const [voltageData, setVoltageData] = useState<any[]>()

  useEffect(() => {
    setId(ids[0])
  }, [ids])

  const fetchData = async () => {
    try {
      setRequestStatus('loading')
      const response: any = await axios.post('api/device/currentSearch', {
        deviceId: id,
        time: today
      })
      const currentEquipment = response.data.data
      const currentData = currentEquipment?.map((data: any) => {
        return {
          time: handleTimeChange(data.time),
          A: data.electricCurrentA,
          B: data.electricCurrentB,
          C: data.electricCurrentC,
        }
      })
      const realtimeData = currentEquipment?.map((data: any) => {
        return {
          time: handleTimeChange(data.time),
          quantity: data.quantity,
        }
      })
      const voltageData = currentEquipment?.map((data: any) => {
        return {
          time: handleTimeChange(data.time),
          A: data.electricVoltageA,
          B: data.electricVoltageB,
          C: data.electricVoltageC,
        }
      })
      setCurrentData(currentData)
      setVoltageData(voltageData)
      setRealtimeData(realtimeData)
    } catch (err) {
      setRequestStatus('failed')
      console.log('Failed to get equipment data: ', err)
    } finally {
      setRequestStatus('idle')
    }
  }

  useEffect(() => {
    if (id && requestStatus === 'idle') {
      fetchData()
    }
  }, [id, requestStatus, fetchData])

  const handleClick = (id: number, index: number) => {
    setId(id)
    setCurrentIndex(index)
  }

  const ListHeader = (
    <div className='flex justify-between'>
      <div className='fw5'>
        <Arrow />
        设备用能排名
      </div>
      <div className='mr3 pl3 pr3 ba b--black-20 br2'>电能</div>
    </div>
  )
  
  return (
    <div className='bg-white pa3 ma3'>
      <h1 className='blue f3'>单个设备用电查看</h1>
      <Row>
        <Col lg={6}>
        <List
          header={ListHeader}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any, index) => {
            const id = item.id
            return (
              <List.Item 
                key={id} 
                onClick={() => handleClick(id, index)}
                className={index===currentIndex ? "list active" : 'list inactive'}
              >
                <div><span className={`sequence sequence${index+1}`}>{index+1}</span>{item.name}</div>
                <div>{item.currentAmount?.toFixed(2)}kW</div>
              </List.Item>
            )}
          }
        />
        </Col>
        <Col lg={18} xs={24}>
        <Row>
          <Col span={24} xs={24}>
            <EquipmentConsumptionChart status={requestStatus} data={realtimeData}/>
          </Col>
          <Col span={12} xs={24}>
            <EquipmentCurrentChart status={requestStatus} data={currentData}/>
          </Col>
          <Col span={12} xs={24}>
            <EquipmentVoltageChart status={requestStatus} data={voltageData}/>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  )
}

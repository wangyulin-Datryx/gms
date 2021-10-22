import { Row, Col, List, Space, Button } from 'antd'
import EquipmentConsumptionChart from './EquipmentConsumptionChart'
import EquipmentCurrentChart from './EquipmentCurrentChart'
import EquipmentVoltageChart from './EquipmentVoltageChart'
import useStateWithCallback from 'use-state-with-callback'
import { useState } from 'react'
import { useAppSelector } from '../../../hook'
import { selectEquipments } from '../../equipments/equipmentsSlice'
import axios from 'axios'
import './EquipmentsConsumption.css'

export default function EquipmentsConsumption() {
  const [id, setId] = useStateWithCallback<number | null>(null, async() => {
    const response: any = await axios.post('api/history/searchAll',{
      deviceId: 0
    })
    const allEquipments = response.data.data
    const allEquipmentsWithRecords = allEquipments.filter(
      (equipment: any) => equipment.collectors[0].records.length> 0 && 
      equipment.deviceId !== 0
    )
    const data = allEquipmentsWithRecords.map((equipment: any) => {
      const length = equipment.collectors[0].records.length
      return {
        key: equipment.deviceId,
        id: equipment.deviceId, 
        name: equipment.name,
        currentAmount: equipment.collectors[0].records[length-1].currentAmount
      }
    })
    data.sort((a: any, b: any) => (a.currentAmount > b.currentAmount) ? -1 : 1)
    const maxId = data[0].id
    setId(maxId)
  })
  const allEquipments = useAppSelector(selectEquipments)
  const allEquipmentsWithRecords = allEquipments.filter(
    equipment => equipment.collectors[0].records.length> 0 && 
    equipment.deviceId !== 0
  )
  const data = allEquipmentsWithRecords.map(equipment => {
    const length = equipment.collectors[0].records.length
    return {
      key: equipment.deviceId,
      id: equipment.deviceId, 
      name: equipment.name,
      currentAmount: equipment.collectors[0].records[length-1].currentAmount
    }
  })
  data.sort((a, b) => (a.currentAmount > b.currentAmount) ? -1 : 1)

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = (id: number, index: number) => {
    setId(id)
    setCurrentIndex(index)
  }
  return (
    <div className='bg-white pa3 ma3'>
      <h1 className='blue f3'>单个设备用电查看</h1>
      <Row>
        <Col lg={6}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any, index) => {
            const id = item.id
            return (
              <List.Item key={id}>
                <div>{item.name}</div>
                <div>{item.currentAmount}kWh</div>
                <Button
                  className={index===currentIndex ? "active_button" : ''}
                  style={{border: 'none'}}
                  onClick={() => handleClick(id, index)}
                >
                  详情查看
                </Button>
              </List.Item>
            )}
          }
        />
        </Col>
        <Col lg={18}>
        <Row>
          <Col span={24}>
            <EquipmentConsumptionChart id={id}/>
          </Col>
          <Col lg={12}>
            <EquipmentCurrentChart id={id}/>
          </Col>
          <Col lg={12}>
            <EquipmentVoltageChart id={id}/>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  )
}

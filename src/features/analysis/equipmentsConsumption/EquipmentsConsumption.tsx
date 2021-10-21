import { Row, Col, List, Space, Button } from 'antd'
import EquipmentConsumptionChart from './EquipmentConsumptionChart'
import EquipmentCurrentChart from './EquipmentCurrentChart'
import EquipmentVoltageChart from './EquipmentVoltageChart'
import EquipmentsConsumptionTable from './EquipmentsConsumptionTable'
import { useState } from 'react'
import { useAppSelector } from '../../../hook'
import { selectEquipments } from '../../equipments/equipmentsSlice'

export default function EquipmentsConsumption() {
  const [id, setId] = useState<number>(8)
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

  const handleClick = (id: number) => {
    setId(id)
  }
  return (
    <div className='bg-white pa3 ma3'>
      <h1 className='blue f3'>单个设备用电查看</h1>
      <Row>
        <Col lg={6}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => {
            const id = item.id
            return (
              <List.Item>
                <div>{item.name}</div>
                <div>{item.currentAmount}kWh</div>
                <Button
                  style={{border: 'none'}}
                  onClick={() => handleClick(id)}
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

import { Row, Col, List, Space, Button } from 'antd'
import EquipmentConsumptionChart from './EquipmentConsumptionChart'
import EquipmentCurrentChart from './EquipmentCurrentChart'
import EquipmentVoltageChart from './EquipmentVoltageChart'
import EquipmentsConsumptionTable from './EquipmentsConsumptionTable'
import { useState } from 'react'

const data: any = [
  {key: '1', name: '快速脱水器', id: 4},
  {key: '2', name: '粉尘处理设备', id: 5},
  {key: '3', name: '吊钩抛瓦清理机1', id: 6},
  {key: '4', name: '吊钩抛瓦清理机2', id: 7},
]

export default function EquipmentsConsumption() {
  const [id, setId] = useState<number>(4)

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
            <EquipmentCurrentChart />
          </Col>
          <Col lg={12}>
            <EquipmentVoltageChart />
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  )
}

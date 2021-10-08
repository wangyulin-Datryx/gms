import {
  Row,
  Col
} from 'antd'
import ElectricCostChart from './subBoard/ElectricCostChart'
import EquipmentOnlineChart from './subBoard/EquipmentOnlineChart'
import DataEquipmentInfo from './subBoard/DataEquipmentInfo'
import CurrentMonthElectricCost from './subBoard/CurrentMonthElectricCost'
import WarningInfo from './subBoard/WarningInfo'
import { useEffect, useState } from 'react'

const GMSEquipmentBoard = () => {
  const [data, setData] = useState([{今天: 25, time: 1633651200000},])

  useEffect(() => {
    let timer = setTimeout(() => {
      setData(data => [...data, {今天: 25, time: 1633651800000}])
    }, 5000)
  }, [])

  return (
    <Row gutter={[16, 24]} className="pa2 ma1">
      <Col span={24}>
        <div className="bg-white">
          <ElectricCostChart data={data}/>
        </div>
      </Col>
      <Col span={8} >
        <div className="bg-white h-100">
          <EquipmentOnlineChart />
        </div>
      </Col>
      <Col span={8}>
        <div className="bg-white pl3 pr3 h-100">
          <DataEquipmentInfo />
        </div>
      </Col>
      <Col span={8}>
        <Row >
          <Col span={24} className="bg-white mt2 mb2">
            <CurrentMonthElectricCost />
          </Col>
          <Col span={24} className="bg-white">
            <WarningInfo />
          </Col>
        </Row>
      </Col>
    </Row>   
  )
}

export default GMSEquipmentBoard
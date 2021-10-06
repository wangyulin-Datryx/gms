import {
  Row,
  Col
} from 'antd'
import ElectricCostChart from './subBoard/ElectricCostChart'
import EquipmentOnlineChart from './subBoard/EquipmentOnlineChart'
import DataEquipmentInfo from './subBoard/DataEquipmentInfo'
import CurrentMonthElectricCost from './subBoard/CurrentMonthElectricCost'
import WarningInfo from './subBoard/WarningInfo'

const GMSEquipmentBoard = () => {
  return (
    <Row gutter={[16, 24]} className="pa4 ma3">
      <Col span={24}>
        <div className="bg-white">
          <ElectricCostChart />
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
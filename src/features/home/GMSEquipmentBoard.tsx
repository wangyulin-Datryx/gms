import {
  Row,
  Col,
} from 'antd'
import ElectricCostChart from './subBoard/ElectricCostChart'
import EquipmentOnlineChart from './subBoard/EquipmentOnlineChart'
import DataEquipmentInfo from './subBoard/DataEquipmentInfo'
import CurrentMonthElectricCost from './subBoard/CurrentMonthElectricCost'
import WarningInfo from './subBoard/WarningInfo'
import MainEquipmentInfo from './subBoard/MainEquipmentInfo'

const GMSEquipmentBoard = () => {
  return (
    <Row gutter={[16, 24]} className="pa2 ma1">
      <Col span={24}>
        <div className="bg-white">
          <ElectricCostChart />
        </div>
      </Col>
      <Col lg={8} xs={24}>
        <div className="bg-white h-100">
          <EquipmentOnlineChart />
        </div>
      </Col>
      <Col lg={8} xs={24}>
        <div className="bg-white pl3 pr3 h-100">
          <DataEquipmentInfo />
        </div>
      </Col>
      <Col lg={8}>
        <Row >
          <Col span={24} className="bg-white mt2 mb2">
            <CurrentMonthElectricCost />
          </Col>
          <Col span={24} className="bg-white mb2">
            <WarningInfo />
          </Col>
          <Col span={24} className="bg-white">
            <MainEquipmentInfo />
          </Col>
        </Row>
      </Col>
    </Row>   
  )
}

export default GMSEquipmentBoard
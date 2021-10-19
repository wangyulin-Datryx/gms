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
import { useEffect, useState } from 'react'
import axios from 'axios'

const GMSEquipmentBoard = () => {
  const [electricCost, setElectricCost] = useState()
  const [isLaoding, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchElectricCost = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const response:any = await axios.post('http://8.130.177.91:8080/history/search',{
        deviceId: 0
      })
      setIsLoading(false)
      const records:any = response.data.data.collectors[0].records
      setElectricCost(records)
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      console.log("fetchError", error)
    } 
  }

  useEffect(() => {
    fetchElectricCost()
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => fetchElectricCost(), 1000*60*10)
    return () => clearTimeout(timer)
  }, [electricCost])
  
  return (
    <Row gutter={[16, 24]} className="pa2 ma1">
      <Col span={24}>
        <div className="bg-white">
          <ElectricCostChart 
            electricCost={electricCost} 
            isLoading={isLaoding}
          />
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
import NavBar from '../../app/NavBar'
import Header from '../../app/Header'
import GMSEquipmentBoard from '../gmsBoard/GMSEquipmentBoard'
import VolumeAnalysis from '../analysis/VolumeAnalysis'
import EquipmentsConsumption from '../analysis/equipmentsConsumption/EquipmentsConsumption'
import EquipmentsFailureAnalysis from '../analysis/equipmentsFailure/EquipmentsFailureAnalysis'
import WarningInfoDetail from '../waring/WarningInfoDetail'
import WarningInfoStatic from '../waring/WarningInfoStatic'
import EquipmentStatus from '../equipments/EquipmentStatus'
import AmmeterManagement from '../ammeter/AmmeterManagement'
import AddAmmeter from '../ammeter/AddAmmeter'
import EquipmentManagement from '../equipments/EquipmentManagement'
import AddEquipment from '../equipments/AddEquipment'
import { Layout } from 'antd'
import { 
  Switch, 
  Route
} from 'react-router-dom'
import { useEffect } from 'react'
import { fetchEquipments, selectEquipments } from '../gmsBoard/realtimeSlice'
import { useAppSelector } from '../../hook'
import store from '../../store'

const { Content } = Layout

const MainPage = () => {
  useEffect(() => {
    let timer = setTimeout(() => store.dispatch(fetchEquipments()), 1000*60*2)
    return () => clearTimeout(timer)
  })

  const equipments = useAppSelector(selectEquipments)
  

  return (
    <>
      <Layout>
        <NavBar />
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
            <Switch>
              <Route exact path="/">
                <GMSEquipmentBoard />
              </Route>
              <Route exact path="/volume-analysis">
                <VolumeAnalysis />
              </Route>
              <Route exact path="/equipment-consumption">
                <EquipmentsConsumption />
              </Route>
              <Route exact path="/equipment-failure-analysis">
                <EquipmentsFailureAnalysis />
              </Route>
              <Route exact path="/warning-info-detail">
                <WarningInfoDetail />
              </Route>
              <Route exact path="/warning-info-statics">
                <WarningInfoStatic />
              </Route>
              <Route exact path="/equipment-status">
                <EquipmentStatus />
              </Route>
              <Route exact path="/ammeter-management">
                <AmmeterManagement />
              </Route>
              <Route exact path="/add-ammeter">
                <AddAmmeter />
              </Route>
              <Route exact path="/equipment-management">
                <EquipmentManagement />
              </Route>
              <Route exact path="/add-equipment">
                <AddEquipment />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default MainPage

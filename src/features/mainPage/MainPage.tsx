import NavBar from '../../app/NavBar'
import Header from '../../app/Header'
import GMSEquipmentBoard from '../home/GMSEquipmentBoard'
import VolumeAnalysis from '../analysis/VolumeAnalysis'
import MonthVolumeAnalysis from '../analysis/MonthVolumeAnalysis'
import EquipmentsConsumption from '../analysis/equipmentsConsumption/EquipmentsConsumption'
import EquipmentsFailureAnalysis from '../analysis/equipmentsFailure/EquipmentsFailureAnalysis'
import { Layout } from 'antd'
import { 
  Switch, 
  Route
} from 'react-router-dom'
import { useEffect } from 'react'
import { fetchEquipments, selectEquipments } from '../equipments/equipmentsSlice'
import { useAppSelector } from '../../hook'
import store from '../../store'

const { Content } = Layout

const MainPage = () => {
  useEffect(() => {
    let timer = setTimeout(() => store.dispatch(fetchEquipments()), 1000*60*10)
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
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default MainPage

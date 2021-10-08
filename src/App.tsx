import NavBar from './app/NavBar'
import Header from './app/Header'
import Login from './app/Login'
import GMSEquipmentBoard from './features/home/GMSEquipmentBoard'
import VolumeAnalysis from './features/analysis/VolumeAnalysis'
import { Layout } from 'antd'
import './App.css'
import { 
  Switch, 
  Route
} from 'react-router-dom'

const { Content } = Layout

const App = () => {
  return (
    <>
      {/* <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch> */}
        <Layout>
          <NavBar />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header />
            <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
              <Switch>
                <Route path="/home">
                  <GMSEquipmentBoard />
                </Route>
                <Route path="/volume-analysis">
                  <VolumeAnalysis />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
    </>
  )
}

export default App

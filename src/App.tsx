import NavBar from './app/NavBar'
import Header from './app/Header'
import Login from './app/Login'
import { Layout } from 'antd'
import './App.css'

const { Content } = Layout

const App = () => {
  return (
    // <Login />
    <Layout>
      <NavBar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header />
        <Content >

        </Content>
      </Layout>
    </Layout>
    
  )
}

export default App

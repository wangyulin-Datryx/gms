import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import DatryxIcon from '../assets/images/datryx-icon.png'
import './NavBar.css'

const { Sider } = Layout
const { SubMenu } = Menu

const NavBar = () => {
  return (
    <>
      <Sider
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}
      >
        <div className="nav-logo">
          <img src={DatryxIcon} alt="logo"/>
          <h2>GMS绿色工厂</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="home" icon={<UserOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <SubMenu key="sales" icon={<ContainerOutlined />} title="nav2">
            <Menu.Item key="add-order" icon={<VideoCameraOutlined />}>
              <Link to="/add-order">新建订单</Link>
            </Menu.Item>
            <Menu.Item key="history-order" icon={<VideoCameraOutlined />}>
              <Link to="/history-order">历史订单</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            nav 4
          </Menu.Item>
          <Menu.Item key="5" icon={<CloudOutlined />}>
            nav 5
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<ShopOutlined />}>
            nav 8
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}

export default NavBar
 
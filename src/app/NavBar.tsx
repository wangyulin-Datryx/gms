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
        <div className="flex justify-start items-center pa2 mb2">
          <img 
            src={DatryxIcon} 
            alt="logo" 
            style={{width: '50px', height: '50px'}}
          />
          <h2 style={{color: "white", marginLeft: '10px'}}>GMS系统</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="home" icon={<UserOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <SubMenu key="analysis" icon={<ContainerOutlined />} title="分析">
            <Menu.Item key="volume-analysis" icon={<VideoCameraOutlined />}>
              <Link to="/volume-analysis">用量分析</Link>
            </Menu.Item>
            <Menu.Item key="process-analysis" icon={<VideoCameraOutlined />}>
              <Link to="/process-analysis">环节分析</Link>
            </Menu.Item>
            <Menu.Item key="openration-analysis" icon={<VideoCameraOutlined />}>
              <Link to="/history-order">运行分析</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            诊断
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<BarChartOutlined />}>
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
          </Menu.Item> */}
        </Menu>
      </Sider>
    </>
  )
}

export default NavBar
 